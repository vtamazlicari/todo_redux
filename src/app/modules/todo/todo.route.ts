import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TodoListComponent} from './container/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
];

export const TodoRoute: ModuleWithProviders = RouterModule.forChild(routes);
