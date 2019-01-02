import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/testing-page/home/home';
import { ListPage } from '../pages/testing-page/list/list';
import { ChartPage } from '../pages/testing-page/chart/chart';
import { ChartTestPage } from '../pages/testing-page/chart-test/chart-test';
import { ChartTest2Page } from '../pages/chart-test-2/chart-test-2';
import { AreaChartPage } from '../pages/area-chart/area-chart';
import { BarChartPage } from '../pages/testing-page/bar-chart/bar-chart';
import { BarChart2Page } from '../pages/bar-chart-2/bar-chart-2';
import { MixedChartPage } from '../pages/my-portfolio/mixed-chart/mixed-chart';
import { HighchartsPage } from '../pages/testing-page/highcharts/highcharts';
import { C3ChartPage } from '../pages/testing-page/c3-chart/c3-chart';

import { CcyDistributionPage } from '../pages/my-portfolio/ccy-distribution/ccy-distribution';
import { AssetAllocationDetailPage } from '../pages/asset-allocation-detail/asset-allocation-detail';
import { NavDetailPage } from '../pages/nav-detail/nav-detail';
import { PortfolioHistoryPage } from '../pages/my-portfolio/portfolio-history/portfolio-history';
import { MyPortfolioPage } from '../pages/my-portfolio/my-portfolio';
import { HoldingListPage } from '../pages/portfolio-holding/holding-list/holding-list';
import { PortfolioHoldingPage } from '../pages/portfolio-holding/portfolio-holding';
import { AssetHistoryPage } from '../pages/portfolio-holding/asset-history/asset-history';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DirectivesModule } from '../directives/directives.module';
import { PopupContentService, PopupContent } from '../providers-v2/popup-content/popup-content';
import { ClickPopupComponent } from '../components-v2/click-popup/click-popup';

import { ComponentsModule } from '../components-v2/components.module';


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
    CcyDistributionPage,
    PopupContent,
    ClickPopupComponent,
    AssetAllocationDetailPage,
    NavDetailPage,
    PortfolioHistoryPage,
    MyPortfolioPage,
    HoldingListPage,
    PortfolioHoldingPage,
    AssetHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DirectivesModule,
    ComponentsModule,
    BrowserAnimationsModule
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
    CcyDistributionPage,
    PopupContent,
    ClickPopupComponent,
    AssetAllocationDetailPage,
    NavDetailPage,
    PortfolioHistoryPage,
    MyPortfolioPage,
    HoldingListPage,
    PortfolioHoldingPage,
    AssetHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PopupContentService
  ]
})
export class AppModule {}
