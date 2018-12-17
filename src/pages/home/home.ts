import { Component, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DirectivesModule } from '../../directives/directives.module'
import { PopupContentService } from '../../providers-v2/popup-content/popup-content'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private popupSvc: PopupContentService;
  public abc : String = "Please select";

  accList = [
    { id:1, value:'123123123', text:'123-123-123'},
    { id:7, value:'777777777', text:'777-777-777'}
  ];

  todo = {
    title: '',
    description: '',
    testdropdown: 'AAAA'
  };

  constructor(injector: Injector, 
            public navCtrl: NavController) {
    
    this.popupSvc = injector.get(PopupContentService);
  }

  popup() {
    //let component = this;
    //let ret = this.popupSvc.present(this.accList, this.popupCallback, component);

  }  

  popupCallback(data, component) {
    // console.log("return: " + data);
    // console.log("abc: " + component);
    
    // component.abc = data;
    // component.todo.testdropdown = data;
    // console.log(component);
    // //component.todo.testdropdown = data;
  }

  testCallBack() {}

  logForm(form) {
    console.log(form);
    console.log(form.valid);
    console.log(form.invalid);
    console.log(form.value);
    console.log(form.submitted);
    console.log("### title errors");
    console.log(form.controls.title.errors);
    console.log(form.controls.title.invalid);
    console.log(form.controls.title.valid);
    
  }

}
