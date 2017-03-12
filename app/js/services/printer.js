function PrinterService() {
  'ngInject';

  const service = {};

  service.print = (prescription) => {

    var doc = new jsPDF()
    doc.setFontSize(19)
    doc.text(105, 17, prescription.doctor.name, 'center');
    doc.setFontSize(12)
    doc.text(105, 23, prescription.doctor.address, 'center');
    doc.text(105, 29, prescription.doctor.telephone, 'center');
    doc.line(15, 31, 195, 31);
    doc.setFontSize(17)
    doc.text(105, 42, 'Datos del Paciente', 'center');
    doc.text(15, 60, 'Nombre:');
    doc.line(39, 61, 195, 61);
    doc.setFontSize(19)
    doc.text(40, 60, prescription.patient.name);

    var meds = prescription.patient.meds;
    var textPossition = 80;

    for (var i = 0; i < meds.length; i++) {
      doc.setFontSize(19)
      var splittedMedName = splitter(meds[i].name, 20);
      var medNamePos; 
      
      for (var j = 0; j < splittedMedName.length; j++) {
        medNamePos = textPossition + (j * 8)
        doc.text(15, medNamePos, splittedMedName[j]);
      }

      doc.setFontSize(14)

      var splittedMedDescription = splitter(meds[i].description, 50);
      var medDescPos;
      
      for (var k = 0; k < splittedMedDescription.length; k++) {
        medDescPos = textPossition + (k * 6) 
        doc.text(90, medDescPos, splittedMedDescription[k]);
      }

      textPossition = medDescPos >= medNamePos ? medDescPos + 15 : medNamePos + 15;
    }

    doc.line(120, 270, 195, 270);
    doc.setFontSize(12)
    doc.text(157, 275, 'Firma', 'center');

    doc.autoPrint()
    doc.save('autoprint.pdf')
  }

  return service;

}

//Credit to Paulpro on StackOverflow
function splitter(str, l) {
  var strs = [];
  while (str.length > l) {
    var pos = str.substring(0, l).lastIndexOf(' ');
    pos = pos <= 0 ? l : pos;
    strs.push(str.substring(0, pos));
    var i = str.indexOf(' ', pos) + 1;
    if (i < pos || i > pos + l)
      i = pos;
    str = str.substring(i);
  }
  strs.push(str);
  console.log('String', str)
  console.log('Strings', strs)
  return strs;
}

export default {
  name: '$printer',
  fn: PrinterService
};
