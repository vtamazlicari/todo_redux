import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {addTaskReducer} from './store/todo/todo.reducers';
import {CoreModule} from './core/core.module';
import {appRoutes} from './app.route';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    appRoutes,
    BrowserModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    StoreModule.forRoot({
      todo: addTaskReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
