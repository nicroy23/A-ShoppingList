import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-preview',
  templateUrl: './list-preview.component.html',
  styleUrls: ['./list-preview.component.css']
})
export class ListPreviewComponent implements OnInit {

  /**
   * Is the list that's coming from the all-list component. (Parent of this component). 
   */
  @Input() list: { _id: string, user: string, list_name: string, creation_date: string, items: [] };

  constructor() { }

  ngOnInit(): void {
  }

  deleteThisList(id: string): void {
    console.log(id);
  }
}
