import {Component, input} from '@angular/core';

@Component({
  selector: 'app-label-value',
  imports: [],
  templateUrl: './label-value.html',
  styleUrl: './label-value.scss'
})
export class LabelValue {

  label = input<string>();
  value = input<string>();

}
