import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ReplaySubject } from 'rxjs/Rx';

const STORAGE_SETTINGS_KEY = 'beaSettings';

export class Settings {
    themeId: number = 1;
}

@Injectable()
export class SettingsService {

    settings: Settings = new Settings();

    onChange = new ReplaySubject<Settings>(1);

    constructor(private platform: Platform,
        private storage: Storage
    ) {

        this.__getSettings().then(() => {
            this.onChange.next(this.settings);
        });
    }

    getSettings() {
        return this.__getSettings().then(() => {
            return this.settings;
        });
    }

    updateSettings(settings: Settings) {
        console.log("updateSettings >> " + JSON.stringify(settings));
        return this.__saveSettings(settings).then(() => {
            this.onChange.next(this.settings);
        });
    }

    private __getSettings(): Promise<void> {
        return this.storage.get(STORAGE_SETTINGS_KEY).then(settingsObj => {
            let defaultSettings = new Settings(),
                settings = JSON.parse(settingsObj);
            this.settings = Object.assign(defaultSettings, settings);
        });
    }

    private __saveSettings(settings: Settings): Promise<any> {
        this.settings = settings;
        return this.storage.set(STORAGE_SETTINGS_KEY, JSON.stringify(this.settings));
    }


}