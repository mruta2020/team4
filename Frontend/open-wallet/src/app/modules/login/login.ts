import {Component, OnInit} from '@angular/core';
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserType} from "../../types/types";

@Component({
  selector: 'app-login',
  imports: [
    Card,
    Button
  ],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.onLogout();
  }

  onLogin() {

    const type: UserType = this.route.snapshot.data['type'];
    this.userService.onLogin(type).subscribe((res) => {
      this.router.navigate(['/']);
    });

  }
}
