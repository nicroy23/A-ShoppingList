import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }
 
  /**
   * Function that gets called on login button click. It then calls the login function in the client service and waits for the response. Then,
   * it stores the JWT and username that the client service sends back in the localStorage, so that it can be accessed after.
   * 
   * @param username - The usernameInput value from the component HTML
   * @param password - The passwordInput value from the component HTML
   */
  loginClient(username: string, password: string): void {
    if (username != '' && password != '') {
      this.clientService.loginClient(username, password).then((data: { authenticated: boolean, username: string, token: string }) => {
        if (data.authenticated) {
          localStorage.setItem("id_token", data.token);
          localStorage.setItem("username", data.username);
          this.router.navigateByUrl('/my-lists');
        }
      });
    }
  }

  /**
   * Function to register client. It calls the client service, which handles the server requests and response, and then sends back the data
   * used by this component. Before calling client service, this function verifies that both passwords entered by the user are the same value.
   * 
   * @param username - The usernameInput value from the component HTML
   * @param password - The passwordInput value from the component HTML
   * @param passwordRepeat - The passwordValidationInput value from the component HTML
   */
  registerClient(username: string, password: string, passwordRepeat: string): void {
    if (username != '' && password != '' && password != '') {
      if (password === passwordRepeat) {
        this.clientService.registerClient(username, password).then((data: { authenticated: boolean, username: string, token: string }) => {
          console.log(data);
          if (data.authenticated) {
            console.log(data.token);
            localStorage.setItem("id_token", data.token);
            localStorage.setItem("username", data.username);
            this.router.navigateByUrl('/my-lists');
          }
        });
      } else {
        console.log('Passwords different!');
      }
    }
  }
}
