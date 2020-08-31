import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public items = ["Carrottes", "Pommes", "Fromage", "Oignons"];

  constructor() { }

  getAllItems() {
    return this.items;
  }
}
