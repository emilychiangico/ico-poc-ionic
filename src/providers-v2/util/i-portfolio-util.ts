import { IPortfolioInterface } from '../models/private-banking/i-portfolio-interface';

export const AccountType = {
	savingAndCurrent: "savings_n_current",
	timeDeposit: "time_deposit",
	structuredProduct: "structured_products",
	stock: "stock",
	bondNoteCertDeposit: "bond",
	unitTrust: "unit_trust",
	linkedDeposit: "linked_deposit",
	optionAndDerivativesContract: "option_n_derivatives_contract",
	loan: "loan",
	forwardForeignExchange: "forward_foreign_exchange"
};

export const NavType = {
	cashAndDeposit: "cash_n_deposit",
	investment: "investment",
	loans: "loans",
	netAssetValues: "net_asset_values",
};

export const BenchmarkType = {
	dow_jones_industrial_average_index: "dow_jones_industrial_average_index",
	hang_seng_index: "hang_seng_index",
	msci_world_index: "msci_world_index",
	sp_500_index: "sp_500_index"
}

export class IPortfolioUtil {

	/******************** getTitle by type ********************/
	static getTitle(holderType) {
		switch (holderType) {
			case AccountType.savingAndCurrent:
				return "Saving & Current";
			case AccountType.timeDeposit:
				return "Time Deposit";
			case AccountType.structuredProduct:
				return "Structured Product";
			case AccountType.stock:
				return "Stock";
			case AccountType.bondNoteCertDeposit:
				return "Bond, Note & Certifcate of Deposit";
			case AccountType.unitTrust:
				return "Unit Trust";
			case AccountType.linkedDeposit:
				return "Linked Deposit";
			case AccountType.optionAndDerivativesContract:
				return "Option & Derivativer Contract";
			case AccountType.loan:
				return "Loan";
			case AccountType.forwardForeignExchange:
				return "Forward Foreign Exchange";
			default:
				return "";
		}
	}

	/******************** setTotalAumontInfo ********************/
	static setTotalAumontInfo(ccy:string, amount:number, date:string) {
		return {
			ccy : ccy,
			amount : amount,
			date : date
		};
	}

	/******************** setAssetAllocationData ********************/
	static setAssetAllocationData(dataList: IPortfolioInterface.AssetAllocationInfo[]) {
		console.log("setAssetAllocationData >> ");
		let assetAllocationDataInfo = {
			holdingTypeList: [],
			chartData: {
				label: [],
				amount: []
			},
			percentage: []
		};
		let resultListByType = new Map();
		let dataListLen = dataList.length;

		this.sortList(dataList).forEach((item, index) => {
			assetAllocationDataInfo.chartData.label.push([item.month, item.year]);
			item.detailList.forEach((detail) => {
				let typeId = detail.accountType;
				if (resultListByType.get(typeId) == null) {
					resultListByType.set(typeId, {
						amount: [detail.amount],
						percentage: [detail.percentage]
					});
					assetAllocationDataInfo.holdingTypeList.push(typeId);
				} else {
					let ele = resultListByType.get(typeId);
					ele.amount.push(detail.amount);
					ele.percentage.push(detail.percentage);
		
					// push value again if the last value
					if (index == dataListLen - 1) {
						ele.amount.push(detail.amount);
					}
				}
			});
		});
		console.log(resultListByType);

		resultListByType.forEach((item) => {
			assetAllocationDataInfo.chartData.amount.push(item.amount);
			assetAllocationDataInfo.percentage.push(item.percentage);
		});
		let labelList = assetAllocationDataInfo.chartData.label;
		assetAllocationDataInfo.chartData.label.push(labelList[labelList.length - 1]);

		return assetAllocationDataInfo;
	}

