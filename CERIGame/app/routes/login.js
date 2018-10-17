/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg
const sha1 = require('sha1');

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router


//Instructions serveur à effectuer lors d'une requête GET avec action "/login"
router.post('/', function (request, response, next) 
{
    var log = request.body.login;		//Récupération variable "login" de la requête GET
	var pass = request.body.password;	//Récupération variable "password" de la requête GET
    console.log('Parameters: login -> ' + log + ", password -> " + pass)	//Affichage console serveur
    // response.send('You are logged in');	//Réponse serveur =  message vers navigateur
    
    // vérification des informations de login auprès de la base postgresql
    sql = "select * from fredouil.users where identifiant like '" + log + "';";
    // instance de connexion avec toutes les informations de la BD
    var pool = new pgClient.Pool(
        {
            user: 'uapv1603044', 
            host: '192.168.2.130', 
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
        client.query(sql, function(err, result)
        {
            var responseData = {};

            if(err)
            {
                console.log('Erreur d’exécution de la requete' + err.stack);
            }
            else if((result.rows[0] != null) && (result.rows[0].motpasse == sha1(pass))) //Verification utilisateur trouvé et mdp
            {
                // request.session.isConnected = true;
                // responseData.data=result.rows[0].nom;
                session.setUser();
                responseData.statusMsg = 'Connexion réussie : bonjour ' + result.rows[0].prenom;
            }
            else
            {
                console.log('Connexion échouée : informations de connexion incorrecte');
                responseData.statusMsg='Connexion échouée : informations de connexion incorrecte';
            }

            response.send(responseData.statusMsg);
        })

        client.release(); // connexion libérée    
    })
    
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier login.js est importé