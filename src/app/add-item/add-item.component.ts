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
    if (name !== '') {
      this.itemsService.items.push({ id: this.randomId(), name: name, checked: false });
    }
  }

  randomId(): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
