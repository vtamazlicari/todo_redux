import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of, Observable} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {
  CreateTodo,
  CreateTodoSuccess,
  DeleteTodo,
  DeleteTodoSuccess,
  EditTodo,
  EditTodoSuccess,
  GetTodos,
  GetTodosSuccess
} from './todo.actions';
import {ADD_TASK, DELETE_TASK, EDIT_TASK, GET_TASKS} from '../../shared/constants/constants';

@Injectable()
export class TodoEffects {
  @Effect()
  GetTodos$: Observable<Action> = this.actions$.pipe(
    ofType<GetTodos>(GET_TASKS)
    , mergeMap(action =>
      this.http.get(environment.base_url + '/todo').pipe(
        map((data: Response) => {
          return new GetTodosSuccess(data);
        })
      )
    )
  );

  @Effect()
  createTodo$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTodo>(ADD_TASK)
    , mergeMap(action =>
      this.http.post(environment.base_url + '/todo', action.payload).pipe(
        map((data: Response) => {
          return new CreateTodoSuccess(data);
        })
      )
    )
  );

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTodo>(DELETE_TASK)
    , mergeMap(action =>
      this.http.delete(environment.base_url + '/todo/' + action.payload.id).pipe(
        map((data: Response) => {
          return new DeleteTodoSuccess(action.payload);
        })
      )
    )
  );

  @Effect()
  editTodo$: Observable<Action> = this.actions$.pipe(
    ofType<EditTodo>(EDIT_TASK)
    , mergeMap(action =>
    this.http.put(environment.base_url + '/todo/' + action.payload.curentItem.id, action.payload.newItem).pipe(
      map((data: Response) => {
        return new EditTodoSuccess(action.payload);
      })
    ))
  );


  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}
