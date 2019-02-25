import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/testing-page/home/home';
import { ListPage } from '../pages/testing-page/list/list';
import { ChartPage } from '../pages/testing-page/chart/chart';
import { ChartTestPage } from '../pages/testing-page/chart-test/chart-test';
import { PortfolioOverviewPage } from '../pages/private-banking/portfolio-overview/portfolio-overview';
import { AreaChartPage } from '../pages/area-chart/area-chart';
import { BarChartPage } from '../pages/testing-page/bar-chart/bar-chart';
import { BarChart2Page } from '../pages/bar-chart-2/bar-chart-2';
import { PerformancePage } from '../pages/private-banking/my-portfolio/performance/performance';
import { HighchartsPage } from '../pages/testing-page/highcharts/highcharts';
import { C3ChartPage } from '../pages/testing-page/c3-chart/c3-chart';

import { CcyDistributionPage } from '../pages/private-banking/my-portfolio/ccy-distribution/ccy-distribution';
import { AssetAllocationDetailPage } from '../pages/private-banking/asset-allocation-detail/asset-allocation-detail';
import { NavDetailPage } from '../pages/private-banking/nav-detail/nav-detail';
import { PortfolioHistoryPage } from '../pages/private-banking/my-portfolio/portfolio-history/portfolio-history';
import { MyPortfolioPage } from '../pages/private-banking/my-portfolio/my-portfolio';
import { HoldingListPage } from '../pages/private-banking/portfolio-holding/holding-list/holding-list';
import { PortfolioHoldingPage } from '../pages/private-banking/portfolio-holding/portfolio-holding';
import { AssetHistoryPage } from '../pages/private-banking/portfolio-holding/asset-history/asset-history';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DirectivesModule } from '../directives/directives.module';
import { PopupContentService, PopupContent } from '../providers-v2/popup-content/popup-content';
import { ClickPopupComponent } from '../components-v2/click-popup/click-popup';

import { ComponentsModule } from '../components-v2/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { ColorSettingPage } from '../pages/color-setting/color-setting';

import { SettingsService } from '../providers-v2/settings.service';

import { PortfolioOverviewPureColorPage } from '../pages/private-banking/portfolio-overview-pure-color/portfolio-overview-pure-color';

import { PortfolioOverviewNoAnimationPage } from '../pages/private-banking/portfolio-overview-no-animation/portfolio-overview-no-animation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChartPage,
    ChartTestPage,
    PortfolioOverviewPage,
    AreaChartPage,
    BarChartPage,
    BarChart2Page,
    PerformancePage,
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
    AssetHistoryPage,

    ColorSettingPage,
    PortfolioOverviewPureColorPage,
    PortfolioOverviewNoAnimationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    DirectivesModule,
    ComponentsModule,
    BrowserAnimationsModule,
    PipesModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChartPage,
    ChartTestPage,
    PortfolioOverviewPage,
    AreaChartPage,
    BarChartPage,
    BarChart2Page,
    PerformancePage,
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
    AssetHistoryPage,
    
    ColorSettingPage,
    PortfolioOverviewPureColorPage,
    PortfolioOverviewNoAnimationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PopupContentService,
    SettingsService
  ]
})
export class AppModule {}
