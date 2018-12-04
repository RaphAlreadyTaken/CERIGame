//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg
var path = require('path'); //Import path

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Instructions serveur à effectuer lors d'une requête POST avec action "/logout"
router.post('/', function (request, response, next) 
{    
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
            
            sql = "update fredouil.users set statut = 0 where id = " + request.body.id + ";";
            
            client.query(sql, function(err)
            {
                if (err)
                {
                    console.log('Erreur d’exécution de la requête' + err.stack);
                }
                else
                {
                    console.log("Statut connecté mis à jour: " + 0);
                }
            });

            client.release();
        });

    request.session.connected = false;
    response.sendFile(path.resolve('./CERIGame/login.html'));	//Page login;
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier logout.js est importé