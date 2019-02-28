import { Injector, Component, Input, OnInit } from '@angular/core'

@Component({
    selector:"pd-amount",
    templateUrl: "pd-amount.html"
})
export class PbAmountComponent implements OnInit {

    @Input('info') info: any;

    constructor(injector: Injector) {
    }

    ngOnInit() {
    }

    popup() {
        console.log("PbAmountComponent >> popup")
    }

}