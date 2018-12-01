/******** Application
 *
 ********/
var app = angular.module('app', ["ngRoute"]);
app.controller('loginController', loginController);
app.controller('userController', userController);
app.controller('quizzController', quizzController);
app.service('auth', authService);
app.service('session', sessionService);
app.service('localStorage', localStorageService);
app.service('user', userService);

//Directives
app.directive('ngEnter', function ()
{
    return function (scope, element, attrs)
    {
        element.bind("keydown keypress", function (event)
        {
            if (event.which === 13)
            {
                scope.$apply(function ()
                {
                    scope.$eval(attrs.ngEnter);
                });
                
                event.preventDefault();
            }
        });
    };
})