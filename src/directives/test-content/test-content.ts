import { Directive, ElementRef, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Label } from 'ionic-angular';

/**
 * Generated class for the TestContentDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[test-content]' // Attribute selector
})
export class TestContentDirective implements OnChanges, OnInit {

  constructor(private elmRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    let ele: HTMLElement = this.elmRef.nativeElement;
    ele.setAttribute("placeholder", "Test String");
    console.log(ele);
    console.log(ele.getAttribute("test-content"));
  }

  ngOnInit() {
    let ele: HTMLElement = this.elmRef.nativeElement;
    //ele.innerHTML
  //  var array = Array.prototype.slice.call(ele.childNodes);
  //  array.forEach(element => {
  //    console.log(element);
  //  });
    //let test: Element = ele.getElementsByClassName("text-input text-input-md");
    //let list = ele.getElementsByTagName("input");
    //let arry = Array.from(list);
    console.log("Log from directives");

    //setAttribute("placeholder", "ABCD")
    //console.log(ele.getElementsByClassName("text-input-md"));
    //console.log(ele.getAttribute("test-content"));
  } 

}
