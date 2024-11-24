import JsonCompressor from '../lib/index';
import { arrayBufferToBase64, base64ToArrayBuffer } from '../lib/utils';

describe('JsonCompressor Library', () => {
  const testData = { name: 'Alice', age: 30, active: true };

  // === Compression Tests ===
  describe('Compression', () => {
    it('should compress JSON data successfully', async () => {
      const compressedData = await JsonCompressor.compressJson(testData);

      expect(compressedData).toBeDefined();
      expect(compressedData.length).toBeGreaterThan(0);
    });

    it('should compress and decompress JSON data back to the original', async () => {
      const compressedData = await JsonCompressor.compressJson(testData);
      const decompressedData = await JsonCompressor.decompressJson(compressedData);

      expect(decompressedData).toEqual(testData);
    });

    it('should compress JSON data to Base64 successfully', async () => {
      const base64Compressed = await JsonCompressor.compressToBase64(testData);

      expect(base64Compressed).toBeDefined();
      expect(typeof base64Compressed).toBe('string');
    });
  });

  // === Decompression Tests ===
  describe('Decompression', () => {
    it('should decompress valid compressed JSON data', async () => {
      const compressedData = await JsonCompressor.compressJson(testData);
      const decompressedData = await JsonCompressor.decompressJson(compressedData);

      expect(decompressedData).toEqual(testData);
    });

    it('should decompress Base64 compressed JSON data', async () => {
      const base64Compressed = await JsonCompressor.compressToBase64(testData);
      const decompressedData = await JsonCompressor.decompressFromBase64(base64Compressed);

      expect(decompressedData).toEqual(testData);
    });

    it('should throw an error for invalid compressed data', async () => {
      const invalidCompressedData = 'invalid data';

      await expect(JsonCompressor.decompressJson(invalidCompressedData)).rejects.toThrow();
    });
  });

  // === Utility Tests ===
  describe('Utility Functions', () => {
    it('should convert ArrayBuffer to Base64 and back', () => {
      const buffer = new Uint8Array([104, 101, 108, 108, 111]).buffer; // 'hello'
      const base64String = arrayBufferToBase64(buffer);

      expect(base64String).toBeDefined();
      expect(typeof base64String).toBe('string');

      const convertedBackBuffer = base64ToArrayBuffer(base64String);
      expect(new Uint8Array(convertedBackBuffer)).toEqual(new Uint8Array(buffer));
    });

    it('should correctly handle JSON packing and unpacking (bit-level)', () => {
      const packedData = JsonCompressor.packBits(testData);
      const unpackedData = JsonCompressor.unpackBits(packedData);

      expect(unpackedData).toEqual(testData);
    });
  });
});
