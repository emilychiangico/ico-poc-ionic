import { BaseResponseResult } from '../common-interface';

export namespace IPortfolioInterface {

    export interface AssetAllocationInfo {
        month: number,
        year: number,
        detailList: AssetAllocationDetail[]
    }

    export interface AssetAllocationDetail {
        accountType: string,
        amount: number,
        percentage: number
    }

    export interface NetAssetValueInfo {
        month: number,
        year: number,
        detailList: NetAssetValueDetail[]
    }

    export interface NetAssetValueDetail {
        category: string,
        amount: number
    }

    /******************** MyPortfolio Start ********************/
    export namespace MyPortfolio {

        export interface ResponseData {
            portfolioCurrency: string,
            totalAUM: number,
            lastUpdateDate: string,
            monthlyPercentage: number,
            sixMonthsPercentage: number,
            detailList: AssetAllocationDetail[]
        }

        export interface Response {
            data: ResponseData,
            result: BaseResponseResult
        }
    }
    /******************** MyPortfolio End ********************/

    /******************** PortfolioHistory Start ********************/
    export namespace PortfolioHistory {

        export interface ResponseData {
            portfolioCurrency: string,
            totalAUM: number,
            lastUpdateDate: string,
            assetAllocationHistoryList: AssetAllocationDetail[],
            netAssetValueHistoryList: NetAssetValueInfo[]
        }

        export interface Response {
            data: ResponseData,
            result: BaseResponseResult
        }
    }
    /******************** PortfolioHistory End ********************/

    /******************** CurrencyDistribution Start ********************/
    export namespace CurrencyDistribution {

        export interface CurrencyDistributionInfo {
            currency: string,
            amount: number
        }

        export interface ResponseData {
            portfolioCurrency: string,
            totalAUM: number,
            lastUpdateDate: string,
            currencyDistributionList: CurrencyDistributionInfo[]
        }

        export interface Response {
            data: ResponseData,
            result: BaseResponseResult
        }
    }
    /******************** CurrencyDistribution End ********************/

    /******************** Performance Start ********************/
    export namespace Performance {
        export interface DetailInfo {
            year: number,
            month: number,
            fromDate: string,
            toDate: string,
            monthlyReturnPercent: number,
            yearReturnPercent: number,
            yearToLastSixMonthReturnPercent: number,
            benchmarkList: benchmarkInfo[]
        }

        export interface benchmarkInfo {
            id: string,
            value: number,
            percentage: number
        }

        export interface ResponseData {
            portfolioCurrency: string,
            totalAUM: number,
            lastUpdateDate: string,
            lastSixMonthBeginDate: string,
            netCapitalInOutValueFromLastSixMonth: number,
            yearBeginDate: string,
            netCapitalInOutValueFromYrBegin: number,
            detailList: DetailInfo[]
        }

        export interface Response {
            data: ResponseData,
            result: BaseResponseResult
        }
    }
    /******************** Performance End ********************/

    /******************** PortfolioHolding Start ********************/
    export namespace PortfolioHolding {

        export interface PortfolioHoldingInfo {
            accountType: string,
            totalAmount: number,
            aumProportion: number,
            holding: number,
            contentList: ContentDetailInfo[][],
            historyList: HistoryList[]
        }

        export interface ContentDetailInfo {
            key: string,
            value: any
        }

        export interface HistoryList {
            month: number,
            year: number,
            amount: number
        }

        export interface ResponseData {
            accountTypeList: string[],
            detail: PortfolioHoldingInfo
        }

        export interface Response {
            data: ResponseData,
            result: BaseResponseResult
        }
    }
    /******************** PortfolioHolding End ********************/

}