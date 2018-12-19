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
router.post('/', function (request, response)
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
    pool.connect(function(err, client) 
    {
        if(err) 
        {
            console.log('Error connecting to pg server' + err.stack);
        }
        else
        {
            console.log('Connection established with pg db server');
        }

        sql = "insert into fredouil.historique (id_users, date, nbreponse, temps, score) values (" + request.body.info['id_users'] + ", now()::timestamp(0), " + request.body.info['nbreponse'] + ", " + request.body.info['temps'] + ", " + request.body.info['score'] + ");"

        client.query(sql, function(err, result)
        {
            if (err)
            {
                console.log('Erreur d’exécution de la requête' + err.stack);
            }
            else
            {
                response.send(result);
            }
        });
        client.release();
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier saveResult.js est importé