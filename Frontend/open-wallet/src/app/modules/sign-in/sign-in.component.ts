import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [ButtonModule]
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
