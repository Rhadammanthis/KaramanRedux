function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
  .state('Login', {
    url: '/',
    controller: 'LoginCtrl as login',
    templateUrl: 'login.html',
    title: 'Login'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
