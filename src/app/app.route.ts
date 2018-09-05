import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/todo/todo.module#TodoModule',
  },
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

