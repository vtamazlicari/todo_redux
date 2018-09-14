import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Store} from '@ngrx/store';

import {TodoListState} from '../../store/todo.state';
import {TodoModalComponent} from '../todo-list/todo-modal/todo-modal.component';
import {DeleteTodo, GetTodos} from '../../actions/todo.actions';
import {OnDestroy} from '@angular/core';
import {selectAllTodoItems, selectError} from '../../selectors/selectors';

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
  errorMessage: string;

  constructor(private store: Store<TodoListState>,
              private modalService: BsModalService) {
    this.tasks = this.store.select(selectAllTodoItems);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.getTodos();
    this.tasks.subscribe(res => {
      console.log(res);
    });
    this.error$.subscribe(error => {
      if (error !== null) {
        this.errorMessage = error.name;
      }
    });
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
