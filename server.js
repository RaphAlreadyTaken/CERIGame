/******** Chargement des Middleware
*
********/
const express = require('express'); // définit expressJS

/******** Declaration des variables
 *
 ********/
const app = express(); // appel à expressJS

/******** Répertoires statiques
 *
 ********/
app.use(express.static('CERIGame/css')) //Ajout répertoire css dans "path" nodeJS

/******** Configuration du serveur NodeJS - Port : 3xxx
*
********/
var server=app.listen(3131, function()
{
	console.log('The nodeJS server is listening on 3131');	// Message dans la console Node
	console.log('Server base dir: ' + __dirname);			// Chemin absolu vers serveur
});

/******** Gestion des URI
*
********/
app.get('/', function (request, response) 
{
	console.log('Target: ' + __dirname + '/CERIGame/index.html');	//Fichier cible
	response.sendFile(__dirname + '/CERIGame/index.html');			//Réponse serveur = fichier cible
});

//Instructions serveur à effectuer lors d'une requête GET avec action "/login"
app.get('/login', function(request, response)
{
	var log = request.query.login;		//Récupération variable "login" de la requête GET
	var pass = request.query.password;	//Récupération variable "password" de la requête GET
	console.log('Parameters: login -> ' + log + ", password -> " + pass)	//Affichage console serveur
	response.send('You are logged in');	//Réponse serveur =  message vers navigateur
})