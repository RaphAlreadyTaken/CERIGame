/******** Chargement de l'application
 *
 ********/
const app = require('./CERIGame/app/app'); //Import app.js (objet app)

/******** Configuration du serveur NodeJS - Port : 3131
 *
 ********/
var server = app.listen(3131, function()
{
	console.log('The nodeJS server is listening on 3131');	//Message dans la console Node
	console.log('Server base dir: ' + __dirname);			//Chemin absolu vers serveur
});