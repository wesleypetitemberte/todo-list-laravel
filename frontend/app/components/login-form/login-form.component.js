angular.module('todoApp').component('loginForm', {
    bindings: {
        fields: '<', // Recebe os campos do formulário
        onSubmit: '&',
        buttonTitle: '@' // Recebe o título do botão como string
    },
    templateUrl: 'app/components/login-form/login-form.template.html',
    controller: function () {
        this.$onInit = function () {
            console.log('Data:', this.data);
            console.log('Fields:', this.fields);
            console.log('Button Title:', this.buttonTitle);
        };
    }
});