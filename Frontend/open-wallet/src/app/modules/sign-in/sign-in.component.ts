import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Card} from "primeng/card";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [ButtonModule, Card]
})
export class SignInComponent implements OnInit {

  constructor(private router: Router,
              private activatedRouteSnapshot: ActivatedRouteSnapshot,
              private userService: UserService) { }

  ngOnInit() {
  }

  onLogin(){

    const type = this.activatedRouteSnapshot.data['userType'];
    this.userService.onLogin(type).subscribe();
  }

}
