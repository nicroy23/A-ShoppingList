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

  loginClient(username: string, password: string): void {
    if (username != '' && password != '') {
      this.clientService.loginClient(username, password).then((data: { authenticated: boolean, username: string }) => {
        if (data.authenticated) {
          this.router.navigateByUrl(`/${data.username}/all-lists`);
        }
      });
    }
  }

  registerClient(username: string, password: string, passwordRepeat: string): void {
    if (username != '' && password != '' && password != '') {
      if (password === passwordRepeat) {
        this.clientService.registerClient(username, password).then((data: { authenticated: boolean, username: string }) => {
          console.log(data);
          if (data.authenticated) {
            this.router.navigateByUrl(`/${data.username}/all-lists`);
          }
        });
      } else {
        console.log('Passwords different!');
      }
    }
  }
}
