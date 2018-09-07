import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {addTaskReducer} from './modules/todo/reducers/todo.reducers';
import {CoreModule} from './core/core.module';
import {appRoutes} from './app.route';
import {ModalModule} from 'ngx-bootstrap';
import {EffectsModule} from '@ngrx/effects';
import {TodoEffects} from './modules/todo/effects/todo.effects';

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
    }),
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
