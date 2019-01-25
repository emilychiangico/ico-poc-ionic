import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { sprintf } from 'sprintf-js';

@Pipe({ name: 'beaNumber' })
export class BeaNumberPipe implements PipeTransform {

    constructor(private decimalPipe: DecimalPipe) {
    }

    transform(number: string | number, decimalDigits: number = 2, isCreditCard: boolean = false): string | null {
        if(isNullOrUndefined(number)) return null;

        let _number = Number(number);
        if(isCreditCard) {
            return this.decimalPipe.transform(Math.abs(_number), sprintf('1.%1$d-%1$d', decimalDigits)) + getCreditDebitSymbol(_number);
        } else {
            return this.decimalPipe.transform(_number, sprintf('1.%1$d-%1$d', decimalDigits));
        }
    }
}

@Pipe({ name: 'pbBeaCurrency' })
export class PbBeaCurrencyPipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) {
    }

    transform(price: {currency: string, value: number}, decimalDigits: number = 2, includeCurrency: boolean = true, isCreditCard: boolean = false): string | null {
        if (isNullOrUndefined(price) || isNullOrUndefined(price.currency) || isNullOrUndefined(price.value)) {
            return null;
        }

        if(isCreditCard) {
            let result = this.currencyPipe.transform(Math.abs(price.value), price.currency, false, sprintf('1.%1$d-%1$d', decimalDigits));
            if (result !== null) {
                let currencyFormat = includeCurrency ? '$1 ' : '';
                return result.replace(/^([A-Z]{3})/, currencyFormat) + getCreditDebitSymbol(price.value);
            }
        } else {
            let result = this.currencyPipe.transform(price.value, price.currency, false, sprintf('1.%1$d-%1$d', decimalDigits));
            if (result !== null) {
                let currencyFormat = includeCurrency ? '$1 ' : '';
                if(price.value >= 0) {
                    return result.replace(/^([A-Z]{3})/, currencyFormat);
                }else {
                    return "(" + result.replace(/^([A-Z]{3})/, currencyFormat) + ")";
                }
            }
        }
        
        return null;
    }
}

function getCreditDebitSymbol(value: number): string {
    if(value > 0) return '(DR)';
    if(value < 0) return '(CR)';
    return '';
}

function isNullOrUndefined(variable: any): boolean {
    return typeof variable === 'undefined' || variable === null;
}