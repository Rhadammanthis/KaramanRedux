function SettingsCtrl($scope, $location, $route, $alert, $firebase, $mdSidenav) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.showNavItems = true
  vm.titles = ('Dr.+Dra.+MD.+P.H.D').split('+').map(function (state) {
    return { abbrev: state };
  });

  vm.$onInit = () => {
    //Init Firebase app
    $firebase.start();

    const status = $location.search().status;
    if (status && status === 'no_config')
      vm.showNavItems = false
  }

  vm.registerMedicData = () => {
    console.log('Attempting to save medic\'s data')
    $firebase.other.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.

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

  vm.openSideNav = () => {
    $mdSidenav('left')
      .toggle()
      .then(function () {
      });
  }

}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
