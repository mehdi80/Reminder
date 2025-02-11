import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalRepository {
private baseUrl: string ='https://67a1dd2d409de5ed52535651.mockapi.io'
  constructor() { }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
}
