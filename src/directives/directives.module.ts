import { NgModule } from '@angular/core';
import { TestContentDirective } from './test-content/test-content';
import { Directives2Module } from './directives.module-v2';
import { BeaThemeDirective } from './bea-theme/bea-theme';

@NgModule({
	declarations: [TestContentDirective,BeaThemeDirective],
	imports: [Directives2Module],
	exports: [TestContentDirective, Directives2Module,BeaThemeDirective]
})
export class DirectivesModule {}
