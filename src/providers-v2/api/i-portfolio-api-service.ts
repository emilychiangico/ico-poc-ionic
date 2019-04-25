import { Injectable, Testability } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Headers, Http as AngularHttp, Response as AngularHttpResponse, ResponseContentType } from '@angular/http';
import { IPortfolioInterface } from '../models/private-banking/i-portfolio-interface';

//const endpoint = "https://localhost:7777/mobileBankingSecured/v1";
const endpoint = "http://localhost:3002";

const url = {
    myPortfolio: '/iPortfolio/myPortfolio',
    portfolioHistory: '/iPortfolio/portfolioHistory',
    performance: '/iPortfolio/performance',
    ccyDistribution: '/iPortfolio/currencyDistribution',
    portfolioHolding: '/iPortfolio/portfolioHolding/',
};

@Injectable()
export class IPortfolioApiService {

    constructor(private http: AngularHttp) { }

    httpOptions = {
        headers: new Headers({ 'Content-Type': "application/json",
        "Access-Control-Allow-Origin": "*" }),
        responseType: ResponseContentType.Json
    };

    getMyPortfolio(): Observable<IPortfolioInterface.MyPortfolio.Response>  {
        console.log("Calling IPortfolioApiService getMyPortfolio");

        let result = <Observable<any>>this.http.get(
            endpoint + url.myPortfolio, this.httpOptions
        ).map(res => res.json());

        return result;
    }

    getAssetAllocationHistory(): Observable<IPortfolioInterface.PortfolioHistory.Response> {
        console.log("Calling IPortfolioApiService getAssetAllocationHistory");

        let result = <Observable<any>>this.http.get(
            endpoint + url.portfolioHistory, this.httpOptions
        ).map(res => res.json());

        return result;
    }

    getCcyDistribution(): Observable<IPortfolioInterface.CurrencyDistribution.Response> {
        console.log("Calling IPortfolioApiService getCcyDistribution");

        let result = <Observable<any>>this.http.get(
            endpoint + url.ccyDistribution, this.httpOptions
        ).map(res => res.json());

        return result;
    }

    getPerformanceAnalysis(): Observable<IPortfolioInterface.Performance.Response> {
        console.log("Calling IPortfolioApiService getPerformanceAnalysis");

        let result = <Observable<any>>this.http.get(
            endpoint + url.performance, this.httpOptions
        ).map(res => res.json());

        return result;
    }

    getPortfolioHolding(type: string): Observable<IPortfolioInterface.PortfolioHolding.Response> {
        console.log("Calling IPortfolioApiService getPortfolioHolding");

        let result = <Observable<any>>this.http.get(
            endpoint + url.portfolioHolding + type, this.httpOptions
        ).map(res => res.json());

        return result;
    }

}