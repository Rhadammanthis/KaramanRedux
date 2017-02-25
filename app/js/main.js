import angular from 'angular';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import ngRoute from 'angular-route';
import ngTable from 'angular-material-data-table';

// angular modules
import constants from './constants';
import onConfig from './on_config';
import onRun from './on_run';
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  ngMaterial,
  ngCookies,
  ngRoute,
  ngTable,
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
