import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PureColorPage } from './pure-color';

@NgModule({
    declarations: [
        PureColorPage,
    ],
    imports: [
        IonicPageModule.forChild(PureColorPage),
    ],
})
export class PureColorPageModule { }
