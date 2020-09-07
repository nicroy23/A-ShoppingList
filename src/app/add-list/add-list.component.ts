import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListService } from '../list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  public date: string;

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentDate();
  }

  /**
   * Function that automatically sets the component's date to today's date
   */
  getCurrentDate(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.date = mm + '/' + dd + '/' + yyyy;
  }

  /**
   * Function that posts the new list to the server by calling the new list function in the list service. Gets a promise back which contains
   * the new list's info. This info can then be used to then navigate to that newly created list. NEED TO CHANGE THE NIC_ROY23 NAME TO THE 
   * CURRENT USERS'S NAME!!!!
   * 
   * @param listName - Name of the new list created
   */
  newList(listName: string): void {
    if (listName !== "") {
      //CHANGE NAME LOGIC
      this.listService.createNewList('nic_roy23', listName, this.date).then((data: { items: [], user: string, list_name: string, creation_date: string, _id: string }) => {
        console.log(data);
        this.router.navigateByUrl(`/${data.user}/list/${data._id}`);
      });
    }
  }
}
