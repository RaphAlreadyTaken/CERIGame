/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const path = require('path');       //Import path

/******** Declaration des variables
 *
 ********/
var app = express(); //Création objet Express
var index = require('./routes/index');  //Import fichier index.js
var login = require('./routes/login');  //Import fichier login.js

/******** Trucs à utiliser
 *
 ********/
app.use(express.static(path.join(__dirname, './'))); //Ajout répertoire app dans "path" de l'app
app.use(express.static(path.join(__dirname, '../css'))); //Ajout répertoire css dans "path" de l'app
app.use('/', index);    //Utilise la variable index (importation index.js)
app.use('/login', login) //Utilise la variable login (importation login.js)

/******** Application
 *
 ********/
angular.module('CERIGame', [])
.controller('login_controller');

/******** Export
 *
 ********/
module.exports = app;   //L'objet app est transmis lorsque le fichier app.js est importé