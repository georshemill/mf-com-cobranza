import { enableProdMode, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

import { singleSpaAngular } from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { setPublicPath } from 'systemjs-webpack-interop';

if (environment.production) {
  enableProdMode();
}

setPublicPath('mf-com-cobranza');

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, appConfig);
  },
  template: '<app-com-cobranza />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
