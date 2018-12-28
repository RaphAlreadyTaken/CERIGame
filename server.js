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
var login = require('./CERIGame/app/routes/login');  //Import fichier login.js
var logout = require('./CERIGame/app/routes/logout');  //Import fichier logout.js
var checkLog = require('./CERIGame/app/routes/checkLog');  //Import fichier checkLog.js
var getUser = require('./CERIGame/app/routes/getUser');  //Import fichier getUser.js
var getAllUsers = require('./CERIGame/app/routes/getAllUsers');  //Import fichier getAllUsers.js
var defi = require('./CERIGame/app/routes/defi');  //Import fichier initDefi.js
var updateProfil = require('./CERIGame/app/routes/updateProfil');  //Import fichier updateProfil.js
var getQuestion = require('./CERIGame/app/routes/getQuestion'); //Import fichier getQuestion.js
var getThemes = require('./CERIGame/app/routes/getThemes'); //Import fichier getThemes.js
var getTop10 = require('./CERIGame/app/routes/getTop10'); //Import fichier getTop10.js
var getHisto = require('./CERIGame/app/routes/getHisto'); //Import fichier getHisto.js
var saveResult = require('./CERIGame/app/routes/saveResult'); //Import fichier saveResult.js

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
app.use('/', index);    //Utilise la variable index (importation index.js)
app.use('/login', login); //Utilise la variable login (importation login.js)
app.use('/logout', logout);	//Utilise la variable logout (importation logout.js)
app.use('/checkLog', checkLog);	//Utilise la variable checkLog (importation checkLog.js)
app.use('/getUser', getUser);	//Utilise la variable getUser (importation getUser.js)
app.use('/getAllUsers', getAllUsers);	//Utilise la variable getUser (importation getUser.js)
app.use('/defi', defi); //Utilise la variable defi (importation defi.js)
app.use('/updateProfil', updateProfil);	//Utilise la variable updateProfil (importation updateProfil.js)
app.use('/getQuestion', getQuestion); //Utilise la variable getQuestion (importation getQuestion.js)
app.use('/getThemes', getThemes); //Utilise la variable getThemes (importation getThemes.js)
app.use('/getTop10', getTop10); //Utilise la variable getTop10 (importation getTop10.js)
app.use('/getHisto', getHisto); //Utilise la variable getHisto (importation getHisto.js)
app.use('/saveResult', saveResult); //Utilise la variable saveResult (importation saveResult.js)


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