function RecordsCtrl($cookies, $alert, $firebase, $location) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.patient;
  vm.background;
  vm.dataChanged = false;
  vm.dateOfBirth;

  vm.states = ('Aguascalientes+Baja California+Baja California Sur+Campeche+Chiapas+Chihuahua+Coahuila+Colima+CDMX+Durango+Guanajuato+Guerrero' +
    '+Hidalgo+Jalisco+Estado de México+Michoacan+Morelos+Nayarit+Nuevo León+Oaxaca+Puebla+Queretaro+Quintana Roo+San Luis Potosí+' +
    'Sinaloa+Sonora+Tabasco+Tamaulipas+Tlaxcala+Veracruz+Yucatán+Zacatecas').split('+').map(function (state) {
      return { abbrev: state };
    });

  vm.$onInit = () => {
    //Init Firebase app
    $firebase.start();

    vm.patient = JSON.parse($cookies.get('patient'));
    this.dateOfBirth = new Date(this.patient.dateOfBirth);
    delete this.patient.$$hashKey;
  }

  vm.updatePatient = (uid) => {
    // delete _this.patient.$$hashKey;
    $firebase.other.auth().onAuthStateChanged((user) => {
      if (user) {
        $firebase.other.database().ref(`/users/${user.uid}/patients/${uid}`)
          .set(vm.patient)
          .then(() => {
            $alert.show('Paciente actualizado correctamente');
          })
      }
    });
  }

  vm.goBack = () => {
    $location.path('/home');
  }

  vm.newCheckUp = () => {
    $location.path('/checkup');
  }

}

export default {
  name: 'RecordsCtrl',
  fn: RecordsCtrl
};
