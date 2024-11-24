import * as pako from 'pako';
import { arrayBufferToBase64, base64ToArrayBuffer, packJsonToBits, unpackBitsToJson } from './utils';
import { decompressGzip, decompressBase64 } from './decompress';

class JsonCompressor {
  static async compressJson(jsonData) {
    const stringifiedData = JSON.stringify(jsonData);

    if (typeof window !== 'undefined') {
      const compressedData = pako.gzip(stringifiedData);
      return compressedData;
    } else {
      const zlib = require('zlib');
      return new Promise((resolve, reject) => {
        zlib.gzip(stringifiedData, (err, compressedData) => {
          if (err) {
            reject(err);
          } else {
            resolve(compressedData);
          }
        });
      });
    }
  }

  static async decompressJson(compressedData) {
    return decompressGzip(compressedData);
  }

  static async compressToBase64(jsonData) {
    const stringifiedData = JSON.stringify(jsonData);
    const compressedData = pako.gzip(stringifiedData);
    return arrayBufferToBase64(compressedData);
  }

  static async decompressFromBase64(base64CompressedData) {
    const arrayBuffer = base64ToArrayBuffer(base64CompressedData);
    const compressedData = new Uint8Array(arrayBuffer);
    return decompressGzip(compressedData);
  }

  static packBits(jsonData) {
    return packJsonToBits(jsonData);
  }

  static unpackBits(packedData) {
    return unpackBitsToJson(packedData);
  }
}

export default JsonCompressor;
