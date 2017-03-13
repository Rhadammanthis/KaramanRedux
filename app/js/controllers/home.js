import _ from 'lodash';

function HomeCtrl($location, $q, ConsoleService, $alert, $mdSidenav, $firebase, $cookies) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  vm.promise;
  vm.list = [];
  vm.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  vm.$onInit = () => {
    //Init Firebase app
    $firebase.start();

    var deferred = $q.defer();
    vm.promise = deferred.promise;

    $firebase.other.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        medicDataLocalInstance(user);

        vm.promise = $firebase.other.database().ref(`/users/${user.uid}/patients`)
          .once('value').then(snapshot => {
            console.log(snapshot.val())
            vm.list = _.map(snapshot.val(), (val, index) => {
              var newVal = val;
              newVal.uid = index;
              return newVal;
            });
            // _this._setTotal(_this._lista.length);
            deferred.resolve(123);
          });
      } else {
        // No user is signed in.
        // fun('Se ha producido un error');
      }
    });
  }

  vm.patientSelected = patient => {
    $cookies.put('patient', JSON.stringify(patient));
    $location.path('/records');
  }

  vm.newPatient = () => {
    $location.path('/patient/register');
  }

  vm.openSideNav = () => {
    $mdSidenav('left')
      .toggle()
      .then(function () {
      });
  }

  vm.logOut = () => {
    $firebase.other.auth().signOut();
    $location.path('/');
  }

  vm.settings = () => {
    $location.path('/settings');
  }

  var medicDataLocalInstance = (user) => {
    $firebase.other.database().ref(`/users/${user.uid}/medicData`)
      .once('value').then(snapshot => {
        console.log(snapshot.val())
        $cookies.put('medicData', JSON.stringify(snapshot.val()));
      });
  }

}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
