import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ListService } from '../list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  /**
   * Current date
   */
  public date: string;

  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setCurrentDate();
  }

  /**
   * Function that automatically sets the component's date to today's date
   */
  setCurrentDate(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.date = mm + '/' + dd + '/' + yyyy;
  }

  /**
   * Function that posts the new list to the server by calling the new list function in the list service. Gets a promise back which contains
   * the new list's info. This info can then be used to then navigate to that newly created list. NEED TO CHANGE THE NIC_ROY23 NAME TO THE 
   * CURRENT USERS'S NAME!!!!
   * 
   * @param listName - Name of the new list created
   */
  newList(listName: string): void {
    if (listName !== "") {
      this.listService.createNewList(localStorage.getItem("username"), listName, this.date).then((data: { items: [], user: string, list_name: string, creation_date: string, _id: string }) => {
        console.log(data);
        this.router.navigateByUrl(`/list/${data._id}`);
      })
        .catch(errorMsg => {
          if (errorMsg) {
            this.openSnackBar('❌ ' + errorMsg);
          } else {
            this.openSnackBar('❌ Error, Please try again.');
          }
        });;
    }
  }

  /**
   * General function that displays a snackbar with the message inside.
   *  
   * @param message - The message we want to display.
   */
  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });
  }
}
