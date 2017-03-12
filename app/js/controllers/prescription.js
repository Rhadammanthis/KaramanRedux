function PrescriptionCtrl($alert, $cookies, $location, $firebase, $printer) {
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

    if ($cookies.get('prescription'))
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

  vm.print = () => {

    var prescription = {};
    prescription.doctor = {};
    prescription.doctor.name = "Dr. Stephen Strange";
    prescription.doctor.address = "Rocky Rd 1430, Jacksonville GA, 30044";
    prescription.doctor.telephone = "+16789003060"
    prescription.patient = {};
    prescription.patient.name = "Hugo Obette Medina Marmolejo"
    prescription.patient.meds = [];
    var medOne = {};
    medOne.name = "Prozac and then some other";
    medOne.description = "Take just on pill every other weekend day and month"
    prescription.patient.meds.push(medOne)
    var medTwo = {};
    medTwo.name = "Advil from hell 666";
    medTwo.description = "Whatever it is you fell you might need. I dont know man, I'm not a doctor"
    prescription.patient.meds.push(medTwo)

    $printer.print(prescription);
  }



}

export default {
  name: 'PrescriptionCtrl',
  fn: PrescriptionCtrl
};
