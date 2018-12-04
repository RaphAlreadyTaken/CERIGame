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

//Instructions serveur à effectuer lors d'une requête POST avec action "/updateProfil"
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
        
        var sql = "";

        for (var arg in request.body)
        {
            if (arg !== 'id' && request.body[arg] !== null)
            {
                sql = "update fredouil.users set " + arg + " = '" + request.body[arg] + "' where id = " + request.body['id'] + ";";
                console.log(sql);
            }


        }

        client.query(sql, function(err, result)
        {
            if (err)
            {
                console.log('Erreur d’exécution de la requête' + err.stack);
            }
            else
            {
                response.send(result.rows[0]);
            }
        });
        client.release();
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier updateProfil.js est importé