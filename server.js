//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const path = require('path');       //Import path
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MongoClient = require('mongodb').MongoClient;
var http = require('http');
var fs = require('fs');

/******** Declaration des variables
 *
 ********/
var app = express(); //Création objet Express
var index = require('./CERIGame/app/routes/index');  //Import fichier index.js
var log = require('./CERIGame/app/routes/log');  //Import fichier log.js
var user = require('./CERIGame/app/routes/user');  //Import fichier user.js
var defi = require('./CERIGame/app/routes/defi');  //Import fichier defi.js
var quizz = require('./CERIGame/app/routes/quizz');  //Import fichier quizz.js

/******** Trucs à utiliser
 *
 ********/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(session(
{
	secret: 'bobby bob',
	saveUninitialized: false,
	resave: false,
	store: new MongoDBStore(
	{
		uri: "mongodb://127.0.0.1:27017/db",	//Mettre adresse pedago pour accès distant
		collection: 'mySessions_3131',
		touchAfter: 24 * 3600
	}),
	cookie: {maxAge: 24 * 3600 * 1000}
}));
app.use(express.static(path.join(__dirname, './CERIGame/app'))); //Ajout répertoire app dans "path" de l'app
app.use(express.static(path.join(__dirname, './CERIGame/css'))); //Ajout répertoire css dans "path" de l'app
app.use(express.static(path.join(__dirname, './CERIGame/img'))); //Ajout répertoire css dans "path" de l'app
app.use('/', index);    //Utilise la variable index (importation index.js)
app.use('/log', log); //Utilise la variable log (importation log.js)
app.use('/user', user); //Utilise la variable user (importation user.js)
app.use('/defi', defi); //Utilise la variable defi (importation defi.js)
app.use('/quizz', quizz); //Utilise la variable quizz (importation quizz.js)


/******** Configuration du serveur NodeJS - Port : 3131
 *
 ********/
var server = http.createServer(app);

server.listen(3131, function()
{
	console.log('The nodeJS server is listening on 3131');	//Message dans la console Node
	console.log('Server home: ' + __dirname);			//Chemin absolu vers serveur
});

/******** Websocket
 *
 ********/
var io = require('socket.io').listen(server);

//Ouverture du duplex serveur <-> client
io.on('connection', function (socket)
{
	//io.emit -> message envoyé à tous les clients
	//socket.emit -> message envoyé au client à l'origine de l'événement
	//socket.broadcast.emit -> message envoyé à tous les clients sauf le client à l'origine de l'événement

	socket.on("notifConnexion", function(data)
	{
		socket.broadcast.emit("notifConnexion", data.ident + " s'est connecté");
	})

	socket.on("notifDeconnexion", function(data)
	{
		socket.broadcast.emit("notifDeconnexion", data.ident + " s'est déconnecté");
	})

	socket.on("confirmDefi", function(data)
	{
		socket.emit("confirmDefi", data.message);
		socket.broadcast.emit("notifDefi_" + data.id, {'message': "Vous avez été défié par " + data.auteur + " !", 'idDefi': data.idDefi});
	})

	socket.on("message", function(message)
	{
		console.log('Un client me dit: ' + message);
	})
});