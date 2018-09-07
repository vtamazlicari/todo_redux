import {Action} from '@ngrx/store';

import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_SUCCESS, EDIT_TASK, EDIT_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_SUCCESS, REQUEST_ERROR
} from '../../../shared/constants/constants';

export class GetTodos implements Action {
  readonly type = GET_TASKS;
}

export class GetTodosSuccess implements Action {
  readonly type = GET_TASKS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class RequestError implements Action {
  readonly type = REQUEST_ERROR;

  constructor(public payload: any) {
  }
}

export class CreateTodo implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: any) {
  }
}

export class CreateTodoSuccess implements Action {
  readonly type = ADD_TASK_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: any) {
  }
}

export class DeleteTodoSuccess implements Action {
  readonly type = DELETE_TASK_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditTodo implements Action {
  readonly type = EDIT_TASK;

  constructor(public payload: any) {
  }
}

export class EditTodoSuccess implements Action {
  readonly type = EDIT_TASK_SUCCESS;

  constructor(public payload: any) {
  }
}
