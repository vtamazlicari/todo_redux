import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TodoListComponent} from './container/todo-list/todo-list.component';
import {TodoRoute} from './todo.route';
import {DisplayComponent} from './container/display-todo/display.component';
import {TodoModalComponent} from './container/todo-list/todo-modal/todo-modal.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {addTaskReducer} from './reducers/todo.reducers';
import {SharedModule} from '../../shared/shared.module';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TodoRoute,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    StoreModule.forFeature('todo', addTaskReducer),
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true,
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  declarations: [
    TodoListComponent,
    DisplayComponent,
    TodoModalComponent,
  ],
  entryComponents: [TodoModalComponent],
  exports: [TodoListComponent, DisplayComponent],
})
export class TodoModule {
}
