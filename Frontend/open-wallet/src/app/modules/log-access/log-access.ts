import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {MOCK_LOGS_ACCESS} from "../../mock/log-access";
import {LogAccess} from "../../model/log-access.model";
import {LogAccessState} from "../../components/log-access-state/log-access-state";

@Component({
  selector: 'app-log-access',
  imports: [
    DatePipe,
    PrimeTemplate,
    TableModule,
    LogAccessState
  ],
  templateUrl: './log-access.html',
  styleUrl: './log-access.scss'
})
export class LogAccessComponent implements OnInit{

  data: LogAccess[] = MOCK_LOGS_ACCESS.splice(0, 5);

  ngOnInit() {
  }

}
