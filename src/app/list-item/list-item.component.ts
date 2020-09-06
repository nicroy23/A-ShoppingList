import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  /**
   * Gets the list item from the parent component (list in this case)
   */
  @Input() item: {id: string, name: string, checked: boolean};

  /**
   * Outputs the event message from the toggleDone function. Needed to emit messages to other components that will receive the event
   */
  @Output() messageEvent = new EventEmitter<number>();

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    
  }

  /**
   * Function to announce that the 'check' button has been pressed to the other components that need to know
   */
  toggleDone(): void {
    this.itemsService.updateItemCheck(this.item.id, !this.item.checked);
    this.messageEvent.emit(this.itemsService.getProgress());
  }

}
