import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'pb-expand-item',
    templateUrl: 'pb-expand-item.html',
    host: {
        'class': 'pb-expand-item item-wrapper'
    },
    animations: [
        trigger('expanded', [
            state('0', style({ height: '0px', minHeight: '0px' })),
            state('1', style({ height: '*', minHeight: '*' })),
            transition('0 <=> 1', animate('300ms ease'))
        ])
    ]
})
export class PbExpandItemComponent implements OnInit{

    @Input() type: string;
    @Input() data: any;
    @Input() isExpanded: boolean = false;

    expanded: boolean = false;

    constructor(injector: Injector) {
    }

    ngOnInit() {
        this.expanded = this.isExpanded;
    }

    expand(e) {
        console.log(e.target.tagName);
        this.expanded = !this.expanded;
    }

}