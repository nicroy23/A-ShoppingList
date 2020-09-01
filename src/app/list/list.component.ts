import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items: string[];
  public showInput: boolean;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items = this.itemsService.getAllItems();
  }

  addPressed():void {
    this.showInput = !this.showInput;
  }

}