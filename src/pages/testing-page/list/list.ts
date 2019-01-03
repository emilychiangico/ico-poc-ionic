import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {GradientColorUtil} from '../../../providers-v2/util/gradient-color-util';
import { PortfolioHoldingType } from '../../../providers-v2/util/portfolio-holding-util';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string, type: number}>;
  label: string[];
  type: number[];

  // @ViewChildren('pointCanvas') pointCanvasList: QueryList<ElementRef>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.label = ["Saving & Current", "Time Deposit", "Linked Deposit", "Stock",
    "Bond, Note & Certificate of Deposit", "Unit Trust", "Structured Products", "Option & Derivatives Contract",
    "Loan", "Forward Foreign Exchange"];

    this.type = [PortfolioHoldingType.SavingAndCurrent, PortfolioHoldingType.TimeDeposit, PortfolioHoldingType.StructuredProduct, PortfolioHoldingType.Stock, 
      PortfolioHoldingType.BondNoteCertDeposit, PortfolioHoldingType.UnitTrust, PortfolioHoldingType.LinkedDeposit, 
      PortfolioHoldingType.OptionAndDerivativerContract, PortfolioHoldingType.Loan, PortfolioHoldingType.ForwardForeignExchange ];

    this.items = [];
    for (let i = 0; i < 10; i++) {
      this.items.push({
        title: this.label[i],
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        type: this.type[i],
      });
    }
  }

  ngOnInit() {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MixedChartPage');
  //   this.drawPoint(this.pointCanvasList);
  // }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  // drawPoint(pointCanvanList) {

  //   console.log(pointCanvanList);

  //   pointCanvanList.forEach((canvan, index) => {
      
  //     let el = canvan.nativeElement;
  //     let ctx = el.getContext("2d");

  //     let centerW = el.width / 2;
  //     let centerH = el.height / 2;
      
  //     let gradientColors = GradientColorUtil.getColorByPortfolioHoldingType(this.type[index]);
      
  //     ctx.beginPath();
  //     ctx.arc(centerW, centerH, 10, 0, 2 * Math.PI, false);
  //     ctx.fillStyle = GradientColorUtil.getPointGradientColor(ctx, el.width, el.height, gradientColors.area);
  //     ctx.fill();

  //   });
  // }

}
