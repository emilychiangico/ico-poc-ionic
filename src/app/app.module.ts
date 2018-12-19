import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChartPage } from '../pages/chart/chart';
import { ChartTestPage } from '../pages/chart-test/chart-test';
import { ChartTest2Page } from '../pages/chart-test-2/chart-test-2';
import { AreaChartPage } from '../pages/area-chart/area-chart';
import { BarChartPage } from '../pages/bar-chart/bar-chart';
import { BarChart2Page } from '../pages/bar-chart-2/bar-chart-2';
import { MixedChartPage } from '../pages/mixed-chart/mixed-chart';
import { HighchartsPage } from '../pages/highcharts/highcharts';
import { C3ChartPage } from '../pages/c3-chart/c3-chart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DirectivesModule } from '../directives/directives.module'
import { PopupContentService, PopupContent } from '../providers-v2/popup-content/popup-content'
import { ClickPopupComponent } from '../components-v2/click-popup/click-popup'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChartPage,
    ChartTestPage,
    ChartTest2Page,
    AreaChartPage,
    BarChartPage,
    BarChart2Page,
    MixedChartPage,
    HighchartsPage,
    C3ChartPage,
    PopupContent,
    ClickPopupComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChartPage,
    ChartTestPage,
    ChartTest2Page,
    AreaChartPage,
    BarChartPage,
    BarChart2Page,
    MixedChartPage,
    HighchartsPage,
    C3ChartPage,
    PopupContent,
    ClickPopupComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PopupContentService
  ]
})
export class AppModule {}
