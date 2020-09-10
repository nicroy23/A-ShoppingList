import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  /**
   * This function is called from the login component. It logs the user in by sending a post request to the server, which handles the JWT logic
   * and sends back the token, which get saved in the localStorage, so that the app can authenticate the user everytimes he makes a request. That
   * ensures that the user does not access data he is not supposed to. 
   * 
   * @param username - Username that the user inputs
   * @param password - Password that the user inputs
   * 
   * @return A promise with the data sent by the server. The component can then save the token in localStorage, when it is sure that the server
   * has responded. 
   */
  loginClient(username: string, password: string) {
    const API_URL = `http://localhost:4444/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.post<{ authenticated: boolean, username: string, token: string }>(API_URL, { username: username, password: password }, httpOptions).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error.error.error);
        }
      )
    });
  }

  /**
   * This function handles the creation of new accounts. It sends a post request to the server, which handles the authentification and creation,
   * and sends a JWT token back, which does the same then login function. 
   * 
   * @param username - The username that the client inputs.
   * @param password - The password of the client. 
   * 
   * @return A promise that the component handles the data received and saves the token. 
   */
  registerClient(username: string, password: string) {
    const API_URL = `http://localhost:4444/sign-in`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.post<{ authenticated: boolean, username: string, token: string }>(API_URL, { username: username, password: password }, httpOptions).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error.error.error);
        }
      )
    });
  }

  /**
   * Function that clears the localStorage of information saved by this app. The user is then logged out and does not have a token anymore.
   */
  logoutClient() {
    return new Promise((resolve) => {
      localStorage.clear();
      resolve();
    });
  }
  
}
