import _ from 'lodash';

function CheckupCtrl($firebase, $alert, $q, $cookies, $location) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.patients;
  vm.patient = null;
  vm.todaysDate;
  vm.patientAge;
  vm.tempCheckup = {};

  vm.$onInit = () => {
    //Init Firebase app
    $firebase.start();

    vm.todaysDate = Date.now();
    if($cookies.get('patient'))
      vm.patient = JSON.parse($cookies.get('patient'));

    if (vm.patient) {
      vm.patientAge = Math.abs(new Date(Date.now() - vm.patient.dateOfBirth).getUTCFullYear() - 1970);
      console.log('Age', vm.patientAge)
    }

    if($cookies.get('checkup'))
      vm.tempCheckup = JSON.parse($cookies.get('checkup'));
  }

  vm.processPatientData = () => {
    vm.patientAge = Math.abs(new Date(Date.now() - vm.patient.dateOfBirth).getUTCFullYear() - 1970);
    console.log(vm.patientAge);
  }

  vm.loadPatients = () => {
    const deferred = $q.defer();
    $firebase.other.auth().onAuthStateChanged((user) => {
      if (user) {
        $firebase.other.database().ref(`/users/${user.uid}/patients`)
          .once('value').then(snapshot => {
            vm.patients = _.map(snapshot.val(), (val, index) => {
              var newVal = val;
              newVal.uid = index;
              return newVal;
            });
            console.log(vm.patients);
            deferred.resolve();
          });
      }
    });
    return deferred.promise;
  }

  vm.onSavePressed = () => {
    console.log(vm.tempCheckup);
    const prescription = $cookies.get('prescription')
    // console.log(prescription);
    if (!prescription)
      $alert.show('Necesitas completar una receta');
    else {
      var checkup = {};
      checkup.prescription = prescription
      checkup.data = vm.tempCheckup.data;
      checkup.date = Date.now();

      $firebase.other.auth().onAuthStateChanged(function (user) {
        if (user) {
          const uid = vm.tempCheckup.patient.uid
          $firebase.other.database().ref(`/checkups/${user.uid}/${uid}`)
            .push(checkup)
            .then(() => {
              $alert.show("Consulta guardada correctamente");
              console.log('Created!')
            });
        }
        else {
          // No user is signed in.
          // fun('Se ha producido un error');
        }
      });
    }
  }

  vm.onPrescriptionPressed = () => {
    vm.tempCheckup.patient = vm.patient;
    console.log(vm.tempCheckup);
    $cookies.put('checkup', JSON.stringify(vm.tempCheckup));
    $location.path('/prescription')
  }

  vm.goBack = () => {
    $location.path('/records');
  }

}

export default {
  name: 'CheckupCtrl',
  fn: CheckupCtrl
};
