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

    if (changes['loading']) {
      console.log(changes['loading'].currentValue);
    }
  }

  onSubmit(event:any): void {  
    
    if(this.itemForm.valid) {
      this.pushValues();
    }
  }

  pushValues(): void {
    this.sendResults.emit(this.itemForm.value);
  }

}
