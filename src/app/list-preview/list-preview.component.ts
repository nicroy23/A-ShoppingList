import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ListService } from '../list.service';

@Component({
  selector: 'app-list-preview',
  templateUrl: './list-preview.component.html',
  styleUrls: ['./list-preview.component.css']
})
export class ListPreviewComponent implements OnInit {

  /**
   * Is the list that's coming from the all-list component. (Parent of this component). 
   */
  @Input() list: { _id: string, user: string, list_name: string, creation_date: string, items: [] };

  @Output() refresh = new EventEmitter<any>();

  constructor(private listService: ListService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Function that asks the user if he really wants to delete that list. Gets confirmation from snackbar
   * that opens up.
   * 
   * @param id - The id of the list to delete.
   */
  askConfirmation(id: string) {
    let snackBarRef = this._snackBar.open("❔ Do you really want to delete this list?", 'Yes', {
      duration: 3000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });

    //Action of the snackbar (in this case, it is a yes button push.)
    snackBarRef.onAction().subscribe(() => {
      this.listService.deleteList(id).then(data => {
        this._snackBar.open("✅ List deleted!", '', {
          duration: 3000,
          horizontalPosition: "start",
          verticalPosition: "top"
        });
        this.refresh.emit(null) //Emits empty event so that the parent (list) calls the list service to request the server.
      })
        .catch(errorMsg => {
          if(errorMsg) {
          this.openSnackBar('❌ ' + errorMsg);
        } else {
          this.openSnackBar('❌ Error, Please try again.');
        }
        })
        ;
    })
  }

  //General function to open a snackbar with a message in it.
  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });
  }
}
