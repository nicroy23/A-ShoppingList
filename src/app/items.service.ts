import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public items: { id: string, name: string, checked: boolean }[];
  public listName: string;
  public pourcentage: number;

  constructor(private http: HttpClient, private clientService: ClientService) { }

  /**
   * Function to allow the list component to get all the list items from the server. It also updates this.items to allow the other
   * functions to use and update the array in the items service. This makes it easier to manage the items by multiple components
   * and also by this service.
   * 
   * ++The localStorage stores the json tokem received from the server++
   * 
   * @param id - The id of the list to get items from. Comes from the component who calls this method.
   * 
   * @return - A promise, because the action is asyncronous. This allows the component to get the service items AFTER the server has returned
   * the items, so that the list component does not get an empty array or the wrong items.
   */
  getAllItemsFromList(id: string) {
    const API_URL = `https://surrealist.herokuapp.com/${localStorage.getItem("username")}/list/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.get<{ id: string, list_name: string; items: [] }>(API_URL, httpOptions).subscribe(
        data => {
          this.items = data.items;
          this.listName = data.list_name;
          resolve(data.items);
        },
        error => {
          reject(error.error.error);
        })
    });
  }

  /**
   * Function to update the state of the parameter 'checked' of the item.
   * 
   * @param id - The id of the item. NOT THE MONGODB ID BUT THE ONE GENERATED BY THIS SERVICE.
   * @param check - Whether the item is checked (done) or not. Updates the one in DB with this value.
   */
  updateItemCheck(id: string, check: boolean): void {
    this.items[this.findIndexById(id)].checked = check;
    this.getProgress();
  }

  updateItemName(id: string, name: string) {
    this.items[this.findIndexById(id)].name = name;
  }

  /**
   * Function to return the index in the items array by searching the array with the item id.
   * 
   * @param id - The id of the item to search.
   * 
   * @return The index of the specific item.
   */
  findIndexById(id: string): number {
    let index = 0;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  /**
   * Function to get the number of checked items in the items array
   * 
   * @return The number of checked items in the array
   */
  getNumItemsChecked(): number {
    let num = 0;
    
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].checked) {
        num++;
      }
    }

    return num;
  }

  /**
   * Function to get the progress of the list by calculating a pourcentage
   * 
   * @return The progress of the list (int)
   */
  getProgress(): number {
    return Math.round(this.getNumItemsChecked() / this.items.length * 100);
  }

  /**
   * Returns the name of the list.
   */
  getListName(): string {
    return this.listName;
  }
}
