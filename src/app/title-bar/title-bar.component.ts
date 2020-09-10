import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  /**
   * Field that comes from the list component to set the correct name to the title bar. My Lists if user is at the main page
   */
  @Input() title: string = "My Lists";

  constructor(private clientService: ClientService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  /**
   * Function to logout user. Is called on logout-btn pressed. This function then calls the logout function in the user service. See
   * client.service.logoutClient() for more explanation on the logout logic
   */
  logoutUser(): void {
    this.clientService.logoutClient()
    .then(() => {
      this.openSnackBar("💐 Have a great day!");
      this.router.navigateByUrl('/login') 
    })
    .catch(errorMsg => {
      this.openSnackBar("❌ " + errorMsg);
    });
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });
  }

}
