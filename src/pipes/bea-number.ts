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

function getCreditDebitSymbol(value: number): string {
    if(value > 0) return '(DR)';
    if(value < 0) return '(CR)';
    return '';
}

function isNullOrUndefined(variable: any): boolean {
    return typeof variable === 'undefined' || variable === null;
}