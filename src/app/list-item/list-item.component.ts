import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  public done: boolean = false;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDone(): void {
    this.done = !this.done;
  }

}
