//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router
var path = require('path'); //Import path

//Instructions serveur à effectuer lors d'un accès à la racine du serveur
router.get('/', function (request, response, next)
{
	console.log('Target: ' + __dirname + '/login.js');	//Fichier cible

	if (request.session.connected === true)
	{
		response.sendFile(path.resolve('./CERIGame/index.html'));   //Page login
	}
	else
	{
		response.sendFile(path.resolve('./CERIGame/login.html'));	//Page app
	}
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier index.js est importé