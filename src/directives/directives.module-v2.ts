import { NgModule } from '@angular/core';
import { TestContent2Directive } from './test-content2/test-content2';
import { ForbiddenValidatorDirective } from './test-content3/test-content3';

@NgModule({
	declarations: [TestContent2Directive ,ForbiddenValidatorDirective ],
	imports: [],
	exports: [TestContent2Directive, ForbiddenValidatorDirective]
})
export class Directives2Module {}
