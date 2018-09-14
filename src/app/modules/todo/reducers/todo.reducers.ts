import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  EDIT_TASK, EDIT_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_SUCCESS, REQUEST_ERROR
} from '../../../shared/constants/constants';
import {adapter, State} from '../store/todo.state';
import {Actions} from '../actions/todo.actions';

export const initialState: State = adapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);

export function addTaskReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case GET_TASKS:
      return {error: null, isLoading: true, ...state};
    case GET_TASKS_SUCCESS:
      return adapter.addMany(action.payload.data, {...state, isLoading: false, error: null});
    case ADD_TASK:
      return {...state, isLoading: true, error: null};
    case ADD_TASK_SUCCESS:
      return adapter.addOne(action.payload, {...state, isLoading: false, error: null});
    case DELETE_TASK:
      return {...state, isLoading: true, error: null};
    case DELETE_TASK_SUCCESS:
      return adapter.removeOne(action.payload.id, {...state, isLoading: false, error: null});
    case EDIT_TASK:
      return {...state, isLoading: true, error: null};
    case EDIT_TASK_SUCCESS:
      console.log(action);
      return adapter.updateOne({id: action.id, changes: action.changes}, {...state, isLoading: false, error: null});
    case REQUEST_ERROR:
      return {...state, isLoading: false, error: action.payload.error};
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();
