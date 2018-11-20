//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Instructions serveur à effectuer lors d'une requête POST avec action "/login"
router.get('/', function (request, response) 
{
    console.log("check connected: " + request.session.connected);
    response.send(request.session.connected);
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier login.js est importé