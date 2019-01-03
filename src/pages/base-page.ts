import { App, Events } from 'ionic-angular';
import { Injector } from '@angular/core';

export class BasePage {

    _rootNav;

    private _appCtrl: App;

    _event: Events;
    
	constructor(injector: Injector) {
        this._appCtrl = injector.get(App);
        this._event = injector.get(Events);

		this._rootNav = this._appCtrl.getRootNav();
	}

    push(page: any, params?: any): Promise<any> {
        return this._rootNav.push(page, params);
    }

}