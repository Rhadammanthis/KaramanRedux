import firebase from 'firebase';

function FirebaseService($http) {
  'ngInject';

  const service = {};

  service.get = function () {
    return new Promise((resolve, reject) => {
      $http.get('apiPath').success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  service.start = () => {
    //Init Firebase app
    var config = {
      apiKey: 'AIzaSyD3oAIor2nYstgPRZulPxYIkky8cHlwEW4',
      authDomain: 'colmorov.firebaseapp.com',
      databaseURL: 'https://colmorov.firebaseio.com',
      storageBucket: 'colmorov.appspot.com',
      messagingSenderId: '682480538484'
    };

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
  }

  service.other = firebase;

  return service;

}

export default {
  name: '$firebase',
  fn: FirebaseService
};
