import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  compressedData: any = null;
  decompressedData: any = null;

  constructor(private dataService: DataService) {}

  // Method to handle compression
  async compressJsonData() {
    const data = { name: "Jane", age: 25, active: true };
    this.compressedData = await this.dataService.compressData(data);
  }

  // Method to handle decompression
  async decompressJsonData() {
    if (this.compressedData) {
      this.decompressedData = await this.dataService.decompressData(this.compressedData);
    }
  }
}
