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
	static setTotalAumontInfo(ccy: string, amount: number, date: string) {
		return {
			ccy: ccy,
			amount: amount,
			date: date
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

	/******************** setBenchmarkTitleList ********************/
	static setBenchmarkTitleList(titleList) {
		let resultList = [];
		let list = [];
		titleList.forEach((item) => {
			list.push(item);
			if(list.length == 2) {
				resultList.push(list);
				list = [];
			}
		});
		return resultList;
	}

	/******************** setPortfolioHoldingData ********************/
	static setPortfolioHoldingData(detail) {
		let holdingInfo = {
			selectedAccountType: null,
			header: [],
			data: []
		}

		let assetAllocationDataInfo = {
			selectedAccountType: null,
			holdingTypeList: [],
			chartData: {
				label: [],
				amount: []
			}
		};

		let selectedAccType = detail.accountType;
		assetAllocationDataInfo.selectedAccountType = selectedAccType;
		holdingInfo.selectedAccountType = selectedAccType;

		// Handling Holding Data
		let headerMap = this.setHeaderMap(detail.headerList);
		this.setHoldingData(detail.accountType, headerMap, detail.contentList, holdingInfo);

		// Handling Asset History Data
		assetAllocationDataInfo.holdingTypeList.push(selectedAccType);
		let amountList = [];
		IPortfolioUtil.sortList(detail.historyList).forEach((item, index) => {
			assetAllocationDataInfo.chartData.label.push([item.month, item.year]);
			amountList.push(item.amount);

			if (index == detail.historyList.length - 1) {
				assetAllocationDataInfo.chartData.label.push([item.month, item.year]);
				amountList.push(item.amount);
			}
		});
		assetAllocationDataInfo.chartData.amount.push(amountList);

		console.log(holdingInfo);
		console.log(assetAllocationDataInfo);
		return { holdingInfo: holdingInfo, assetAllocationDataInfo: assetAllocationDataInfo };
	}

	private static setHeaderMap(headerList) {
		let result = new Map();
		headerList.forEach((header, index) => {
			result.set(header, index);
		})

		return result;
	}

	/******************** setHoldingData ********************/
	private static setHoldingData(accountType, headerMap, dataList, holdingInfo) {
		let headerNameList = PortfolioHolding[accountType];
		console.log(headerMap);
		dataList.forEach((record) => {
			console.log(record);
			switch (accountType) {
				case AccountType.savingAndCurrent:
					holdingInfo.data.push({
						accountType: record[headerMap.get(headerNameList.account_type)],
						ccy: record[headerMap.get(headerNameList.ccy)],
						principal: record[headerMap.get(headerNameList.principal_in_market)],
						principalInHKD: record[headerMap.get(headerNameList.principal_in_base_market)]
					});
					break;
				case AccountType.timeDeposit:
					holdingInfo.data.push({
						accountType: record[headerMap.get(headerNameList.account_type)],
						referNo: record[headerMap.get(headerNameList.deposit_no)],
						ccy: record[headerMap.get(headerNameList.ccy)],
						principal: record[headerMap.get(headerNameList.principal_in_market)],
						principalInHKD: record[headerMap.get(headerNameList.principal_in_base_market)],
						effectiveDate: record[headerMap.get(headerNameList.effective_date)],
						dueDate: record[headerMap.get(headerNameList.due_date)],
						interestRate: record[headerMap.get(headerNameList.interest_rate)]
					});
					break;
				case AccountType.structuredProduct:
					//TODO
					break;
				case AccountType.stock:
					holdingInfo.data.push({
						companyCode: record[headerMap.get(headerNameList.stock_code)],
						companyName: record[headerMap.get(headerNameList.securities_name)],
						ccy: record[headerMap.get(headerNameList.ccy)],
						marketValue: record[headerMap.get(headerNameList.market_value_in_market)],
						marketValueInHKD: record[headerMap.get(headerNameList.market_value_in_base_market)],
						shares: record[headerMap.get(headerNameList.shares)],
						marketPrice: record[headerMap.get(headerNameList.market_price)],
						avgUnitCost: record[headerMap.get(headerNameList.avg_unit_cost)]
					});
					break;
				case AccountType.bondNoteCertDeposit:
					//TODO
					break;
				case AccountType.unitTrust:
					//TODO
					break;
				case AccountType.linkedDeposit:
					holdingInfo.data.push({
						accountType: record[headerMap.get(headerNameList.linked_type)],
						referNo: record[headerMap.get(headerNameList.reference_no)],
						settlementDate: record[headerMap.get(headerNameList.settlement_date)],
						maturityDate: record[headerMap.get(headerNameList.maturity_date)],
						couponRate: record[headerMap.get(headerNameList.coupon_rate)],
						referValue: record[headerMap.get(headerNameList.reference_value)],
						amount: record[headerMap.get(headerNameList.deposit_amount_in_market)],
						amountInHKD: record[headerMap.get(headerNameList.deposit_amount_in_base_market)]
					});
					break;
				case AccountType.optionAndDerivativesContract:
					//TODO
					break;
				case AccountType.loan:
					//TODO
					break;
				case AccountType.forwardForeignExchange:
					//TODO
					break;
			}
		});
	}

	/******************** sort list by month and year ********************/
	private static sortList(dataList) {
		return dataList.sort((a, b) => {
			if (a.year == b.year) {
				return a.month - b.month;
			} else {
				return a.year - b.year;
			}
		});
	}
}

export const PortfolioHolding = {
	savings_n_current: {
		account_type: "account_type",
		ccy: "ccy",
		principal_in_market: "principal_in_market",
		principal_in_base_market: "principal_in_base_market"
	},
	time_deposit: {
		account_type: "account_type",
		effective_date: "effective_date",
		due_date: "due_date",
		deposit_no: "deposit_no",
		interest_rate: "interest_rate",
		ccy: "ccy",
		principal_in_market: "principal_in_market",
		principal_in_base_market: "principal_in_base_market"
	},
	linked_deposit: {
		linked_type: "linked_type",
		reference_no: "reference_no",
		deposit_underlying_ccy: "deposit_underlying_ccy",
		settlement_date: "settlement_date",
		maturity_date: "maturity_date",
		reference_value: "reference_value",
		coupon_rate: "coupon_rate",
		deposit_amount_in_market: "deposit_amount_in_market",
		deposit_amount_in_base_market: "deposit_amount_in_base_market"
	},
	stock: {
		securities_name: "securities_name",
		stock_code: "stock_code",
		shares: "shares",
		market_price: "market_price",
		avg_unit_cost: "avg_unit_cost",
		ccy: "ccy",
		market_value_in_market: "market_value_in_market",
		market_value_in_base_market: "market_value_in_base_market"
	},
	unit_trust: {
		securities_name: "securities_name",
		unit: "unit",
		market_price: "market_price",
		avg_unit_cost: "avg_unit_cost",
		ccy: "ccy",
		market_value_in_market: "market_value_in_market",
		market_value_in_base_market: "market_value_in_base_market"
	},
	bond: {
		securities_name: "securities_name",
		nominal_value: "nominal_value",
		market_price: "market_price",
		avg_unit_cost: "avg_unit_cost",
		ccy: "ccy",
		market_value_in_market: "market_value_in_market",
		market_value_in_base_market: "market_value_in_base_market"
	},
	structured_products: {
		securities_name: "securities_name",
		nominal_value: "nominal_value",
		market_price: "market_price",
		avg_unit_cost: "avg_unit_cost",
		ccy: "ccy",
		market_value_in_market: "market_value_in_market",
		market_value_in_base_market: "market_value_in_base_market"
	},
	loans: {
		loan_type: "loan_type",
		effective_date: "effective_date",
		due_date: "due_date",
		loan_no: "loan_no",
		interest_rate: "interest_rate",
		ccy: "ccy",
		principal_in_market: "principal_in_market",
		principal_in_base_market: "principal_in_base_market"
	},
	option_derivatives_contract: {
		trade_date: "trade_date",
		reference_no: "reference_no",
		underlying: "underlying",
		option_type: "option_type",
		strike_price: "strike_price",
		knock_out_price: "knock_out_price",
		shares_notional_per_fixing: "shares_notional_per_fixing",
		remaining_notional_amount: "remaining_notional_amount"
	},
	forward_foreign_exchange: {
		trade_date: "trade_date",
		value_date: "value_date",
		reference_no: "reference_no",
		buy_ccy: "buy_ccy",
		buy_amount: "buy_amount",
		sell_ccy: "sell_ccy",
		sell_amount: "sell_amount",
		forward_rate: "forward_rate"
	},
	pending_settlement: {
		trade_date: "trade_date",
		settlement_date: "settlement_date",
		reference_no: "reference_no",
		description: "description",
		transaction_type: "transaction_type",
		ccy: "ccy",
		pending_settlement_value: "pending_settlement_value",
		pending_settlement_amount: "pending_settlement_amount"
	}
}