import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Drink } from '@app/data';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html'
})
export class DrinkDetailsComponent implements OnInit {
  form: FormGroup;
  currentDrink: Drink;
  originalTitle;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set drink(value) {
    if (value) this.originalTitle = value.title;
    this.currentDrink = Object.assign({}, value)
    this.initForm();
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this._fb.group({
      title: [this.currentDrink?.title],
      details: [this.currentDrink?.details],
    });
  }

  onSubmit() {
    this.saved.emit(this.form.value);
  }

  onCancel() {
    this.cancelled.emit(this.form.value);
  }
}
