import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ItemsService } from '../items.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items: { id: string, name: string, checked: boolean }[];
  public showInput: boolean;
  public pourcentage: number;

  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setItems();
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
      this.setProgress(); 
    });
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

}
