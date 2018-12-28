import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetAllocationDetailPage } from './asset-allocation-detail';

@NgModule({
  declarations: [
    AssetAllocationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetAllocationDetailPage),
  ],
})
export class AssetAllocationDetailPageModule {}
