import { Injector, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PortfolioHoldingPage } from '../../../pages/private-banking/portfolio-holding/portfolio-holding';

@Component({
    selector:"pb-list-item",
    templateUrl: "pb-list-item.html"
})
export class PbListItemComponent implements OnInit {

    @Input('header') header: any = null;

    @Input('type') type: string;
    @Input('data') dataList: any[];
    @Input('pureColor') isPureColor: boolean = false;
    @Input('detailExpand') detailExpand: boolean = false;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    constructor(injector: Injector,
        public navCtrl: NavController) {
    }

    ngOnInit() {
        console.log('init LegendPointComponent');
        console.log('type >> ' + this.type);

        console.log('dataList >> ');
        console.log(this.dataList);
    }

    goToPortfolioHolding(type) {
        this.navCtrl.setRoot(PortfolioHoldingPage, {type: type});
    }

}