import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  @Input() itemName: string;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  addItemToList(name: string): void {
    this.itemsService.items.push(name);
  }

}
