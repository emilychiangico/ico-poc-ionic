import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    ComponentFactoryResolver,
    Injector,
    NgZone,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

export class BasePage {

    _rootNav;

    private _appCtrl: App
    
	constructor(injector: Injector) {
        this._appCtrl = injector.get(App);
		this._rootNav = this._appCtrl.getRootNav();
	}

    push(page: any, params?: any): Promise<any> {
        return this._rootNav.push(page, params);
    }
}