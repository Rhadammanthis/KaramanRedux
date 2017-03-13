function AlertService($mdDialog) {
    'ngInject';

    const service = {};

    service.show = (text, possitive, onConfirm) => {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .title(text)
                .ariaLabel('Alert Dialog Demo')
                .ok(possitive ? possitive : 'Aceptar')
        ).then(onConfirm ? onConfirm : null);
    }

    return service;

}

export default {
    name: '$alert',
    fn: AlertService
};
