import { NgModule } from '@angular/core';
import { TestContentDirective } from './test-content/test-content';
import { Directives2Module } from './directives.module-v2';

@NgModule({
	declarations: [TestContentDirective],
	imports: [Directives2Module],
	exports: [TestContentDirective, Directives2Module]
})
export class DirectivesModule {}
