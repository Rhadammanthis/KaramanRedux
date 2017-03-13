import firebase from 'firebase';

function LoginCtrl($scope, $location, $route, $alert, $firebase) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.userData = {};
  vm.attemptingLogIn = false;

  vm.$onInit = () => {

    $firebase.start();

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        $route.reload();
        $location.path('/home');

      } else {
        // No user is signed in.
      }
    });

  }

  vm.atemptLogin = (event) => {
    vm.attemptingLogIn = true;

    firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.password)
      .then(user => {

        if (user) {
          // User is signed in.
          $firebase.other.database().ref(`/users/${user.uid}/medicData`)
            .once('value').then(snapshot => {
              console.log(snapshot.val())
              if (snapshot.val()) {
                $route.reload();
                $location.path('/home');
              }
              else {
                $route.reload();
                $location.path('/settings').search({ status: 'no_config' });
              }
            });

        } else {
          // No user is signed in.
        }

        vm.attemptingLogIn = false;
      })
      .catch((error) => {
        console.log(error);
        console.log('I am error')
        $alert.show("Nombre o contraseña incorrectos");

        vm.attemptingLogIn = false;
      });
  }

}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
