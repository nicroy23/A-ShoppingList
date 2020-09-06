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

  /**
   * Function to add the list item to the list. Gets called on button/enterKey click
   * 
   * @param name - The name/content of the list item to add
   */
  addItemToList(name: string): void {
    if (name !== '') {
      this.itemsService.items.push({ id: this.randomId(), name: name, checked: false });
    }
  }

  /**
   * Function that generates a random id of length 6 for the item. Not too complicated because the id is internat with a specific list
   * 
   * @return The random id generated
   */
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
