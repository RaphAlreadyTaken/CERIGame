//Server

/******** Chargement des Middleware
*
********/
const express = require('express');	//Import Express

/******** Declaration des variables
 *
 ********/
var router = express.Router();	//Création objet Router
var path = require('path');//Import path

//Accès à la racine du serveur => redirection de l'utilisateur
router.get('/', function (request, response, next)
{
	console.log('Target: ' + __dirname + '/login.js');	//Fichier cible

	if (request.session.connected === true)	//Utilisateur connecté
	{
		response.sendFile(path.resolve('./CERIGame/index.html'));   //Page app
	}
	else	//Utilisateur non connecté
	{
		response.sendFile(path.resolve('./CERIGame/login.html'));	//Page login
	}
});

/******** Export
 *
 ********/
module.exports = router;	//L'objet router est transmis lorsque le fichier index.js est importé