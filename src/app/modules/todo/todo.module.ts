import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TodoListComponent} from './container/todo-list/todo-list.component';
import {TodoRoute} from './todo.route';
import {DisplayComponent} from './container/display-todo/display.component';
import {TodoModalComponent} from './container/todo-list/todo-modal/todo-modal.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    TodoRoute,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    TodoListComponent,
    DisplayComponent,
    TodoModalComponent,
  ],
  entryComponents: [TodoModalComponent],
  exports: [TodoListComponent, DisplayComponent]
})
export class TodoModule {
}
