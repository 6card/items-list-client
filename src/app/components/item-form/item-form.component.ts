import { Component, OnInit, OnDestroy, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';

import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit, OnDestroy {

  @Output() sendResults: EventEmitter<any> = new EventEmitter();
  @Input() parentSubject:Subject<any>;

  @Input() name: string;
  @Input() is_done: string;

  public loading: boolean;
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

    this.parentSubject.subscribe(value => {
      // called when the notifyChildren method is
      // called in the parent component
      this.loading = value;
    });
  }

  ngOnDestroy() {
    // needed if child gets re-created (eg on some model changes)
    // note that subsequent subscriptions on the same subject will fail
    // so the parent has to re-create parentSubject on changes
    this.parentSubject.unsubscribe();
  }

  onSubmit(event:any): void {  
    
    if(this.itemForm.valid) {
      this.pushValues();
    }
  }

  pushValues(): void {
    this.sendResults.emit(this.itemForm.value);
    this.loading = true;
  }

}
