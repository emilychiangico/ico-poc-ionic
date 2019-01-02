import { Injectable, Component } from '@angular/core'
import { Renderer } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';


@Injectable()
export class PopupContentService {

    constructor(private ctrl: ModalController) {

    }

    present(inputs, titlestr, callback, dataListDisplayAttr, dataListOptDisplayAttr, dataListDisableAttr, closeCallback?)  {
        console.log(inputs);
        console.log("title:" + titlestr);
        console.log("attr display:" + dataListDisplayAttr);
        console.log("attr option display:" + dataListOptDisplayAttr);
        console.log("attr disable:" + dataListDisableAttr);
        let displayAttr = dataListOptDisplayAttr;
        if (!displayAttr) {
            displayAttr = dataListDisplayAttr;
        }
        let pop = this.ctrl.create(
            PopupContent,
            {
                titlestr: titlestr,
                inputs: inputs,
                dataListDisplayAttr: displayAttr,
                dataListDisableAttr: dataListDisableAttr
            },
            {
                showBackdrop: true,
                enableBackdropDismiss: true
            }
        );

        let selectedItem;
        //console.log(inputs)
        pop.onDidDismiss(data => {
            selectedItem = data;
            //console.log("return: " + data);
            //console.log("inside: " + component);
            if(data == "close") {
                if(closeCallback) {
                    closeCallback();
                }
            } else {
                callback(selectedItem);
            }
        });
        pop.present();
    }

}

@Component({
    selector: 'popup',
    templateUrl: 'popup-content.html'
})
export class PopupContent {

    public titlestr;
    public inputs;
    public dataListDisplayAttr;
    public dataListDisableAttr;
    constructor(
        params: NavParams,
        public renderer: Renderer,
        public viewCtrl: ViewController
    ) {
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-content-v2', true);
        this.titlestr = params.get('titlestr');
        this.inputs = params.get('inputs');
        this.dataListDisplayAttr = params.get('dataListDisplayAttr');
        this.dataListDisableAttr = params.get('dataListDisableAttr');
        //console.log('UserId', params.get('inputs'));
    }

    dismiss(selectedItem) {
        console.log(selectedItem);
        this.viewCtrl.dismiss(selectedItem);
        //console.log(data);
    }
}