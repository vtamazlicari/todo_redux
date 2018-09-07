import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {Store} from '@ngrx/store';

import {AppState} from '../../../store/todo.state';
import {EditTodo} from '../../../actions/todo.actions';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit {

  angForm: FormGroup;
  item;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>,
              public itemModalRef: BsModalRef) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  editTodo(name) {
    this.store.dispatch(new EditTodo({newItem: {id: this.item.id, name: name}, curentItem: this.item}));
    this.itemModalRef.hide();
  }

  ngOnInit() {
  }

}
