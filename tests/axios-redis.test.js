const axios = require('axios');
const Redis = require('ioredis');
const AxiosRedis = require('../src/axios-redis');

jest.mock('axios');
jest.mock('ioredis');

describe('AxiosRedis', () => {
  let axiosRedis;
  let mockAxiosCreate;
  let mockAxiosGet;
  let mockAxiosPost;
  let mockRedisGet;
  let mockRedisSetex;

  beforeEach(() => {
    jest.resetAllMocks();

    mockAxiosGet = jest.fn();
    mockAxiosPost = jest.fn();
    mockAxiosCreate = jest.fn().mockReturnValue({
      get: mockAxiosGet,
      post: mockAxiosPost,
    });
    axios.create = mockAxiosCreate;

    mockRedisGet = jest.fn();
    mockRedisSetex = jest.fn();
    Redis.mockImplementation(() => ({
      get: mockRedisGet,
      setex: mockRedisSetex,
    }));

    axiosRedis = new AxiosRedis();
  });

  describe('constructor', () => {
    it('should create an instance with default options', () => {
      expect(axiosRedis).toBeInstanceOf(AxiosRedis);
      expect(mockAxiosCreate).toHaveBeenCalledWith({});
      expect(Redis).toHaveBeenCalledWith({});
    });

    it('should create an instance with custom options', () => {
      const baseConfig = { baseURL: 'https://api.example.com' };
      const options = {
        retryCount: 5,
        redisConfig: { host: 'localhost', port: 6379 },
        cacheTTL: 600,
      };
      axiosRedis = new AxiosRedis(baseConfig, options);

      expect(mockAxiosCreate).toHaveBeenCalledWith(baseConfig);
      expect(Redis).toHaveBeenCalledWith(options.redisConfig);
    });
  });

  describe('get', () => {
    const url = 'https://api.example.com/data';
    const config = { headers: { 'Content-Type': 'application/json' } };
    const responseData = { id: 1, name: 'Test' };

    it('should make a GET request without caching', async () => {
      mockAxiosGet.mockResolvedValueOnce({ data: responseData });

      const result = await axiosRedis.get(url, config);

      expect(mockAxiosGet).toHaveBeenCalledWith(url, config);
      expect(mockRedisGet).not.toHaveBeenCalled();
      expect(mockRedisSetex).not.toHaveBeenCalled();
      expect(result).toEqual(responseData);
    });

    it('should use cached data when available', async () => {
      const cachedData = { id: 2, name: 'Cached' };
      mockRedisGet.mockResolvedValueOnce(JSON.stringify(cachedData));

      const result = await axiosRedis.get(url, config, true);

      expect(mockRedisGet).toHaveBeenCalled();
      expect(mockAxiosGet).not.toHaveBeenCalled();
      expect(result).toEqual(cachedData);
    });

    it('should cache the response when useCache is true', async () => {
      mockRedisGet.mockResolvedValueOnce(null);
      mockAxiosGet.mockResolvedValueOnce({ data: responseData });

      await axiosRedis.get(url, config, true);

      expect(mockAxiosGet).toHaveBeenCalledWith(url, config);
      expect(mockRedisSetex).toHaveBeenCalledWith(
        expect.any(String),
        300,
        JSON.stringify(responseData)
      );
    });
  });

  describe('post', () => {
    const url = 'https://api.example.com/data';
    const data = { name: 'New Item' };
    const config = { headers: { 'Content-Type': 'application/json' } };

    it('should make a POST request', async () => {
      const responseData = { id: 3, name: 'New Item' };
      mockAxiosPost.mockResolvedValueOnce({ data: responseData });

      const result = await axiosRedis.post(url, data, config);

      expect(mockAxiosPost).toHaveBeenCalledWith(url, data, config);
      expect(result).toEqual(responseData);
    });
  });

  describe('retry mechanism', () => {
    it('should retry failed requests', async () => {
      const url = 'https://api.example.com/data';
      const error = new Error('Network error');
      mockAxiosGet.mockRejectedValueOnce(error);
      mockAxiosGet.mockRejectedValueOnce(error);
      mockAxiosGet.mockResolvedValueOnce({ data: { message: 'Success' } });

      const result = await axiosRedis.get(url);

      expect(mockAxiosGet).toHaveBeenCalledTimes(3);
      expect(result).toEqual({ message: 'Success' });
    });

    it('should throw an error after max retries', async () => {
      const url = 'https://api.example.com/data';
      const error = new Error('Network error');
      mockAxiosGet.mockRejectedValue(error);

      await expect(axiosRedis.get(url)).rejects.toThrow('Network error');
      expect(mockAxiosGet).toHaveBeenCalledTimes(3); // Default retry count is 3
    });
  });

  describe('_generateCacheKey', () => {
    it('should generate a unique cache key', () => {
      const method = 'GET';
      const url = 'https://api.example.com/data';
      const config = { params: { id: 1 } };

      const cacheKey = axiosRedis._generateCacheKey(method, url, config);

      expect(cacheKey).toBe('GET:https://api.example.com/data:{"params":{"id":1}}');
    });
  });
});

