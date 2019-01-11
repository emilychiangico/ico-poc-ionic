import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SettingsService, Settings } from '../../providers-v2/settings.service';

@IonicPage()
@Component({
  selector: 'page-color-setting',
  templateUrl: 'color-setting.html',
})
export class ColorSettingPage {

	settings: Settings = new Settings();
	selectedId: number;

	constructor(public settingSvc: SettingsService) {
		this.settingSvc.getSettings().then(setting => {
			this.selectedId = setting.themeId;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ColorSettingPage');
	}

	changeTheme(selected) {
		if(this.selectedId != selected) {
			this.selectedId = selected;
			this.settings.themeId = selected;
			this.settingSvc.updateSettings(this.settings);
		}
	}
	
}