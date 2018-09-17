import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import {
  CreateTodo,
  CreateTodoSuccess,
  DeleteTodo,
  DeleteTodoSuccess,
  EditTodo,
  EditTodoSuccess,
  GetTodos,
  GetTodosSuccess, RequestError
} from '../actions/todo.actions';
import {ADD_TASK, DELETE_TASK, EDIT_TASK, GET_TASKS} from '../../../shared/constants/constants';
import {BkService} from '../../../core/services/bk.service';

@Injectable()
export class TodoEffects {
  @Effect()
  GetTodos$: Observable<Action> = this.actions$.pipe(
    ofType<GetTodos>(GET_TASKS)
    , mergeMap(action =>
      this.bkService.httpRequest('GET', '/todo').pipe(
        map((data) => {
          return new GetTodosSuccess({data});
        }),
        catchError((error) => of(new RequestError({error})))
      )
    )
  );

  @Effect()
  createTodo$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTodo>(ADD_TASK)
    , mergeMap(action =>
      this.bkService.httpRequest('POST', '/todo', action.payload).pipe(
        map((data: Response) => {
          return new CreateTodoSuccess(data);
        }),
        catchError((error) => of(new RequestError({error})))
      )
    )
  );

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTodo>(DELETE_TASK)
    , mergeMap(action =>
      this.bkService.httpRequest('DELETE', '/todo/' + action.payload.id).pipe(
        map((data: Response) => {
          return new DeleteTodoSuccess(action.payload);
        }),
        catchError((error) => of(new RequestError({error})))
      )
    )
  );

  @Effect()
  editTodo$: Observable<Action> = this.actions$.pipe(
    ofType<EditTodo>(EDIT_TASK)
    , mergeMap(action =>
      this.bkService.httpRequest('PUT', '/todo/' + action.payload.curentItem.id, action.payload.newItem).pipe(
        map((data: Response) => {
          return new EditTodoSuccess(action.payload.newItem.id, action.payload.newItem);
        }),
        catchError((error) => of(new RequestError({error})))
      ))
  );


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private bkService: BkService
  ) {
  }
}
