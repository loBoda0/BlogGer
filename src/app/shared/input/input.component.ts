import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string
  @Input() control: FormControl
  @Input() inputType: string
  @Input() controlType = 'input'

  constructor() { }

  ngOnInit(): void {
  }

  displayErrors() {
    const { touched, errors } = this.control
    return touched && errors
  }

  getValidationStyle() {
    if (this.displayErrors()) {
      return 'border-red-300'
    }
    return 'border-gray-300'
  }
}
