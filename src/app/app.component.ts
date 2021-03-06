import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/testing-page/home/home';
import { ListPage } from '../pages/testing-page/list/list';
import { ChartPage } from '../pages/testing-page/chart/chart';
import { ChartTestPage } from '../pages/testing-page/chart-test/chart-test';
import { PortfolioOverviewPage } from '../pages/private-banking/portfolio-overview/portfolio-overview';
import { PortfolioOverviewPureColorPage } from '../pages/private-banking/portfolio-overview-pure-color/portfolio-overview-pure-color';
import { PortfolioOverviewNoAnimationPage } from '../pages/private-banking/portfolio-overview-no-animation/portfolio-overview-no-animation';
import { PerformancePage } from '../pages/private-banking/my-portfolio/performance/performance';
import { HighchartsPage } from '../pages/testing-page/highcharts/highcharts';
import { C3ChartPage } from '../pages/testing-page/c3-chart/c3-chart';
import { AreaChartPage } from '../pages/area-chart/area-chart';
import { BarChartPage } from '../pages/testing-page/bar-chart/bar-chart';
import { BarChart2Page } from '../pages/bar-chart-2/bar-chart-2';
import { CcyDistributionPage } from '../pages/private-banking/my-portfolio/ccy-distribution/ccy-distribution';
import { AssetAllocationDetailPage } from '../pages/private-banking/asset-allocation-detail/asset-allocation-detail';
import { NavDetailPage } from '../pages/private-banking/nav-detail/nav-detail';
import { PortfolioHistoryPage } from '../pages/private-banking/my-portfolio/portfolio-history/portfolio-history';
import { MyPortfolioPage } from '../pages/private-banking/my-portfolio/my-portfolio';
import { HoldingListPage } from '../pages/private-banking/portfolio-holding/holding-list/holding-list';
import { PortfolioHoldingPage } from '../pages/private-banking/portfolio-holding/portfolio-holding';
import { AssetHistoryPage } from '../pages/private-banking/portfolio-holding/asset-history/asset-history';


import { ColorSettingPage } from '../pages/color-setting/color-setting';

import { PureColorPage } from '../pages/testing-page/background-test/pure-color/pure-color';
import { GradientColorPage } from '../pages/testing-page/background-test/gradient-color/gradient-color';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PortfolioOverviewPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Portfolio Overview', component: PortfolioOverviewPage },
      { title: 'Portfolio Overview Pure', component: PortfolioOverviewPureColorPage },
      { title: 'Portfolio Overview No Animation', component: PortfolioOverviewNoAnimationPage },
      //{ title: 'GradientColorPage', component: GradientColorPage },
      //{ title: 'PureColorPage', component: PureColorPage },
     
      //// { title: 'My Portfolio', component: MyPortfolioPage},
     //// { title: 'Portfolio Holding', component: PortfolioHoldingPage},
      //{ title: 'PortfolioHistoryPage', component: PortfolioHistoryPage},
      //{ title: 'Currency Distribution', component: CcyDistributionPage },
      //{ title: 'Performance', component: PerformancePage },
      //{ title: 'AssetAllocationDetailPage', component: AssetAllocationDetailPage},
      //{ title: 'NavDetailPage', component: NavDetailPage},
      // { title: 'Bar Chart', component: BarChart2Page },
      // { title: 'Area Chart', component: AreaChartPage },
     //// { title: 'Setting', component: ColorSettingPage }
      //{ title: 'List', component: ListPage },
      //{ title: 'Home', component: HomePage },
      //{ title: 'Doughnut Chart.js', component: ChartPage },
      //{ title: 'Highcharts', component: HighchartsPage },
      //{ title: 'c3.js Chart', component: C3ChartPage },
      //{ title: 'Chart Gradient Test', component: ChartTestPage },
      //{ title: 'Scroll Bar Chart', component: BarChartPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
