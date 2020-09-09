import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ItemsService } from '../items.service';
import { ListService } from '../list.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  public items: { id: string, name: string, checked: boolean }[];
  public showInput: boolean;
  public pourcentage: number;
  public name: string;
  public listId: string;

  constructor(private itemsService: ItemsService, private listService: ListService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setItems();
  }

  /**
   * Function used to update the list in DB BEFORE the component gets destroyed, so it only call the when you're completely done with the list. 
   * Maybe will change this logic because does not get called when the user closes the page... 
   */
  ngOnDestroy(): void {
    this.listService.updateExistingList(this.route.snapshot.paramMap.get('client'), this.listId, this.items).then(data => {
      console.log(data);
    });
  }

  /**
   * When the component loads, it sets the items in the list to the items in the itemsService. It is based on an async/promise operation, 
   * so that is why it is important to use the .then() to update the items of the component. Also calls for the method setProgress(), 
   * because it needs to set the progress of the list after getting the items checked or not.
   * 
   * @returns Nothing.
   */
  setItems(): void {
    this.itemsService.getAllItemsFromList(this.route.snapshot.paramMap.get('id')).then((data: { id: string, name: string, checked: boolean }[]) => {
      this.items = data;
      this.name = this.itemsService.getListName();
      this.listId = this.route.snapshot.paramMap.get('id');
      this.setProgress();
    })
      .catch(errorMsg => {
        this.openSnackBar('❌ ' + errorMsg);
      });;
  }

  /**
   * Sets the progress bar to the right length.
   * 
   * @returns Nothing.
   */
  setProgress(): void {
    this.pourcentage = this.itemsService.getProgress();
  }

  /**
   * Updates the progress bar on button click, which comes from a child of the list component. The $event carries the new pourcentage, 
   * which get calculated by the child emitting the event. The communication is made by emitting and receiving events from child to parent.
   * 
   * @return Nothing.
   */
  public updateProgress($event): void {
    this.pourcentage = $event;
  }

  /**
   * Function from Angular Material drag and drop feature. Makes it possible to change the order of the list items.
   * 
   * @param event Event from the function call.
   * 
   * @return Nothing.
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: "start",
      verticalPosition: "top"
    });
  }

}
