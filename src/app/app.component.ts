import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChartPage } from '../pages/chart/chart';
import { ChartTestPage } from '../pages/chart-test/chart-test';
import { ChartTest2Page } from '../pages/chart-test-2/chart-test-2';
import { MixedChartPage } from '../pages/mixed-chart/mixed-chart';
import { HighchartsPage } from '../pages/highcharts/highcharts';
import { C3ChartPage } from '../pages/c3-chart/c3-chart';
import { AreaChartPage } from '../pages/area-chart/area-chart';
import { BarChartPage } from '../pages/bar-chart/bar-chart';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AreaChartPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Doughnut Chart.js', component: ChartPage },
      { title: 'Mixed Chart.js', component: MixedChartPage },
      { title: 'Highcharts', component: HighchartsPage },
      { title: 'c3.js Chart', component: C3ChartPage },
      { title: 'Chart Gradient Test', component: ChartTestPage },
      { title: 'Portfolio Overview', component: ChartTest2Page },
      { title: 'Area Chart', component: AreaChartPage },
      { title: 'Bar Chart', component: BarChartPage }
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
