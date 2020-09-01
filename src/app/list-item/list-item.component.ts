import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() item: object;

  @Output() messageEvent = new EventEmitter<number>();

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    
  }

  toggleDone(): void {
    this.itemsService.updateItemCheck(this.item.id, !this.item.checked);
    this.messageEvent.emit(this.itemsService.getProgress());
  }

}
