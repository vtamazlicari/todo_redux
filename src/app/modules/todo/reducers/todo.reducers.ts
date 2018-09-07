import {Todo} from '../../../shared/models/todo.model';
import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  EDIT_TASK, EDIT_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_SUCCESS, REQUEST_ERROR
} from '../../../shared/constants/constants';

export function addTaskReducer(state: Todo[] = [], action) {
  switch (action.type) {
    case GET_TASKS:
      return [...state];
    case ADD_TASK:
      return [...state];
    case GET_TASKS_SUCCESS:
      return [...state, ...action.payload];
    case ADD_TASK_SUCCESS:
      return [...state, action.payload];
    case DELETE_TASK:
      return [...state];
    case DELETE_TASK_SUCCESS:
      return removeItem(state, action);
    case EDIT_TASK:
      return [...state];
    case EDIT_TASK_SUCCESS:
      return updateObjectInArray(state, action);
    case REQUEST_ERROR:
      return action.error;
    default:
      return state;
  }
}

function removeItem(array, action) {
  const newArray = array.filter(element => element.id !== action.payload.id);
  return newArray;
}

function updateObjectInArray(array, action) {
  return array.map( (item) => {
    if (item.id !== action.payload.curentItem.id) {
      return item;
    }
    return {
      ...item,
      ...action.payload.newItem
    };
  });
}
