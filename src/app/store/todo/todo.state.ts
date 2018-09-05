import {Todo} from '../../shared/models/todo.model';

export interface AppState {
  readonly todo: Todo[];
}
