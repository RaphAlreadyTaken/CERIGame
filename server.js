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
app.use(express.static('CERIGame/css')) //Répertoire css dans "path" nodeJS

/******** Configuration du serveur NodeJS - Port : 3xxx
*
********/
var server=app.listen(3131, function()
{
    console.log('The nodeJS server is listening on 3131'); // Message dans la console Node
    console.log('Server base dir: ' + __dirname);
});

/******** Gestion des URI
*
********/
app.get('/', function (request, response) 
{
    console.log('Target: ' + __dirname + '/CERIGame/index.html');
    response.sendFile(__dirname + '/CERIGame/index.html');
});

app.get('/login', function(request, response)
{
    var log = request.query.login;
    var pass = request.query.password;
    console.log('Parameters: login -> ' + log + ", password -> " + pass)
    response.send('You are logged in');
})