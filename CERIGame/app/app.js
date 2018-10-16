/******** Application
 *
 ********/
var app = angular.module('app', []);
app.controller('loginController', loginController);
app.service('auth', authService);
app.service('session', sessionService);