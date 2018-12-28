//Server

/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Instructions serveur à effectuer lors d'une requête GET avec action "/getTop10"
router.get('/', function (request, response, next)
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
        
        //Pour avoir l'identifiant au lieu de l'id
        sql = "select identifiant, sum(score) from fredouil.historique inner join fredouil.users on (fredouil.users.id = fredouil.historique.id_users) group by identifiant order by sum(score) desc limit 10;"
    
        // sql = "select id_users, sum(score) from fredouil.historique group by id_users order by sum(score) desc limit 10;";
        
        client.query(sql, function(err, result)
        {
            if (err)
            {
                console.log('Erreur d’exécution de la requête' + err.stack);
            }
            else
            {
                response.send(result.rows);
            }
        });
        client.release();
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier index.js est importé