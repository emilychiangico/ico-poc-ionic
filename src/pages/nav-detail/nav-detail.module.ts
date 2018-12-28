import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavDetailPage } from './nav-detail';

@NgModule({
  declarations: [
    NavDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NavDetailPage),
  ],
})
export class NavDetailPageModule {}
