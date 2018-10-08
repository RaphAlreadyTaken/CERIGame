/******** Chargement des Middleware
*
********/
const express = require('express'); // définit expressJS
var http = require('http');

/******** Declaration des variables
 *
 ********/
const app = express(); // appel à expressJS

/******** Configuration du serveur NodeJS - Port : 3xxx
*
********/

/******** Gestion des URI
*
********/


app.get('/', function (req, res) 
{
    res.send("/home/nas02a/etudiants/inf/uapv1603044/squeletteWeb1819/CERIGame/index.html");
});

var server=app.listen(3131, function()
{
    console.log('listening on 3131'); // Message dans la console Node
}); 
