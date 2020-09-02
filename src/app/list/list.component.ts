import { Component, OnInit } from '@angular/core';

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

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items = this.itemsService.getAllItems();
  }

  public updateProgress($event): void {
    this.pourcentage = $event;
  }

  addPressed(): void {
    this.showInput = !this.showInput;
  }

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
