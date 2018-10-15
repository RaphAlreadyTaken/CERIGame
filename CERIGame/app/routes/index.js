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
	response.sendFile(path.resolve('./CERIGame/index.html'));   //Réponse serveur = fichier cible
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier index.js est importé