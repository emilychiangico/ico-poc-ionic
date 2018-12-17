import { Injectable, Component } from '@angular/core'
import { Renderer } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';


@Injectable()
export class PopupContentService {
    
    constructor(private ctrl: ModalController) {

    }

    present(inputs, titlestr, callback, component, popupComponent)  {
        console.log("title:" + titlestr)
        console.log("attr display:" + component.dataListDisplayAttr)
        let pop = this.ctrl.create(
            PopupContent, 
            {titlestr:titlestr, inputs:inputs, dataListDisplayAttr:component.dataListDisplayAttr}, 
            {showBackdrop:true, enableBackdropDismiss:true}
        );
        
        let selectedItem;
        //console.log(inputs)
        pop.onDidDismiss(data=>{
            selectedItem = data;
            //console.log("return: " + data);
            //console.log("inside: " + component);
            callback(selectedItem, component, popupComponent);
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
    constructor(
        params: NavParams,
        public renderer: Renderer,
        public viewCtrl: ViewController
      ) {
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-content', true);
        this.titlestr = params.get('titlestr');
        this.inputs = params.get('inputs');
        this.dataListDisplayAttr = params.get('dataListDisplayAttr');
        //console.log('UserId', params.get('inputs'));
      }

    dismiss(selectedItem) {
       console.log(selectedItem);
        this.viewCtrl.dismiss(selectedItem);
        //console.log(data);
    }
}