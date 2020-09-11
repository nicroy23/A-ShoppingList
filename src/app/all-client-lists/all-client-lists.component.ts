import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ListService } from '../list.service';

@Component({
  selector: 'app-all-client-lists',
  templateUrl: './all-client-lists.component.html',
  styleUrls: ['./all-client-lists.component.css']
})
export class AllClientListsComponent implements OnInit {

  /**
   * Every list of specific client. 
   */
  public allLists: { _id: string, user: string, list_name: string, items: [] }[];
  public year: number;

  constructor(private listService: ListService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  /**
   * Calls the getAllLists from the list service on init, so that it gets all the data when the component loads. Updates the public allLists
   * field of this component using the promise it gets back from the service. 
   */
  ngOnInit(): void {
    this.listService.getAllLists(localStorage.getItem("username")).then((data: { _id: string, user: string, list_name: string, items: [] }[]) => {
      this.allLists = data;
    })
      .catch(errorMsg => {
        localStorage.clear(); //To make sure that no weird begavior happens if the localstorage is not empty.
        if (errorMsg) {
          this.openSnackBar('❌ ' + errorMsg);
        } else {
          this.openSnackBar('❌ Error, Please try again.');
        }
      });

    this.year = this.getYear();
  }

  /**
   * Function that gets called when the parent component gets a refresh event from the child (list-preview).
   * 
   * @param $event - The event that is receives.
   */
  refreshMe($event): void {
    this.ngOnInit();
  }

  getYear(): number {
    return new Date().getFullYear();
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });
  }
}
