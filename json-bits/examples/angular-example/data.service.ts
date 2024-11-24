import { Injectable } from '@angular/core';
import JsonCompressor from 'json-compressor';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // Async function to compress data
  async compressData(data: any) {
    try {
      const compressedData = await JsonCompressor.compressJson(data);
      console.log('Compressed Data:', compressedData);
      return compressedData;
    } catch (error) {
      console.error('Compression Error:', error);
      throw error;
    }
  }

  // Async function to decompress data
  async decompressData(compressedData: any) {
    try {
      const decompressedData = await JsonCompressor.decompressJson(compressedData);
      console.log('Decompressed Data:', decompressedData);
      return decompressedData;
    } catch (error) {
      console.error('Decompression Error:', error);
      throw error;
    }
  }
}
