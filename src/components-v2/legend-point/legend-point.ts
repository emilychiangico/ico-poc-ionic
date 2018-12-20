import { Injector, Component, Input, OnInit, ViewChild} from '@angular/core'

import { GradientColorUtil } from '../../providers-v2/gradient-color-util';

@Component({
    selector:"legend-point",
    templateUrl: "legend-point.html"
})
export class LegendPointComponent implements OnInit {
    
    @ViewChild('pointCanvas') pointCanvas;

    @Input('type') type: number;

    constructor(injector: Injector) {
    }

    ngOnInit(){
        console.log('init LegendPointComponent');
        console.log('type >> ' + this.type);
        this.drawPoint();
    }

    drawPoint() {
        console.log('>>>>>>> drawPoint >>>>>>>');
        let el = this.pointCanvas.nativeElement;
        let ctx = el.getContext("2d");

        let center = el.width / 2;
        
        let gradientColors = GradientColorUtil.getColorByPortfolioHoldingType(this.type);
        
        ctx.beginPath();
        ctx.arc(center, center, center, 0, 2 * Math.PI, false);
        ctx.fillStyle = GradientColorUtil.getPointGradientColor(ctx, el.width, el.height, gradientColors.area);
        ctx.fill();
    }

}