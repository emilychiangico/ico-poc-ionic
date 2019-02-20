import { NgModule } from '@angular/core';
import { TestContentDirective } from './test-content/test-content';
import { Directives2Module } from './directives.module-v2';
import { BeaPbThemeDirective } from './bea-pb-theme/bea-pb-theme';

@NgModule({
	declarations: [TestContentDirective,BeaPbThemeDirective],
	imports: [Directives2Module],
	exports: [TestContentDirective, Directives2Module,BeaPbThemeDirective]
})
export class DirectivesModule {}
