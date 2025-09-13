import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    // Global
    CommonModule,
    RouterOutlet,
    
    // Layout
    SidebarComponent,
    HeaderComponent
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
