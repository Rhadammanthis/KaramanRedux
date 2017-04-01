import _ from 'lodash';

function SettingsCtrl($scope, $location, $route, $alert, $firebase, $mdSidenav) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.showNavItems = true
  vm.titles = ('Dr.+Dra.+MD.+P.H.D').split('+').map(function (state) {
    return { abbrev: state };
  });
  vm.sideNav = {
    personalData: true,
    prescription: false,
    vitals: false
  }

  vm.vitalSigns = [{
    active: true,
    name: "Talla en Mts",
    description: "Lo que mide el vato"
  }, {
    active: false,
    name: "Peso en Kg",
    description: "Lo que pesa el vato"
  }, {
    active: true,
    name: "Algo mas",
    description: "She has been fearless"
  }]

  var settings = {}
  var vitalSigns
  var settingsUid

  vm.$onInit = () => {
    //Init Firebase app
    $firebase.start();

    const status = $location.search().status;
    if (status && status === 'no_config')
      vm.showNavItems = false

    //Gets user's settings
    $firebase.other.auth().onAuthStateChanged(user => {
      if (user) {
        vm.promise = $firebase.other.database().ref(`/users/${user.uid}/settings/vital-signs`)
          .once('value').then(snapshot => {
            settings.vitalSigns = _.map(snapshot.val(), (val, index) => {
              settingsUid = index
              return val;
            })[0]
            console.log(settings.vitalSigns)

            $firebase.other.database().ref(`vital_signs`)
              .once('value').then(snapshot => {
                vm.vitalSigns = _.map(snapshot.val(), (val, index) => {
                  var newVal = val;
                  newVal.uid = index
                  if (settings.vitalSigns.includes(index))
                    newVal.active = true
                  else
                    newVal.active = false
                  return newVal;
                });
              });
          });
      }
    });


  }

  vm.registerMedicData = () => {
    console.log('Attempting to save medic\'s data')
    $firebase.other.auth().onAuthStateChanged(user => {
      if (user) {
        $firebase.other.database().ref(`/users/${user.uid}/medicData`)
          .set(vm.medicData)
          .then(() => {
            $alert.show('Información guardada correctamente', null, () => {
              $route.reload();
              $location.path('/home').search({});;
            });
          })

      } else {
        // No user is signed in.
        // fun('Se ha producido un error');
      }
    });
  }

  vm.goHome = () => {

    var vS = ["-Kgc_7zwXSKtCVVcCAYT", "-Kgc_9nKW4H4PFdfwgFn", "-Kgc_EwXpHiWjrwKGZHU"]

    $firebase.other.auth().onAuthStateChanged((user) => {
      if (user) {
        $firebase.other.database().ref(`/users/${user.uid}/settings/vital-signs`)
          .push(vS)
          .then(() => {
            $alert.show('Paciente actualizado correctamente');
          })
      }
    });
  }

  vm.onRowClicked = (row, rowClicked) => {

    row.active = rowClicked ? !row.active : row.active;
    var updatedRow = _.clone(row)

    if (row.active)
      settings.vitalSigns.push(updatedRow.uid)
    else
      remove(settings.vitalSigns, updatedRow.uid)

    $firebase.other.auth().onAuthStateChanged((user) => {
      if (user) {
        $firebase.other.database().ref(`/users/${user.uid}/settings/vital-signs/${settingsUid}`)
          .set(settings.vitalSigns)
          .then(() => {
            $alert.show('Paciente actualizado correctamente');
          })
      }
    });

  }

  vm.openSideNav = () => {
    $mdSidenav('left')
      .toggle()
      .then(function () {
      });
  }

  vm.sideNavSelected = (sideNavItem) => {
    Object.keys(vm.sideNav).forEach(function (key) {
      if (key !== sideNavItem)
        vm.sideNav[key] = false
      else
        vm.sideNav[key] = !vm.sideNav[key]
    });
  }

  var remove = (arr, what) => {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}

}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
