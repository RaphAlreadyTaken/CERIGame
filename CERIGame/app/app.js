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