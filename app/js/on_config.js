function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, $mdThemingProvider) {
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

  $stateProvider
    .state('Home', {
      url: '/home',
      controller: 'HomeCtrl as home',
      templateUrl: 'home.html',
      title: 'Home'
    });

  $stateProvider
    .state('Nuevo Paciente', {
      url: '/patient/register',
      controller: 'RegisterPatientCtrl as register',
      templateUrl: 'register.html',
      title: 'Registrar Paciente'
    });

  $stateProvider
    .state('Expediente Médico', {
      url: '/records',
      controller: 'RecordsCtrl as records',
      templateUrl: 'records.html',
      title: 'Expediente Médico'
    });

  $stateProvider
    .state('Consulta Médica', {
      url: '/checkup',
      controller: 'CheckupCtrl as checkup',
      templateUrl: 'checkup.html',
      title: 'Consulta Médica'
    });

  $stateProvider
    .state('Receta', {
      url: '/prescription',
      controller: 'PrescriptionCtrl as prescription',
      templateUrl: 'prescription.html',
      title: 'Receta'
    });

  $stateProvider
    .state('Configuración', {
      url: '/settings',
      controller: 'SettingsCtrl as settings',
      templateUrl: 'settings.html',
      title: 'Configuración'
    });

  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');

}

export default OnConfig;
