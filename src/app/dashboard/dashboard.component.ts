import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false; 
  constructor() { }

  ngOnInit(): void {
    this.isSidebarCollapsed = false;
  }

    onSidebarToggle(value: boolean) {
    this.isSidebarCollapsed = value;
  }
}
