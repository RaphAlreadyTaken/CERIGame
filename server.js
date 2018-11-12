/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const path = require('path');       //Import path
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const MongoClient = require('mongodb').MongoClient;

/******** Declaration des variables
 *
 ********/
var app = express(); //Création objet Express
var index = require('./CERIGame/app/routes/index');  //Import fichier index.js
var login = require('./CERIGame/app/routes/login');  //Import fichier login.js
//var dsnMongoDB = "mongodb://?";	//Adresse à déterminer

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
		uri: "mongodb://127.0.0.1:27017/db",	//Adresse à déterminer
		collection: 'mySessions_3131',
		touchAfter: 24 * 3600
	})
}));
app.use(express.static(path.join(__dirname, './CERIGame/app'))); //Ajout répertoire app dans "path" de l'app
app.use(express.static(path.join(__dirname, './CERIGame/css'))); //Ajout répertoire css dans "path" de l'app
app.use('/', index);    //Utilise la variable index (importation index.js)
app.use('/login', login) //Utilise la variable login (importation login.js)

/******** Configuration du serveur NodeJS - Port : 3131
 *
 ********/
var server = app.listen(3131, function()
{
	console.log('The nodeJS server is listening on 3131');	//Message dans la console Node
	console.log('Server home: ' + __dirname);			//Chemin absolu vers serveur
});