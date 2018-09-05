import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {Store} from '@ngrx/store';

import {Todo} from '../../../../../shared/models/todo.model';
import {AppState} from '../../../../../store/todo/todo.state';
import {EDIT_TASK} from '../../../../../shared/constants/constants';

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
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  editTodo(id, name) {
    this.store.dispatch({
      type: EDIT_TASK,
      index: this.item,
      payload: <Todo> {
        id: id,
        name: name,
      },
    });
    this.itemModalRef.hide();
  }

  ngOnInit() {
  }

}
