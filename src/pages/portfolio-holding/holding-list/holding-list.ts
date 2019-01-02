import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-holding-list',
  templateUrl: 'holding-list.html',
})
export class HoldingListPage {

	dataList = [
		{
			accountType: "HKD Current Account",
			ccy: "HKD",
			principal: 820.5,
			principalInHKD: 820.5,
			type: "savingAndCurrent"
		},
		{
			accountType: "Statement Savings Account",
			ccy: "AUD",
			principal: 216643.33,
			principalInHKD: 1288255.43,
			type: "savingAndCurrent"
		},
		{
			accountType: "Statement Savings Account",
			ccy: "CNY",
			principal: 31098.4,
			principalInHKD: 38118.38,
			type: "savingAndCurrent"
		},
		{
			accountType: "Time Deposit Account",
			referNo: "#00125",
			ccy: "HKD",
			principal: 394500,
			principalInHKD: 394500,
			effectiveDate: "2018-06-07",
			dueDate: "2018-06-07",
			interestRate: "1.8750",
			type: "timeDeposit"
		},
		{
			accountType: "Currency Link Deposit",
			referNo: "CYD00278759",
			settlementDate: "2018-06-07",
			maturityDate: "2018-06-07",
			couponRate: "2.0600",
			referValue: "1.1678",
			amount: 3000000,
			amountInHKD: 2354265,
			type: "linkedDeposit"
		},
		{
			company: "02388 BOC Hong Kong Holdings Ltd",
			ccy: "HKD",
			marketValue: 394500,
			marketValueInHKD: 394500,
			shares: 10000,
			marketPrice: 3000000,
			avgUnitCost: "--",
			type: "stock"
		}
	];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}