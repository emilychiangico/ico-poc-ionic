import { Directive, ElementRef, Injector, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { SettingsService } from '../../providers-v2/settings.service';

export const themeCount = 3;

// export class ThemeOptions {
//     themeId?: number = 1;
// }

const DEFAULT_THEME = 'bea-pb-theme-';

@Directive({
    selector: '[bea-pb-theme]'
})
export class BeaPbThemeDirective implements OnChanges, OnInit {

    private elmRef: ElementRef;
    private renderer: Renderer2;
    private settingsSvc: SettingsService;

    //@Input('bea-pb-theme') themeOpt: ThemeOptions = new ThemeOptions();

    themeId: number;

    constructor(injector: Injector) {
        this.elmRef = injector.get(ElementRef);
        this.renderer = injector.get(Renderer2);
        this.settingsSvc = injector.get(SettingsService);

        // If setting changes update theme
        this.settingsSvc.onChange.subscribe(settings => {
            console.log("bea-pb-theme update");
            this.themeId = settings.themeId;
            this.update();
        });
    }

    ngOnInit() {
        // Get theme from setting
        this.settingsSvc.getSettings().then(settings => {
            this.themeId = settings.themeId;
            this.update();
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.update();
    }

    update() {
        const elm = this.elmRef.nativeElement;

        for (let themeId = 1; themeId <= themeCount; themeId++) {
            this.renderer.removeClass(elm, DEFAULT_THEME + themeId);
        }

        if (this.themeId) {
            if (this.themeId > themeCount) {
                this.themeId = 1;
            }

            var themeId = this.themeId;

            this.renderer.addClass(elm, DEFAULT_THEME + themeId);
        }
    }
}