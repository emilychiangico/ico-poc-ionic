import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoldingListPage } from './holding-list';

@NgModule({
  declarations: [
    HoldingListPage,
  ],
  imports: [
    IonicPageModule.forChild(HoldingListPage),
  ],
})
export class HoldingListPageModule {}
