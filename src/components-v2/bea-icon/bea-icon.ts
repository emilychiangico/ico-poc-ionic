import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core'

@Component({
    selector: 'bea-icon',
    templateUrl: 'bea-icon.html',
    host: {
        'class': 'bea-icon'
    }
})
export class BeaIconComponent implements OnInit, OnChanges {

    @Input('name') name: string = '';

    constructor(public elementRef: ElementRef,
                public renderer: Renderer2) {
    }

    ngOnInit() {
        let ele: HTMLElement = this.elementRef.nativeElement;
        if(ele.getAttribute('aria-hidden') === null) {
            ele.setAttribute('aria-hidden', 'true');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        let nameChange = changes['name'];
        if(nameChange) {
            if(nameChange.previousValue) this.renderer.removeClass(this.elementRef.nativeElement, 'bea-' + nameChange.previousValue);
            this.renderer.addClass(this.elementRef.nativeElement, 'bea-' + this.name);
        }
    }
}