import { Injector, Component, Input, Output, OnInit, OnChanges} from '@angular/core'
import { Renderer } from '@angular/core'
import { ModalController, NavParams, ViewController } from 'ionic-angular'
import { PopupContentService } from '../../providers-v2/popup-content/popup-content'
import { NgForm, NgModel , ControlValueAccessor} from '@angular/forms'


@Component({
    selector:"click-popup",
    templateUrl: "click-popup.html"
})
export class ClickPopupComponent implements OnInit, OnChanges {
    
    @Input() buttonText: any;
    @Input() buttonLabel: any;
    
    @Input() popupTitleText:any;
    @Input() dataListDisplayAttr:String;
    @Input() dataListValueAttr:String;
    @Input() dataList: any =[];
    @Input() callback: Function;

    @Input("ngModelBinding") ngModelBinding: NgModel;


    private popupSvc: PopupContentService;


    constructor(injector: Injector) {
        console.log("constructor data list:" + this.dataList);
        this.popupSvc = injector.get(PopupContentService);
    }

    ngOnInit(){
        console.log("On Init data list:" + this.dataList +"|");
        console.log(this.ngModelBinding);
        
        
    }

    ngOnChanges(){
        console.log("On Change data list:" + this.dataList + "|" + this.callback);
    }

    popup() {
        let component = this;
        console.log("Popup data list:" + this.dataList);
        let ret = this.popupSvc.present(this.dataList, this.popupTitleText, this.popupCallback, component, this);
        
    }  

    popupCallback(data, component, popupComponent) {
        if (data) {
            popupComponent.ngModelBinding.control.setValue(data[component.dataListValueAttr]);
            component.buttonText = data[component.dataListDisplayAttr];
            component.buttonValue = data[component.dataListValueAttr];
        }
        
        if (component.callback) {
            component.callback(data);
        }
    }



}