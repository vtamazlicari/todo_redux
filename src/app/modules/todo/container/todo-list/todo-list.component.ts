import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AppState} from '../../../../store/todo/todo.state';
import {Todo} from 'src/app/shared/models/todo.model';
import {ADD_TASK} from '../../../../shared/constants/constants';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent implements OnInit {
  angForm: FormGroup;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  addTodo(id, name) {
    this.store.dispatch({
      type: ADD_TASK,
      payload: <Todo> {
        id: id,
        name: name,
      },
    });
  }

  ngOnInit() {
  }
}
