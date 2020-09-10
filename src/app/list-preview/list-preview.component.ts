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

  askConfirmation(id: string) {
    let snackBarRef = this._snackBar.open("❔ Do you really want to delete this list?", 'Yes', {
      duration: 3000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });

    snackBarRef.onAction().subscribe(() => {
      this.listService.deleteList(id).then(data => {
        this._snackBar.open("✅ List deleted!", '', {
          duration: 3000,
          horizontalPosition: "start",
          verticalPosition: "top"
        });
        this.refresh.emit(null)
      })
        .catch(errorMsg => {
          this._snackBar.open('❌ ' + errorMsg, '', {
            duration: 3000,
            horizontalPosition: "start",
            verticalPosition: "top"
          });
        })
        ;
    })
  }
}
