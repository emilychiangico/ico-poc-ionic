import { Injector, Component, Input, OnInit, ViewChild} from '@angular/core'

import { GradientColorUtil } from '../../providers-v2/util/gradient-color-util';

@Component({
    selector:"legend-point",
    templateUrl: "legend-point.html"
})
export class LegendPointComponent implements OnInit {
    
    @ViewChild('pointCanvas') pointCanvas;

    @Input('legendType') legendType: string;
    @Input('type') type: number;

    @Input('color') color: any;

    constructor(injector: Injector) {
    }

    ngOnInit() {
        console.log('init LegendPointComponent');
        console.log('type >> ' + this.type);
        this.createLegend();
    }

    ngOnChanges(){
        console.log("On Change:" + this.type);
        this.clear();
        this.createLegend();
    }

    createLegend() {
        if(this.legendType == "line") {
            this.drawLineLegend();
        }else {
            this.drawPointLegend();
        }
    }

    getColor(ctx?, width?, height?) {
        let color = null;
        if(!this.color) {
            color = GradientColorUtil.getColorByPortfolioHoldingType(this.type);
            if(!color) {
                return "red";
            } else {
                return GradientColorUtil.getPointGradientColor(ctx, width, height, color.area);
            }
        } else {
            return this.color;
        }
    }

    drawPointLegend() {
        console.log('>>>>>>> drawPoint >>>>>>>');
        let el = this.pointCanvas.nativeElement;
        let ctx = el.getContext("2d");

        let center = el.width / 2;
        
        //let gradientColors = GradientColorUtil.getColorByPortfolioHoldingType(this.type);
        
        ctx.beginPath();
        ctx.arc(center, center, center, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.getColor(ctx, el.width, el.height);
        ctx.fill();
    }

    drawLineLegend() {
        console.log('>>>>>>> drawlinePoint >>>>>>>');
        let el = this.pointCanvas.nativeElement;
        let ctx = el.getContext("2d");

        let center = el.width / 2;
        
        ctx.beginPath();
        ctx.arc(center, center, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.getColor();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, center);
        ctx.lineTo(el.width, center);
        ctx.strokeStyle = this.getColor();
        ctx.stroke();
    }

    clear() {
        let el = this.pointCanvas.nativeElement;
        let ctx = el.getContext("2d");
        
        ctx.clearRect(0, 0, el.width, el.height);
    }

}