import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../../base-page';

@IonicPage()
@Component({
	selector: 'page-holding-list',
	templateUrl: 'holding-list.html',
})
export class HoldingListPage extends BasePage {

	holdingInfo = {
		selectedAccountType: null,
		header: [],
		data: []
	}

	constructor(injector: Injector) {
		super(injector);
	}

	ionViewWillEnter() {
		console.log("HoldingListPage >> ionViewWillEnter");
		this._event.subscribe('change-type-list', (holdingData) => {
			console.log('change-type-list >> ');
			console.log(holdingData);
			this.holdingInfo = holdingData;
		});
	}

	ionViewWillLeave() {
		console.log("HoldingListPage >> ionViewWillLeave");
		this._event.unsubscribe('change-type-list');
	}

	ionViewWillUnload() {
		console.log("HoldingListPage >> ionViewWillUnload");
		this._event.unsubscribe('change-type-list');
	}

}