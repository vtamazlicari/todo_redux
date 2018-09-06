import {Todo} from '../../shared/models/todo.model';
import {ADD_TASK, DELETE_TASK, EDIT_TASK} from '../../shared/constants/constants';

export function addTaskReducer(state: Todo[] = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return removeItem(state, action);
    case EDIT_TASK:
          return updateObjectInArray(state, action);
    default:
      return state;
  }
}

function removeItem(array, action) {
  const newArray = array.slice();
  newArray.splice(action.index, 1);
  return newArray;
}

function updateObjectInArray(array, action) {
  return array.map( (item, index) => {
    if (index !== action.index) {
      return item;
    }
    return {
      ...item,
      ...action.payload
    };
  });
}
