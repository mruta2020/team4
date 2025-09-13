import { Component, OnInit } from '@angular/core';
import {LogAccess} from "../../model/log-access.model";
import {DatePipe, NgClass} from "@angular/common";
import {Chip} from "primeng/chip";
import {LogAccessState} from "../../components/log-access-state/log-access-state";
import {MOCK_LOGS_ACCESS} from "../../mock/log-access";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
  ],
  standalone: true,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor() { }

  ngOnInit() {


  }

}
