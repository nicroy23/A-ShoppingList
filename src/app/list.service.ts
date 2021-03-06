import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public lists: { _id: string, user: string, list_name: string, items: [] }[];

  constructor(private http: HttpClient, private clientService: ClientService) { }

  /**
   * Function that returns a promise of an array of all lists from a specific user. Also updates the public field lists from this service
   * so that other components can access this data. 
   * 
   * @param user - The username of the user we want all lists from
   * 
   * @return A promise containing all the user's lists. 
   */
  getAllLists(user: string) {
    const API_URL = `https://surrealist.herokuapp.com/${user}/all-lists`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.get<{ _id: string, user: string, list_name: string, items: [] }[]>(API_URL, httpOptions).subscribe(
        data => {
          this.lists = data;
          resolve(data);
        },
        error => {
          reject(error.error.error);
        }
      )
    });
  }

  /**
   * Function that posts the new list to the server. The last part of the URL is 0 because the API is made so that it automatically treats it
   * as a new list and creates one. The component who calls this function can use the data after the request is made. 
   * 
   * @param user - The username of the user that creates a new list. 
   * @param list_name - The name/title of the newly created list. 
   * 
   * @return A promise which contains the new list data, the same one that is stored in the DB. 
   */
  createNewList(user: string, listName: string, creationDate: string) {
    const API_URL = `https://surrealist.herokuapp.com/${user}/0`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.post<{}>(API_URL, { list_name: listName, creation_date: creationDate, items: [] }, httpOptions).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error.error.error);
        }
      )
    });
  }

  /**
   * Funtion to update a specific list in the DB. Calls the API and sends back the updated list to the component. Uses json token to authenticate
   * in the server.
   * 
   * @param user - The username of the current user.
   * @param listId - The id of the list that we want to update.
   * @param items - The items that we want to insert in DB *NOTE: Even if the items are the same, it sends all of them. It always send all the
   * items, the new ones and the old ones. It just saves everything to the DB.
   * 
   * @return A promise, which sends the updated list to the component when the server responds. 
   */
  updateExistingList(user: string, listId: string, items: { id: string, name: string, checked: boolean }[]) {
    const API_URL = `https://surrealist.herokuapp.com/${user}/${listId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.post<{}>(API_URL, { items: items }, httpOptions).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error.error.error);
        }
      )
    });
  }

  deleteList(listId: string) {
    const API_URL = `https://surrealist.herokuapp.com/list/${listId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }

    return new Promise((resolve, reject) => {
      this.http.delete<{}>(API_URL, httpOptions).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error.error.error);
        }
      )
    });
  }
}
