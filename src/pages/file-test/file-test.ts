import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SettingsService, Settings } from '../../providers-v2/settings.service';
import { Chooser } from '@ionic-native/chooser';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
	selector: 'page-file-test',
	templateUrl: 'file-test.html',
})
export class FileTestPage {

	uploadDocFile = null;

	constructor(private chooser: Chooser,
		private camera: Camera,
		private imagePicker: ImagePicker) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FileTestPage');
	}

	test() {
		console.log("uploadDocFile >> " + this.uploadDocFile);
	}

	getFile() {
		// cannot select in IOS
		this.chooser.getFile("image/*")
			.then(file => {
				console.log(file ? file : 'canceled')
				this.uploadDocFile = file.dataURI;
			})
			.catch((error: any) => console.error(error));
	}

	getFile2() {
		// Open Camera to take photo then return file url
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			console.log(imageData);
			this.uploadDocFile = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
			// Handle error
		});
	}

	getFile3() {
		// Image picker
		let options = {
			maximumImagesCount: 1,
			width: 500,
			height: 500,
			quality: 75
		}

		this.imagePicker.getPictures(options).then(
			file_uris => {
				console.log(file_uris)
				this.uploadDocFile = file_uris[0]
			},
			err => console.log('uh oh')
		);
	}



}