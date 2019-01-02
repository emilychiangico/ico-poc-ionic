import { Injector, Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core'
import { Renderer } from '@angular/core'
// import { TranslateService } from '@ngx-translate/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular'
import { PopupContentService } from '../../providers-v2/popup-content/popup-content'
// import { PopupService } from '../../providers/popup/popup';
import { NgForm, NgModel } from '@angular/forms'
// import { Dict } from '../../providers/models/common';


@Component({
    selector:"click-popup",
    templateUrl: "click-popup.html"
})
export class ClickPopupComponent implements OnInit, OnChanges {

    @Input() type: string; // default/(empty), tranTemplate, tranCcy
    
    @Input() buttonText: any;
    @Input() buttonLabel: any;
    
    @Input() popupTitleText:any;
    @Input() dataListDisplayAttr:string;
    @Input() dataListOptDisplayAttr:string;
    @Input() dataListValueAttr:string;
    @Input() dataListDisableAttr:string;
    @Input() dataList: any =[];
    @Input() enableGenericVoiceOver:boolean = true; // if enabled and voiceOver string empty, voiceOver text will be "Button Select {{ buttonLabel }}"
    @Input() voiceOver:string; // custom voiceOver text
    @Input("ngModelBinding") ngModelBinding: NgModel;
    @Input("ngModel") ngModel: any;

    displayText: string;
    voiceOverText: string; // Voice over text to be displayed in view
    //@Input() defaultValue:any;
    //@Input() callback: Function;
    //@Input("pageComponent") pageComponent: Component;

    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    private popupContentService: PopupContentService;
    // private popupSvc: PopupService;
    // private translate: TranslateService;

    constructor(injector: Injector, private modalCtrl: ModalController) {
        console.log("constructor data list:" + this.dataList);
        this.popupContentService = injector.get(PopupContentService);
        // this.popupSvc = injector.get(PopupService);
        // this.translate = injector.get(TranslateService);
    }

    ngOnInit(){
        //console.log("On Init data list:" + this.dataList +"|");
        this.popupCallback = this.popupCallback.bind(this);
        this.closeCallback  = this.closeCallback.bind(this);
        console.log("type = " + this.type);
        console.log("On Init ngModel:" + this.ngModel);
        this.valueChange();

        // Voice over
        // this.voiceOverText = !!this.voiceOver ? this.voiceOver
        // : !!this.enableGenericVoiceOver ? 
        //   !!this.buttonLabel ? this.translate.instant('global.accessibility.selectBox') + this.buttonLabel
        //   : ""
        // : "";
        console.log("click-popup voiceOverText: " + this.voiceOverText);
    }

    ngOnChanges(){
        //console.log("On Change data list:" + this.dataList);
        console.log("On Change ngModel:" + this.ngModel);
        console.log(this.dataList);
        this.valueChange();
    }

    valueChange() {
        if (this.dataList){
            let hasItem = false;
            this.dataList.forEach(element => {
                //console.log("compare " + element[this.dataListValueAttr] + " vs " + this.ngModel);
                if (element[this.dataListValueAttr] == this.ngModel) {
                    hasItem = true;
                    this.displayText = element[this.dataListDisplayAttr];
                    if (this.ngModelBinding) {
                        //console.log("set value = " + this.ngModel);
                        this.ngModelBinding.control.setValue(this.ngModel);
                    }
                }
            });
            if (!hasItem) {
                this.displayText = this.buttonText;
            }
        } else {
            this.displayText = this.buttonText;
        }   
    }

    /**
     * Manually trigger click popup show
     * **Call ChangeDetectorRef.detectChanges() before click() in parent component to prevent datalist not updated timely
     */
    public click() {
        console.log("manually trigger click popup");

        if (!this.type || this.type == 'default') {
            this.defaultPopup();
        }
        if (this.type && this.type == 'ccy') {
            this.ccyPopup();
        }
        if (this.type && this.type == 'tranTemplate') {
            this.tranTemplatePopup();
        }
        if (this.type && this.type == 'tranCcy') {
            this.defaultPopup();
        }
        if (this.type && this.type == 'roundButton') {
            this.defaultPopup();
        }
        if (this.type && this.type == 'arrowButton') {
            this.defaultPopup();
        }
    }

    tranTemplatePopup() {
        console.log("tranTemplatePopup Popup data list:" + JSON.stringify(this.dataList));
        this.defaultPopup();
    }

    defaultPopup() {
        console.log("defaultPopup Popup data list:" + JSON.stringify(this.dataList));
        this.popupContentService.present(this.dataList, this.popupTitleText, this.popupCallback, 
            this.dataListDisplayAttr, this.dataListOptDisplayAttr, this.dataListDisableAttr, this.closeCallback);
    }  

    ccyPopup() {
        console.log("ccyPopup Popup data list:" + JSON.stringify(this.dataList));
        if(this.dataList && this.dataList.length > 1) {
            this.defaultPopup();
        }
    }  

    popupCallback(data) {
        if (data) {
            if (this.ngModelBinding) {
                this.ngModelBinding.control.setValue(data[this.dataListValueAttr]);
            }
            this.displayText = data[this.dataListDisplayAttr];
        }
        if (this.onSelect) {
            this.onSelect.emit([data]);
        }
    }

    closeCallback() {
        if (this.onClose) {
            this.onClose.emit();
        }
    }

}