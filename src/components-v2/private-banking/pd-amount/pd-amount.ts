import { Injector, Component, Input, OnInit } from '@angular/core';
//import { Slides } from 'ionic-angular';

@Component({
    selector:"pd-amount",
    templateUrl: "pd-amount.html"
})
export class PbAmountComponent implements OnInit {

    @Input('info') info: any;
    @Input('isOverview') isOverview: boolean = false;

    constructor(injector: Injector) {
    }

    ngOnInit() {
    }

    popup() {
        console.log("PbAmountComponent >> popup")
    }

    //onTotalBalanceSlideDidChange(slides: Slides) {
        //let index = slides.getActiveIndex()
        //this.storage.set(SHOULD_TOTAL_BALANCE_HIDE, (index === 1));
    //}

}