	/******************** setNavData ********************/
	static setNavData(dataList: IPortfolioInterface.NetAssetValueInfo[]) {
		let navDataInfo = {
			chartData: {
				label: [],
				data: []
			},
			detail: []
		};

		this.sortList(dataList).forEach((item) => {
			let netAssetValue;
			let cashAndDeposit;
			let investment;
			let loan;
			item.detailList.forEach((detail) => {
				switch (detail.category) {
					case NavType.netAssetValues:
						netAssetValue = detail.amount;
						break;
					case NavType.cashAndDeposit:
						cashAndDeposit = detail.amount;
						break;
					case NavType.investment:
						investment = detail.amount;
						break;
					case NavType.loans:
						loan = detail.amount;
						break;
				}
			})
			navDataInfo.chartData.label.push([item.month, item.year]);
			navDataInfo.chartData.data.push(netAssetValue);
			navDataInfo.detail.push(
				{
					title: item.month + " " + item.year,
					netAssetValue: netAssetValue,
					cashAndDeposit: cashAndDeposit,
					investment: investment,
					loan: loan
				}
			);
		});
		return navDataInfo;
	}

	/******************** setPerformanceData ********************/
	static setPerformanceData(data: IPortfolioInterface.Performance.ResponseData) {
		console.log("setPerformanceData >> ");

		let yearBeginDate = new Date(data.yearBeginDate);
		let lastSixMonthBeginDate = new Date(data.lastSixMonthBeginDate);

		let detailList = data.detailList;

		let yearData = {
			label: [],
			monthlyReturnPercent: [],
			returnPercent: [],
			benchmarkList: new Map(),
			netCapitalValue: data.netCapitalInOutValueFromYrBegin,
			startDate: yearBeginDate,
			endDate: null,
			header: ""
		};

		let lastSixMonthData = {
			label: [],
			monthlyReturnPercent: [],
			returnPercent: [],
			benchmarkList: new Map(),
			netCapitalValue: data.netCapitalInOutValueFromLastSixMonth,
			startDate: lastSixMonthBeginDate,
			endDate: null,
			header: ""
		}

		this.sortList(detailList).forEach((item) => {
			let year = item.year;
			let month = item.month;

			let fromDate = new Date(item.fromDate);

			if (lastSixMonthBeginDate <= fromDate && lastSixMonthData.label.length < 6) {
				lastSixMonthData.label.push([month, year]);
				lastSixMonthData.monthlyReturnPercent.push(item.monthlyReturnPercent);
				lastSixMonthData.returnPercent.push(item.yearToLastSixMonthReturnPercent);
				this.getBenchmarkData(item.benchmarkList, lastSixMonthData.benchmarkList);

				lastSixMonthData.endDate = item.toDate;
			}

			if (yearBeginDate.getFullYear() == item.year) {
				yearData.label.push([month, year]);
				yearData.monthlyReturnPercent.push(item.monthlyReturnPercent);
				yearData.returnPercent.push(item.yearReturnPercent);
				this.getBenchmarkData(item.benchmarkList, yearData.benchmarkList);

				yearData.endDate = item.toDate;
			}
		});

		lastSixMonthData.header = data.lastSixMonthBeginDate + " - " + lastSixMonthData.endDate;
		yearData.header = data.yearBeginDate + " - " + yearData.endDate;

		return { yearData: yearData, lastSixMonthData: lastSixMonthData };
	}

	/******************** getBenchmarkData from PerformanceData ********************/
	private static getBenchmarkData(benchmarkDetailList, resultListByType) {
		benchmarkDetailList.forEach((benchmark) => {
			if (resultListByType.get(benchmark.id) == null) {
				resultListByType.set(benchmark.id, {
					value: [benchmark.value],
					percentage: [benchmark.percentage]
				});
			} else {
				let ele = resultListByType.get(benchmark.id);
				ele.value.push(benchmark.value);
				ele.percentage.push(benchmark.percentage);
			}
		})
	}

	/******************** sort list by month and year ********************/
	static sortList(dataList) {
		return dataList.sort((a, b) => {
			if (a.year == b.year) {
				return a.month - b.month;
			} else {
				return a.year - b.year;
			}
		});
	}
}