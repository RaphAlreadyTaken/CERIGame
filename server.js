/******** Chargement des Middleware
*
********/
const express = require('express');

/******** Declaration des variables
*
********/
const app = express();
var __dirname = 'C:/Users/Raph/Google Drive/Github Repo/CERIGame'

/******** Configuration du serveur NodeJS - Port : 3131
*
********/
var server = app.listen(3131, function(request, response)
{
    console.log('The nodeJS server is listening on port 3131');
    console.log('Server base directory: ' + __dirname);
})

/******** Gestion des URI
*
********/
app.get('/', function(request, response)
{
    // response.send("This is the server root");
    console.log('Target: ' + __dirname + '/CERIGame/index.html');
    return response.redirect('/CERIGame/index.html');
})

app.get('/CERIGame/index.html', function(request, response)
{
    response.send("You are now logged in");
})
