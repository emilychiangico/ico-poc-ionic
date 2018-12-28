import { Injector, Component, Input, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector:"bea-list-item",
    templateUrl: "bea-list-item.html"
})
export class BeaListItemComponent implements OnInit {

    @Input('header') header: any = null;

    @Input('type') type: string;
    @Input('data') dataList: any[];

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

    goToPage(pageId) {
        if(pageId) {
            this.navCtrl.push(pageId);
        }
    }

}