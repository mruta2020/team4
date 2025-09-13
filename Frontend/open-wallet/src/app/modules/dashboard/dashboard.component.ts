import { Component, OnInit } from '@angular/core';
import {TableModule} from "primeng/table";
import {LogAccess} from "../../model/log-access.model";
import {DatePipe, NgClass} from "@angular/common";
import {Chip} from "primeng/chip";
import {LogAccessState} from "../../components/log-access-state/log-access-state";
import {MOCK_LOGS_ACCESS} from "../../mock/log-access";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    TableModule,
    DatePipe,
    LogAccessState
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: LogAccess[];

  constructor() { }

  ngOnInit() {

    this.data = MOCK_LOGS_ACCESS.splice(0, 5);

  }

}
