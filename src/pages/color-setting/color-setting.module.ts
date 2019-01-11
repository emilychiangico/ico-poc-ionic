import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorSettingPage } from './color-setting';

@NgModule({
  declarations: [
    ColorSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorSettingPage),
  ],
})
export class ColorSettingPageModule {}
