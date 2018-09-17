import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Store} from '@ngrx/store';

import {TodoListState} from '../../store/todo.state';
import {TodoModalComponent} from '../todo-list/todo-modal/todo-modal.component';
import {DeleteTodo, GetTodos} from '../../actions/todo.actions';
import {OnDestroy} from '@angular/core';
import {selectAllTodoItems, selectError} from '../../selectors/selectors';
import {AlertComponent} from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {
  @ViewChild ('errorRequest', {read: ViewContainerRef}) container;

  destroy$: Subject<boolean> = new Subject<boolean>();
  bsModalRef: BsModalRef;
  tasks: Observable<any>;
  error$: Observable<any>;
  componentRef: any;

  constructor(private store: Store<TodoListState>,
              private modalService: BsModalService,
              private resolver: ComponentFactoryResolver) {
    this.tasks = this.store.select(selectAllTodoItems);
    this.error$ = this.store.select(selectError);
  }


  createAlertComponent(errorMessage) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(AlertComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.errorMessage = errorMessage;
  }

  ngOnInit() {
    this.getTodos();
    this.error$.subscribe(error => {
      if (error !== null) {
        this.createAlertComponent(error.name);
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
    this.componentRef.destroy();
  }
}
