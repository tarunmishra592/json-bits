import * as pako from 'pako';

/**
 * Decompress data using gzip
 * @param {Uint8Array | Buffer} compressedData - Compressed data
 * @returns {Promise<object>} - Decompressed JSON object
 */
export async function decompressGzip(compressedData) {
  if (typeof window !== 'undefined') {
    // Browser environment, use pako
    try {
      const decompressedString = pako.ungzip(compressedData, { to: 'string' });
      return JSON.parse(decompressedString);
    } catch (error) {
      throw new Error(`Decompression failed: ${error.message}`);
    }
  } else {
    // Node.js environment, use zlib
    const zlib = require('zlib');
    return new Promise((resolve, reject) => {
      zlib.gunzip(compressedData, (err, decompressedBuffer) => {
        if (err) {
          reject(new Error(`Decompression failed: ${err.message}`));
        } else {
          try {
            const decompressedString = decompressedBuffer.toString();
            resolve(JSON.parse(decompressedString));
          } catch (parseError) {
            reject(new Error(`JSON parse failed: ${parseError.message}`));
          }
        }
      });
    });
  }
}

/**
 * Convert Base64 string to decompressed JSON
 * @param {string} base64CompressedData
 * @returns {Promise<object>}
 */
export async function decompressBase64(base64CompressedData) {
  const arrayBuffer = base64ToArrayBuffer(base64CompressedData);
  return decompressGzip(new Uint8Array(arrayBuffer));
}
