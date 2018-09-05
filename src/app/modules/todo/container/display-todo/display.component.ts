import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Store} from '@ngrx/store';

import {Todo} from '../../../../shared/models/todo.model';
import {AppState} from '../../../../store/todo/todo.state';
import {TodoModalComponent} from '../todo-list/todo-modal/todo-modal.component';
import {DELETE_TASK} from '../../../../shared/constants/constants';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  bsModalRef: BsModalRef;
  tasks: Observable<Todo[]>;

  constructor(private store: Store<AppState>,
              private modalService: BsModalService) {
    this.tasks = this.store.select(state => state.todo);
  }

  ngOnInit() {
  }

  deleteTodo(index) {
    this.store.dispatch({
      type: DELETE_TASK,
      payload: index,
    });
  }

  openEditModal(index) {
    const initialState = {
      item: index,
    };
    this.bsModalRef = this.modalService.show(TodoModalComponent, {initialState});
  }
}
