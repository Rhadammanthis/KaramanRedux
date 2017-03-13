function PrescriptionCtrl($alert, $cookies, $location, $firebase, $printer) {
  'ngInject';

  // ViewModel
  const vm = this;
  var medsAndTreatments = []

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

    // $cookies.remove('prescription')

    if ($cookies.get('prescription')) {
      medsAndTreatments = JSON.parse($cookies.get('prescription'));

      for (var i = 0; i < medsAndTreatments.length; i++) {
        vm.content += medsAndTreatments[i].name + '\n' + medsAndTreatments[i].body + '\n\n'
      }
    }


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
    var medOrTreatment = {}
    medOrTreatment.name = item.name
    medOrTreatment.description = item.body

    medsAndTreatments.push(medOrTreatment)

    vm.content += item.name + '\n' + item.body + '\n\n'
  }

  vm.goBack = () => {
    $location.path('/checkup')
  }

  vm.onSavePressed = () => {
    $cookies.put('prescription', JSON.stringify(medsAndTreatments));
    $alert.show('Receta guardada correctamente');
  }

  vm.print = () => {

    var medicData, patient;

    if ($cookies.get('medicData'))
      medicData = JSON.parse($cookies.get('medicData'));

    if ($cookies.get('patient'))
      patient = JSON.parse($cookies.get('patient'));

    var prescription = {};
    prescription.doctor = {};
    prescription.doctor.name = medicData.title + " " + medicData.name
    prescription.doctor.address = medicData.address
    prescription.doctor.telephone = medicData.tel.toString();
    prescription.patient = {};
    prescription.patient.name = patient.name + " " + patient.parentalLastName + " " + patient.maternalLastName
    prescription.patient.meds = medsAndTreatments

    $printer.print(prescription);
  }



}

export default {
  name: 'PrescriptionCtrl',
  fn: PrescriptionCtrl
};
