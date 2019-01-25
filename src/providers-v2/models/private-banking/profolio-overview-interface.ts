import { BaseResponseResult } from '../common-interface';

export namespace ProfolioOverviewInterface {

    export interface ResponseData {
    }

    export interface Response {
        data?: ResponseData,
        result?: BaseResponseResult
    }
}