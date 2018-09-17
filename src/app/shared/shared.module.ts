import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './components/alert/alert.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertComponent],
  entryComponents: [AlertComponent]
})
export class SharedModule {
}
