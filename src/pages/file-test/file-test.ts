import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SettingsService, Settings } from '../../providers-v2/settings.service';
import { Chooser } from '@ionic-native/chooser';

@IonicPage()
@Component({
	selector: 'page-file-test',
	templateUrl: 'file-test.html',
})
export class FileTestPage {

	uploadDocFile = null;

	constructor(private chooser: Chooser) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FileTestPage');
	}

	test() {
		console.log("uploadDocFile >> " + this.uploadDocFile);
	}

	getFile() {
		this.chooser.getFile("image/*")
			.then(file => {
				console.log(file ? file : 'canceled')
				this.uploadDocFile = file.dataURI;
			})
			.catch((error: any) => console.error(error));
	}



}