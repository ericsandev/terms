import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CoalService {
  headers: HttpHeaders;
  url: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.url = environment.url;
  }

  getService(ruta: string, headers?: HttpHeaders) {
    if (headers) { this.headers = headers; }
    return this.http.get(this.url + ruta, { headers: this.headers });
  }

  postService(ruta: string, body?: any, headers?: HttpHeaders) {
    if (headers) { this.headers = headers; }
    return this.http.post(this.url + ruta, body, { headers: this.headers });
  }

  putService(ruta: string, body?: any, headers?: HttpHeaders) {
    if (headers) { this.headers = headers; }
    return this.http.put(this.url + ruta, body, { headers: this.headers });
  }

  deleteService(ruta: string, data: any, headers?: HttpHeaders) {
    if (headers) { this.headers = headers; }
    return this.http.delete(this.url + ruta + '?' + data, { headers: this.headers });
  }
}
