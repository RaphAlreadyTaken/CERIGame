/******** Application
 *
 ********/
var app = angular.module('app', ["ngRoute"]);
app.controller('loginController', loginController);
app.service('auth', authService);
app.service('session', sessionService);
app.service('sessionStorage', sessionStorageService);