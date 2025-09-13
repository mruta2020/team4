import {Component, input} from '@angular/core';
import {Chip} from "primeng/chip";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-log-access-state',
  imports: [
    Chip,
    NgClass
  ],
  templateUrl: './log-access-state.html',
  styleUrl: './log-access-state.scss'
})
export class LogAccessState {

  status = input<string>();
}
