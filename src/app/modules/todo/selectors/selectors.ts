import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {adapter} from '../store/todo.state';
import {Todo} from '../../../shared/models/todo.model';
import {ActionReducerMap} from '@ngrx/store';
import * as fromTodo from '../reducers/todo.reducers';

export const selectTodoState: MemoizedSelector<object, any> = createFeatureSelector<any>('todo');

export const getError = (state): any => state.error;
export const getIsLoading = (state): boolean => state.isLoading;

export const selectTodoError: MemoizedSelector<object, any> = createSelector(
  selectTodoState,
  getError
);
export const selectError: MemoizedSelector<object, string> = createSelector(
  selectTodoError,
  (Error: any) => {
    return Error;
  }
);
export const selectTodoIsLoading: MemoizedSelector<object, boolean> = createSelector(selectTodoState, getIsLoading);
export const selectAllTodoItems: (state: object) => Todo[] = adapter.getSelectors(selectTodoState).selectAll;

export const reducers: ActionReducerMap<any> = {
  todo: fromTodo.addTaskReducer
};
