import { Injector, Component, Input, OnInit } from '@angular/core'

@Component({
    selector:"pd-amount",
    templateUrl: "pd-amount.html"
})
export class PbAmountComponent implements OnInit {

    @Input('amount') amount: number;
    @Input('date') date: string;

    constructor(injector: Injector) {
    }

    ngOnInit() {
    }

}