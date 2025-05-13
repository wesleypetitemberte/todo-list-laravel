angular.module('todoApp').component('loginForm', {
    bindings: {
        fields: '<',
        onSubmit: '&',
        buttonTitle: '@',
        data: '='
    },
    templateUrl: 'app/components/login-form/login-form.template.html',
    controller: function() {
        var $ctrl = this;
        $ctrl.data = {};

        $ctrl.submit = function() {
            $ctrl.onSubmit({ data: $ctrl.data }); // envia os dados para o pai
        };
    }
});
