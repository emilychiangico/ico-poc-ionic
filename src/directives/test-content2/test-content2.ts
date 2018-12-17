import { Directive, ElementRef, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Label } from 'ionic-angular';

/**
 * Generated class for the TestContentDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[test-content2]' // Attribute selector
})
export class TestContent2Directive implements OnChanges, OnInit {

  constructor(private elmRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    let ele: HTMLElement = this.elmRef.nativeElement;
    ele.setAttribute("placeholder", "Test String");
    console.log(ele);
    console.log(ele.getAttribute("test-content2"));
  }

  ngOnInit() {
    let ele: HTMLElement = this.elmRef.nativeElement;
    //ele.innerHTML
  //  var array = Array.prototype.slice.call(ele.childNodes);
  //  array.forEach(element => {
  //    console.log(element);
  //  });
    //let test: Element = ele.getElementsByClassName("text-input text-input-md");
    console.log("Log from directives V2");

    //setAttribute("placeholder", "ABCD")
    //console.log(ele.getElementsByClassName("text-input-md"));
    //console.log(ele.getAttribute("test-content2"));
  } 

}
