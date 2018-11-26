//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
var path = require('path'); //Import path

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Instructions serveur à effectuer lors d'une requête POST avec action "/login"
router.get('/', function (request, response, next) 
{
    request.session.connected = false;
    console.log("logout called: " + request.session.connected);
    response.sendFile(path.resolve('./CERIGame/login.html'));	//Page login;
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier login.js est importé