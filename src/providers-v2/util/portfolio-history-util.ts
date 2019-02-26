import { PortfolioHoldingType } from "./portfolio-holding-util";

export const ApiHoldingType = {
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

export const ApiNavType = {
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

export class PortfolioHistoryUtil {

	static setAssetAllocationData(dataList) {
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
			item.detailsList.forEach((detail) => {
				switch (detail.assetClassID) {
					case ApiHoldingType.savingAndCurrent:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.SavingAndCurrent, index, dataListLen);
						break;
					case ApiHoldingType.timeDeposit:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.TimeDeposit, index, dataListLen);
						break;
					case ApiHoldingType.structuredProduct:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.StructuredProduct, index, dataListLen);
						break;
					case ApiHoldingType.stock:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.Stock, index, dataListLen);
						break;
					case ApiHoldingType.bondNoteCertDeposit:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.BondNoteCertDeposit, index, dataListLen);
						break;
					case ApiHoldingType.unitTrust:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.UnitTrust, index, dataListLen);
						break;
					case ApiHoldingType.linkedDeposit:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.LinkedDeposit, index, dataListLen);
						break;
					case ApiHoldingType.optionAndDerivativesContract:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.OptionAndDerivativesContract, index, dataListLen);
						break;
					case ApiHoldingType.loan:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.Loan, index, dataListLen);
						break;
					case ApiHoldingType.forwardForeignExchange:
						this.setDataByType(detail, resultListByType, assetAllocationDataInfo.holdingTypeList, PortfolioHoldingType.ForwardForeignExchange, index, dataListLen);
						break;
				}
			});
		});
		console.log(resultListByType);

		assetAllocationDataInfo.holdingTypeList = assetAllocationDataInfo.holdingTypeList;
		resultListByType.forEach((item) => {
			assetAllocationDataInfo.chartData.amount.push(item.amount);
			assetAllocationDataInfo.percentage.push(item.percentage);
		});
		let labelList = assetAllocationDataInfo.chartData.label;
		assetAllocationDataInfo.chartData.label.push(labelList[labelList.length - 1]);

		return assetAllocationDataInfo;
	}

	private static setDataByType(detail, resultListByType, holdingTypeList, typeId, index, dataListLen) {
		if (resultListByType.get(typeId) == null) {
			resultListByType.set(typeId, {
				amount: [detail.amount],
				percentage: [detail.percentage]
			});
			holdingTypeList.push(typeId);
		} else {
			let ele = resultListByType.get(typeId);
			ele.amount.push(detail.amount);
			ele.percentage.push(detail.percentage);

			// push value again if the last value
			if (index == dataListLen - 1) {
				ele.amount.push(detail.amount);
			}
		}
	}

	static setNavData(dataList) {
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
			item.detailsList.forEach((detail) => {
				switch (detail.category) {
					case ApiNavType.netAssetValues:
						netAssetValue = detail.amount;
						break;
					case ApiNavType.cashAndDeposit:
						cashAndDeposit = detail.amount;
						break;
					case ApiNavType.investment:
						investment = detail.amount;
						break;
					case ApiNavType.loans:
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

	static setPerformanceData(data) {
		console.log("setPerformanceData >> ");

		let yearBeginDate = new Date(data.yearBeginDate);
		let lastSixMonthBeginDate = new Date(data.lastSixMonthBeginDate);

		let detailsList = data.detailsList;

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

		this.sortList(detailsList).forEach((item) => {
			let year = item.year;
			let month = item.month;

			if (lastSixMonthData.label.length < 6) {
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