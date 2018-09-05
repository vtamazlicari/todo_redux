import {Todo} from '../../shared/models/todo.model';
import {ADD_TASK, DELETE_TASK, EDIT_TASK} from '../../shared/constants/constants';

export function addTaskReducer(state: Todo[] = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      state.splice(action.payload, 1);
      return state;
    case EDIT_TASK:
      state.splice(action.index, 1, action.payload);
      return state;
    default:
      return state;
  }
}
