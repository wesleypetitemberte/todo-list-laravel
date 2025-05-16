angular.module('todoApp')
    .directive('matchPassword', function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                let getOtherModel = $parse(attrs.matchPassword);

                ngModel.$validators.matchPassword = function(modelValue) {
                    const otherValue = getOtherModel(scope);
                    // Só valida se ambos os campos estiverem preenchidos
                    if (!modelValue || !otherValue) return true;
                    return modelValue === otherValue;
                };

                // Observa mudanças tanto no campo de senha quanto no de confirmação
                scope.$watchGroup([attrs.matchPassword, function() { return ngModel.$modelValue; }], function() {
                    ngModel.$validate();
                });
            }
        };
    });
