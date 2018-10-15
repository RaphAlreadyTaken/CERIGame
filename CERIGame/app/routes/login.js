/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router


//Instructions serveur à effectuer lors d'une requête GET avec action "/login"
router.get('/', function (request, response, next) 
{
    var log = request.query.login;		//Récupération variable "login" de la requête GET
	var pass = request.query.password;	//Récupération variable "password" de la requête GET
    console.log('Parameters: login -> ' + log + ", password -> " + pass)	//Affichage console serveur
    response.send('You are logged in');	//Réponse serveur =  message vers navigateur
    
    // vérification des informations de login auprès de la base postgresql
    sql = "select * from fredouil.users;";
    // instance de connexion avec toutes les informations de la BD
    var pool = new pgClient.Pool(
        {
            user: 'uapv1603044', 
            host: '127.0.0.1', 
            database: 'etd', 
            password: 'LZJIMq', 
            port: 5432 
        });

    // Connexion à la base => objet de connexion : client
    // fonctionne également en promesse avec then et catch !
    pool.connect(function(err, client, done) 
    {
        if(err) 
        {
            console.log('Error connecting to pg server' + err.stack);
        }
        else
        {
            console.log('Connection established with pg db server');
        }
    // Exécution de la requête SQL et traitement du résultat
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier login.js est importé