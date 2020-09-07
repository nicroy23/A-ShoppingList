import { Component, OnInit } from '@angular/core';

import { ListService } from '../list.service';

@Component({
  selector: 'app-all-client-lists',
  templateUrl: './all-client-lists.component.html',
  styleUrls: ['./all-client-lists.component.css']
})
export class AllClientListsComponent implements OnInit {

  public allLists: { _id: string, user: string, list_name: string, items: [] }[];

  constructor(private listService: ListService) { }

  /**
   * Calls the getAllLists from the list service on init, so that it gets all the data when the component loads. Updates the public allLists
   * field of this component using the promise it gets back from the service. 
   */
  ngOnInit(): void {
    this.listService.getAllLists('nic_roy23').then((data: { _id: string, user: string, list_name: string, items: [] }[]) => {
      this.allLists = data;
      console.log(this.allLists);
    });
  }

}
