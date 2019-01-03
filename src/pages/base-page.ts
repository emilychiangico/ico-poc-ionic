import { App, Events, NavParams } from 'ionic-angular';
import { Injector} from '@angular/core';

export class BasePage {

    _rootNav;

    private _appCtrl: App;
    
    _event: Events;
    _navParams: NavParams;
    
	constructor(injector: Injector) {
        this._appCtrl = injector.get(App);
        this._event = injector.get(Events);
        this._navParams = injector.get(NavParams);

		this._rootNav = this._appCtrl.getRootNav();
	}

    push(page: any, params?: any): Promise<any> {
        return this._rootNav.push(page, params);
    }

    setRoot(page: any, params?: any) {
        return this._rootNav.setRoot(page, params);
    }

}