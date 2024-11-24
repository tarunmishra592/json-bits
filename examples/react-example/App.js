import React, { useState } from 'react';
import JsonCompressor from 'json-compressor';

const App = () => {
  const [compressedData, setCompressedData] = useState(null);
  const [decompressedData, setDecompressedData] = useState(null);

  const handleCompression = async () => {
    const data = { name: "John", age: 30, active: true };
    try {
      const compressed = await JsonCompressor.compressJson(data);
      setCompressedData(compressed);
      console.log('Compressed Data:', compressed);
    } catch (error) {
      console.error('Compression Error:', error);
    }
  };

  const handleDecompression = async () => {
    try {
      const decompressed = await JsonCompressor.decompressJson(compressedData);
      setDecompressedData(decompressed);
      console.log('Decompressed Data:', decompressed);
    } catch (error) {
      console.error('Decompression Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCompression}>Compress Data</button>
      {compressedData && (
        <button onClick={handleDecompression}>Decompress Data</button>
      )}
      <div>
        <h3>Compressed Data:</h3>
        <pre>{compressedData ? JSON.stringify(compressedData) : 'No data compressed yet'}</pre>
      </div>
      <div>
        <h3>Decompressed Data:</h3>
        <pre>{decompressedData ? JSON.stringify(decompressedData) : 'No data decompressed yet'}</pre>
      </div>
    </div>
  );
};

export default App;
