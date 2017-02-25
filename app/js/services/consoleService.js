function ConsoleService() {
  'ngInject';

  const service = {};

  service.get = function() {
    return new Promise((resolve, reject) => {
      $http.get('apiPath').success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  service.send = (text) => {
      console.log(text)
  }

  return service;

}

export default {
  name: 'ConsoleService',
  fn: ConsoleService
};
