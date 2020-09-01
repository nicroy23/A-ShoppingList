import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items: {id: string, name: string, checked: boolean}[];
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

  addPressed():void {
    this.showInput = !this.showInput;
  }

}
