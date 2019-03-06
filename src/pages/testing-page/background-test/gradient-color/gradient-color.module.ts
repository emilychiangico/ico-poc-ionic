import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GradientColorPage } from './gradient-color';

@NgModule({
    declarations: [
        GradientColorPage,
    ],
    imports: [
        IonicPageModule.forChild(GradientColorPage),
    ],
})
export class GradientColorPageModule { }
