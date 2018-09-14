import {Todo} from '../../../shared/models/todo.model';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export interface TodoListState {
  todo: State[];
}

export interface State extends EntityState<Todo> {
  isLoading?: boolean;
  error?: any;
}
