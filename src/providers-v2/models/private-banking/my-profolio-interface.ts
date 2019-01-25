import { BaseResponseResult } from '../common-interface';

export namespace ProfolioOverviewInterface {

    export interface baseInfo {
        amount: number,
        date: string,
    }

    export interface AssetAllcationInfo {
        type: string,
        monthList: string[],
        valueList: string[]
    }

    export interface navInfo {
        netAssetValue: number,
        cashAndDeposit: number,
        investment: number,
        loan: number
    }

    export namespace ProfoiloHistory {

        export interface ResponseData {
        }

        export interface Response {
            data?: ResponseData,
            result?: BaseResponseResult
        }
    }

    export namespace CurrencyDistribution {
        export interface ResponseData {
        }

        export interface Response {
            data?: ResponseData,
            result?: BaseResponseResult
        }
    }

    export namespace Performance {
        export interface ResponseData {
        }

        export interface Response {
            data?: ResponseData,
            result?: BaseResponseResult
        }
    }

}