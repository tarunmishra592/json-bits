# **Axios Redis**

An enhanced Axios wrapper that integrates with Redis to provide advanced features like caching, retry logic, and distributed caching. Ideal for optimizing API calls in scalable and high-performance applications.

---

## 🚀 **Features**

### Core Functionalities
- **Redis Caching**: Cache `GET` request responses to reduce redundant API calls and improve performance.
- **Configurable TTL**: Control how long responses are cached (default: 5 minutes).
- **Retry Logic**: Automatically retries failed requests (configurable number of attempts).
- **Distributed Caching**: Share cached data across systems in distributed environments.
- **Cache Control**: Enable or disable caching for specific requests.

### Utility Features
- **Cache Invalidation**: Manually remove specific cached keys.
- **Clear Entire Cache**: Reset all Redis cache entries.
- **Fine-Grained Control**: Override global configurations for individual requests.

---

## 📦 **Installation**

Install the plugin via npm:

```bash
npm install axios-redis

---

## 🚀 **Basic Step**
const AxiosRedis = require("axios-redis");

const apiClient = new AxiosRedis(
  {
    baseURL: "https://api.example.com", // Axios base config
  },
  {
    redisConfig: {
      host: "127.0.0.1", // Redis server
      port: 6379,        // Redis port
    },
    cacheTTL: 600, // Cache TTL in seconds (default: 300)
    retryCount: 3, // Retry attempts for failed requests
  }
);


## 💡 **Usage**

### Basic Usage with Caching

// Fetch data with caching enabled
const response = await apiClient.get("/data", {}, true);
console.log(response.data); // Logs the API response


### Disable Caching for a Specific Request

// Fetch data without using the cache
const response = await apiClient.get("/data", {}, false);
console.log(response.data);


### POST Requests (No Caching)

const postData = { name: "John", age: 30 };
const response = await apiClient.post("/submit", postData);
console.log(response.data);


## 🔧 **Utility Features**

### Cache Invalidation
Manually remove a cached key.

await apiClient.redis.del("GET:/data:{}"); // Remove specific cache entry

### Clear Entire Cache
Clear all Redis cache entries.

await apiClient.redis.flushall();




## 🛠 ** API Reference**
- **Constructor**: `AxiosRedis(baseConfig, options)`
 - **baseConfig**: Axios configuration object (e.g., `baseURL`, headers).

 - **options:
 - **redisConfig**: Redis connection options (e.g., host, port, authentication).
 - **cacheTTL**: Cache duration in seconds (default: 300 seconds).
 - **retryCount**: Number of retry attempts for failed requests (default: 3).

### Methods

 - `get(url, config, useCache)`
   - Fetch data from a given URL.

   ## Parameters:
   - `url`: Request URL.
   - `config`: Optional Axios configuration.
   - `useCache`: Boolean to enable or disable caching.

## **post(url, data, config)**

 - Send a POST request to the given URL.
 ## Parameters:
   - **url**: Request URL.
   - **data**: Payload for the request.
   - **config**: Optional Axios configuration.

## redis

 - Direct access to the underlying Redis client for advanced operations.


## 🌟 **  Why Use Axios Redis Enhanced?**
- **Optimized API Usage**: Save bandwidth and reduce API load with response caching.
- **Error Resilience**: Retry failed requests automatically for better reliability.
- **Scalable**: Works seamlessly with distributed systems using Redis as a shared cache.
- **Ease of Use**: Minimal configuration required; integrates effortlessly with existing Axios workflows.

## 🧪 ** Testing**
To run tests, use:

```bash
npm test


## 🌐 Contributing**
We welcome contributions! Feel free to open issues, submit pull requests, or suggest features.

