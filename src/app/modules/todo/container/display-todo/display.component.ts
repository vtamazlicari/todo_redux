import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Store} from '@ngrx/store';

import {TodoListState, TodoState} from '../../store/todo.state';
import {TodoModalComponent} from '../todo-list/todo-modal/todo-modal.component';
import {DeleteTodo, GetTodos} from '../../actions/todo.actions';
import {OnDestroy} from '@angular/core';
import {selectAllTodoItems, selectError} from '../../selectors/selectors';

export interface AppState {
  todo: TodoListState;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  bsModalRef: BsModalRef;
  tasks: Observable<any>;
  error$: Observable<any>;
  isError = false;
  errorMessage: string;

  constructor(private store: Store<TodoListState>,
              private modalService: BsModalService,
              private ref: ChangeDetectorRef) {
    this.tasks = this.store.select(selectAllTodoItems);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.getTodos();
    this.tasks.subscribe(res => {
      console.log(res);
    });
    // this.error$.subscribe(error => {
    //   console.log(error);
    // });
  }


  isErrorSet(boolValue, message) {
    this.isError = boolValue;
    //console.log(message.error);
    this.errorMessage = message.name;
  }

  getTodos() {
    this.store.dispatch(new GetTodos());
  }

  deleteTodo(task) {
    this.store.dispatch(new DeleteTodo(task));
  }

  openEditModal(task) {
    const initialState = {
      item: task,
    };
    this.bsModalRef = this.modalService.show(TodoModalComponent, {initialState});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
