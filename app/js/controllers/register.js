import firebase from 'firebase';

function RegisterPatientCtrl($alert, $location, $firebase) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;

  vm.patient = {};
  vm.dateOfBirth = new Date();
  vm.states = ('Aguascalientes+Baja California+Baja California Sur+Campeche+Chiapas+Chihuahua+Coahuila+Colima+CDMX+Durango+Guanajuato+Guerrero' +
    '+Hidalgo+Jalisco+Estado de México+Michoacan+Morelos+Nayarit+Nuevo León+Oaxaca+Puebla+Queretaro+Quintana Roo+San Luis Potosí+' +
    'Sinaloa+Sonora+Tabasco+Tamaulipas+Tlaxcala+Veracruz+Yucatán+Zacatecas').split('+').map(function (state) {
      return { abbrev: state };
    });

  vm.$onInit = () => {
    $firebase.start();
  }

  vm.registerNewPatient = () => {
    vm.patient.dateOfBirth = vm.dateOfBirth.getTime();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase.database().ref(`/users/${user.uid}/patients`)
          .push(vm.patient)
          .then(() => {
            $alert.show("Se ha agregado al nuevo paciente exitosamente");
            console.log('Created!')
          });
      }
      else {
        // No user is signed in.
        // fun('Se ha producido un error');
      }
    });
  }

  vm.goBack = () => {
    $location.path('/home');
  }


}

export default {
  name: 'RegisterPatientCtrl',
  fn: RegisterPatientCtrl
};
