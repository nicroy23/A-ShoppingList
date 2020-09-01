import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public items = [{ id: "5G7x4", name: "Carrottes", checked: false }, { id: "29Ijk", name: "Fromage", checked: false }, { id: "a6x4F", name: "Patates", checked: false }, { id: "ip94S", name: "Pizza", checked: false }];
  public pourcentage: number;

  constructor() { }

  getAllItems() {
    return this.items;
  }

  updateItemCheck(id: string, check: boolean): void {
    this.items[this.findIndexById(id)].checked = check;
    this.getProgress();
  }

  findIndexById(id: string): number {
    let index = 0;
    
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getNumItemsChecked(): number {
    let num = 0;
    
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].checked) {
        num++;
      }
    }

    return num;
  }

  getProgress(): number {
    return Math.round(this.getNumItemsChecked() / this.items.length * 100);
  }
}
