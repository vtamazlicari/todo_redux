import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TodoListState} from '../../store/todo.state';
import {CreateTodo} from 'src/app/modules/todo/actions/todo.actions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent implements OnInit {
  angForm: FormGroup;

  constructor(private store: Store<TodoListState>,
              private fb: FormBuilder,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.createForm();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  createForm() {
    this.angForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  addTodo(id, name) {
    this.store.dispatch(new CreateTodo({id: id, name: name}));
  }

  ngOnInit() {
  }
}
