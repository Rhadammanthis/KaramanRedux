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
        console.log(user)
        $route.reload();
        $location.path('/home');

      } else {
        // No user is signed in.
      }
    });

  }

  vm.atemptLogin = (event) => {
    console.log(vm.userData)
    vm.attemptingLogIn = true;
    firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.password)
      .then(user => {
        console.log("Succe!")
        console.log(user);
        vm.attemptingLogIn = false;
        $route.reload();
        $location.path('/home');
        // console.log(user)
      })
      .catch((error) => {
        console.log(error);
        console.log('I am error')
        $alert.show("Nombre o contraseña incorrectos");
      });
  }

}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
