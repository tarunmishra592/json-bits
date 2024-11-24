
/**
 * Convert an ArrayBuffer to a Base64 string
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
export function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary);
  }
  
  /**
   * Convert a Base64 string to an ArrayBuffer
   * @param {string} base64
   * @returns {ArrayBuffer}
   */
  export function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const length = binary.length;
    const buffer = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
  
    return buffer.buffer;
  }
  
  /**
   * Pack a JSON object into a smaller form using bit-level encoding
   * (Optional: Example for future implementation)
   * @param {object} jsonData
   * @returns {Uint8Array}
   */
  export function packJsonToBits(jsonData) {
    const stringified = JSON.stringify(jsonData);
    const buffer = new TextEncoder().encode(stringified); // Convert to Uint8Array
    return buffer; // This could be extended for real bit-packing
  }
  
  /**
   * Unpack a bit-packed JSON object (placeholder example)
   * @param {Uint8Array} packedData
   * @returns {object}
   */
  export function unpackBitsToJson(packedData) {
    const stringified = new TextDecoder().decode(packedData);
    return JSON.parse(stringified);
  }
  