## Compression Efficiency
Json-Compressor significantly reduces the size of JSON data, which is particularly useful when working with large datasets. For example:

  - A **1 GB** JSON file could be compressed down to just a few KB (typically around 1-5% of the original size), depending on the structure and content of the data.


# Installation



    npm install json-bits


### Importing the Library

**For CommonJS (Node.js):**


    const JsonCompressor = require('json-compressor');

**For ES Modules:**


    import JsonCompressor from 'json-compressor';


### Basic Usage
**1. Compress and Decompress JSON Data**

**Compress JSON Data**


    const data = { name: 'Alice', age: 30, active: true };
    
    async function runCompression() {
      const compressed = await JsonCompressor.compressJson(data);
      console.log('Compressed Data:', compressed);
    }
    
    runCompression();

**Decompress JSON Data**



    const compressedData = '<your-compressed-data-here>';
    
    async function runDecompression() {
      const decompressed = await JsonCompressor.decompressJson(compressedData);
      console.log('Decompressed Data:', decompressed);
    }
    
    runDecompression();


## Why Use json-bits?

### 🚀 Efficient Compression
- Compresses JSON data into compact binary formats.
- Reduces the size of large JSON payloads significantly, saving bandwidth and storage.

### 💡 Flexible Format

- Supports conversion to and from Base64 for easy transport in text-based systems like HTTP headers or URLs.

### ⚡ High Performance
- Built on pako, a fast and efficient gzip implementation for JavaScript.
- Designed for speed and low overhead, suitable for real-time applications.

### 🔐 Secure
- Ensures the integrity of data during compression and decompression with robust error handling.
- Mitigates risks of data corruption during the compression lifecycle.

### 🌐 Cross-Platform Compatibility
- Works seamlessly in Node.js and browser environments.
- Compatible with modern frameworks like React, Angular, and Vue.

### 📦 Compact Storage
- Compresses data into compact representations that can be easily stored or transmitted.
- Ideal for applications requiring low storage overhead, such as IoT devices, offline apps, or lightweight databases.

### 🛠️ Ease of Use
- Intuitive API for compressing, decompressing, and handling data.
- Simple integration with promises and async/await for modern JavaScript workflows.

### 🔄 Bidirectional Compression
- Supports both compression and decompression workflows:
- JSON → Compressed Binary → JSON
- JSON → Base64 → JSON

### 🎯 Utility Functions
- Includes utilities for advanced developers:
- Convert between ArrayBuffer and Base64 seamlessly.
- Pack/unpack bits for fine-grained control over data representation.

