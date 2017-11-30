import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit, OnChanges {

  @Output() sendResults: EventEmitter<any> = new EventEmitter();

  @Input() name: string;
  @Input() is_done: string;
  @Input() loading: boolean;

  public itemForm: FormGroup;
  

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public itemService: ItemService,
    
  ) { }

  ngOnInit() {
    this.itemForm = this.fb.group({  
      'name': [this.name, Validators.required],
      'is_done': [this.is_done],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  onSubmit(event:any): void {  
    this.loading = true;
    if(this.itemForm.valid) {
      this.pushValues();
    }
  }

  getLoading() {
    console.log(this.loading);
  }

  pushValues(): void {
    this.sendResults.emit(this.itemForm.value);
  }

}
