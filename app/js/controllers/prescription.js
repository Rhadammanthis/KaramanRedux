function PrescriptionCtrl($alert, $cookies, $location, $firebase) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;

  vm.patients;
  vm.patient = null;
  vm.todaysDate;
  vm.patientAge;
  vm.data;
  vm.pageM = 1;
  vm.pageF = 1;
  vm.selected = [];
  vm.content = ""
  vm.lol = "value..."

  vm.$onInit = () => {
    //Init Firebase app
    $firebase.start();

    if($cookies.get('prescription'))
      vm.content = $cookies.get('prescription');

    vm.data = {
      "count": 8,
      treatments: [
        {
          "name": "Gripa",
          "body": "Comer muchas fresas"
        },
        {
          "name": "Tos",
          "body": "Te con miel de abeja"
        },
        {
          "name": "Diarrea",
          "body": "Comer muchas fresas"
        },
        {
          "name": "Dolor de cabeza",
          "body": "Te con miel de abeja"
        },
        {
          "name": "Tuberculosis",
          "body": "Comer muchas fresas"
        },
        {
          "name": "Polio",
          "body": "Te con miel de abeja"
        },
        {
          "name": "SIDA",
          "body": "Comer muchas fresas"
        },
        {
          "name": "Cancer",
          "body": "Te con miel de abeja"
        }
      ],
      meds: [
        {
          "name": "Prozac",
          "body": "10 pills"
        },
        {
          "name": "Nyquil",
          "body": "1 pill"
        },
        {
          "name": "Tylenol",
          "body": "1 pill"
        },
        {
          "name": "Aderall",
          "body": "1 pill"
        },
        {
          "name": "Xanax",
          "body": "1 pill"
        }
      ]

    };
  }

  vm.addToPrescription = (item) => {
    console.log(item)
    vm.content += item.name + '\n' + item.body + '\n\n'
  }

  vm.goBack = () => {
    $location.path('/checkup')
  }

  vm.onSavePressed = () => {
    $cookies.put('prescription', vm.content);
    $alert.show('Receta guardada correctamente');
  }

}

export default {
  name: 'PrescriptionCtrl',
  fn: PrescriptionCtrl
};
