import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public token: string;

  constructor(private http: HttpClient) { }

  loginClient(username: string, password: string) {
    const API_URL = `http://localhost:4444/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':  'application/json'
      }),
      withCredentials: true
    }

    return new Promise((resolve) => {
      this.http.post<{ authenticated: boolean, username: string, token: string }>(API_URL, { username: username, password: password }, httpOptions).subscribe(data => {
        this.token = data.token;
        resolve(data);
      })
    });
  }

  registerClient(username: string, password: string) {
    const API_URL = `http://localhost:4444/sign-in`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':  'application/json'
      }),
      withCredentials: true
    }

    return new Promise((resolve) => {
      this.http.post<{ authenticated: boolean, username: string, token: string }>(API_URL, { username: username, password: password }, httpOptions).subscribe(data => {
        this.token = data.token;
        resolve(data);
      })
    });
  }
}
