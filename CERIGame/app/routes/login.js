//Server

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

//Instructions serveur à effectuer lors d'une requête POST avec action "/login"
router.post('/', function (request, response, next) 
{
    var log = request.body.login;		//Récupération variable "login" de la requête POST
    var pass = request.body.password;	//Récupération variable "password" de la requête POST
    var ls = request.body.ls;

    // console.log('Parameters: login -> ' + log + ", password -> " + pass + ", id -> " + ls["id"] + ", date -> " + ls["date"])	//Affichage console serveur
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
                var responseData = {};  //Array retour
                
                if(err)
                {
                    console.log('Erreur d’exécution de la requête' + err.stack);
                }
                else if((result.rows[0] != null) && (result.rows[0].motpasse == sha1(pass))) //Verification utilisateur trouvé et mdp
                {
                    console.log("LocalStorage passed to login: " + ls);
                    if (request.session.connected === false)     //Nouvelle connexion
                    {
                        responseData.data = {}; //Sous-array retour
    
                        if (ls !== null)    //Si localStorage existe
                        {
                            //Récupération date localStorage
                            responseData.data['nom'] = ls['nom'];
                            responseData.data['prenom'] = ls['prenom'];
                            responseData.data['date'] = ls['date'];
                            console.log("ls not null: %o", responseData.data);
                        }
                        else                //Si localStorage n'existe pas
                        {
                            //Stockage données session (pour création ultérieure du localStorage)
                            responseData.data['nom'] = result.rows[0].nom;
                            responseData.data['prenom'] = result.rows[0].prenom;
                            responseData.data['date'] = new Date();
                            console.log("ls null: %o", responseData.data);
                        }
                        
                        request.session.connected = true;

                        responseData.statusResp = true;
                        responseData.statusMsg = 'Connexion réussie : bonjour ' + result.rows[0].prenom;
                        console.log(responseData.statusMsg);
                    }
                    else    //Utilisateur déjà connecté
                    {
                        responseData.statusResp = false;
                        responseData.statusMsg='Connexion échouée : utilisateur déjà connecté';
                        console.log(responseData.statusMsg);
                    }       
            }
            else
            {
                responseData.statusResp = false;
                responseData.statusMsg='Connexion échouée : informations de connexion incorrectes';
                console.log(responseData.statusMsg);
            }

            response.send(responseData);
        })

        client.release(); // connexion libérée    
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier login.js est importé