import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ProfolioHoldingMaster } from '../portfolio-holding-master';

@IonicPage()
@Component({
	selector: 'page-holding-list',
	templateUrl: 'holding-list.html',
})
export class HoldingListPage extends ProfolioHoldingMaster {

	constructor(injector: Injector) {
		super(injector);
	}

	ionViewWillEnter() {
		this._event.subscribe('change-type-list', (holdingData) => {
			console.log('change-type-list >> ');
			console.log(holdingData);
			this.holdingInfo = holdingData;
		});
	}

}