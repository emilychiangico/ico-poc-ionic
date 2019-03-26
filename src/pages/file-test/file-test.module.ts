import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileTestPage } from './file-test';

@NgModule({
  declarations: [
    FileTestPage,
  ],
  imports: [
    IonicPageModule.forChild(FileTestPage),
  ],
})
export class FileTestPageModule {}
