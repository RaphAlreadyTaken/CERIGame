/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Instructions serveur à effectuer lors d'une requête GET avec action "/login"
router.get('/', function (request, response, next) 
{
    var log = request.query.login;      //Récupération variable "login" de la requête GET
	var pass = request.query.password;	//Récupération variable "password" de la requête GET
    console.log('Parameters: login -> ' + log + ", password -> " + pass)    //Affichage console serveur
	response.send('You are logged in');	//Réponse serveur =  message vers navigateur
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier login.js est importé