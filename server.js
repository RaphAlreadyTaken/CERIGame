//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const path = require('path');       //Import path
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MongoClient = require('mongodb').MongoClient;	///Pas utilisé///

/******** Declaration des variables
 *
 ********/
var app = express(); //Création objet Express
var index = require('./CERIGame/app/routes/index');  //Import fichier index.js
var login = require('./CERIGame/app/routes/login');  //Import fichier login.js
var logout = require('./CERIGame/app/routes/logout');  //Import fichier logout.js
var checkLog = require('./CERIGame/app/routes/checkLog');  //Import fichier checkLog.js
var getUser = require('./CERIGame/app/routes/getAllUsers');  //Import fichier getUser.js
var dsnMongoDB = "mongodb://127.0.0.1:27017/db";	//Connexion base mongodb ///Pas utilisé///

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
app.use('/login', login) //Utilise la variable login (importation login.js)
app.use('/logout', logout)	//Utilise la variable logout (importation logout.js)
app.use('/checkLog', checkLog)	//Utilise la variable checkLog (importation checkLog.js)
app.use('/getUser', getUser)	//Utilise la variable getUser (importation getUser.js)


//JE SAIS PAS Où EST CE QUE CA VA
// app.get('/db/quizz/:p1/:p2', (request, response) => 
// {
// 	var p1 = request.params.p1;
// 	var p2 = request.params.p2;
// 	// Connexion MongoDB
// 	MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
// 	{
// 		if(err) 
// 		{
// 			return console.log('erreur connexion base de données'); 
// 		}
// 		if(mongoClient) 
// 		{
// 			// Exécution des requêtes
		
// 		}
// 	});
// });


/******** Configuration du serveur NodeJS - Port : 3131
 *
 ********/
var server = app.listen(3131, function()
{
	console.log('The nodeJS server is listening on 3131');	//Message dans la console Node
	console.log('Server home: ' + __dirname);			//Chemin absolu vers serveur
});