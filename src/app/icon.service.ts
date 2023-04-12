import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private baseUrl = 'https://api.fontawesome.com/v5.15/icons';

  constructor(private http: HttpClient) { }

  getIcons() {
    return this.http.get<any[]>(`${this.baseUrl}?count=1000&style=solid`);
  }
}
