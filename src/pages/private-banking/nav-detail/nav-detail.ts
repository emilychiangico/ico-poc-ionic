import { Component,Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base-page';

@IonicPage()
@Component({
	selector: 'page-nav-detail',
	templateUrl: 'nav-detail.html',
})
export class NavDetailPage extends BasePage {

	dataList = [];

	constructor(injector: Injector) {
		super(injector);
	}

	ngOnInit() {
		let data = this._navParams.data;
		this.dataList = data.detail;
	}

}