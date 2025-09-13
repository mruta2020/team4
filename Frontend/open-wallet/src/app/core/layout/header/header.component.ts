import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {UserService} from "../../../services/user.service";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, ButtonModule]
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

}
