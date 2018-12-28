/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Requête POST avec action "/user/getUser" => informations de l'utilisateur
router.post('/getUser', function (request, response)
{
    //Récupération de l'utilisateur (selon son id)
    var sql = "select * from fredouil.users where id = " + request.body.id + ";";

    //Instance de connexion avec toutes les informations de la BD
    var pool = new pgClient.Pool(
    {
        user: 'uapv1603044',
        host: '192.168.2.130',
        database: 'etd',
        password: 'LZJIMq',
        port: 5432
    });
    
    //Connexion à la base
    pool.connect(function(err, client, done) 
    {
        if(err) 
        {
            console.log('Error connecting to pg server: ' + err.stack);
        }
        else
        {
            console.log('Connection established with pg db server');
        }
        
        //Exécution de la requête SQL et traitement du résultat
        client.query(sql, function(err, result)
        {
            if (err)
            {
                console.log('Erreur d’exécution de la requête: ' + err.stack);
            }
            else
            {
                response.send(result.rows[0]);
            }
        });

        client.release();   //Connexion libérée
    })
});

//Requête GET avec action "/user/getAllUsers" => utilisateurs
router.get('/getAllUsers', function (request, response)
{
    //Récupération de toutes les entrées de la table users
    var sql = "select * from fredouil.users";

    //Instance de connexion avec toutes les informations de la BD
    var pool = new pgClient.Pool(
    {
        user: 'uapv1603044',
        host: '192.168.2.130',
        database: 'etd',
        password: 'LZJIMq',
        port: 5432
    });
    
    //Connexion à la base
    pool.connect(function(err, client, done) 
    {
        if(err) 
        {
            console.log('Error connecting to pg server: ' + err.stack);
        }
        else
        {
            console.log('Connection established with pg db server');
        }
        
        //Exécution de la requête SQL et traitement du résultat
        client.query(sql, function(err, result)
        {
            if (err)
            {
                console.log('Erreur d’exécution de la requête: ' + err.stack);
            }
            else
            {
                response.send(result.rows);
            }
        });

        client.release();   //Connexion libérée
    });
});

//Requête GET avec action "/user/getTop10" => 10 meilleurs utilisateurs
router.get('/getTop10', function (request, response)
{
    //Récupération des 10 scores les plus élevés
    var sql = "select identifiant, sum(score) from fredouil.historique inner join fredouil.users on (fredouil.users.id = fredouil.historique.id_users) group by identifiant order by sum(score) desc limit 10;"

    //Instance de connexion avec toutes les informations de la BD
    var pool = new pgClient.Pool(
    {
        user: 'uapv1603044',
        host: '192.168.2.130',
        database: 'etd',
        password: 'LZJIMq',
        port: 5432
    });
    
    //Connexion à la base
    pool.connect(function(err, client, done) 
    {
        if(err) 
        {
            console.log('Error connecting to pg server: ' + err.stack);
        }
        else
        {
            console.log('Connection established with pg db server');
        }
        
        //Exécution de la requête SQL et traitement du résultat
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

        client.release();   //Connexion libérée
    })
});

//Requête POST avec action "/user/updateAvatar" => modification de l'avatar de l'utilisateur
router.post('/updateAvatar', function (request, response)
{
    //Modification de l'avatar pour un utilisateur (avec son id)
    var sql = "update fredouil.users set avatar = '" + request.body.avatar + "' where id = " + request.body.id + ";";

    var pool = new pgClient.Pool(
    {
        user: 'uapv1603044',
        host: '192.168.2.130',
        database: 'etd',
        password: 'LZJIMq',
        port: 5432
    });
    
    //Connexion à la base
    pool.connect(function(err, client) 
    {
        if(err) 
        {
            console.log('Error connecting to pg server: ' + err.stack);
        }
        else
        {
            console.log('Connection established with pg db server');
        }

        //Exécution de la requête SQL et traitement du résultat
        client.query(sql, function(err, result)
        {
            if (err)
            {
                console.log('Erreur d’exécution de la requête: ' + err.stack);
            }
            else
            {
                response.send(request.body.avatar);
            }
        });
        client.release();   //Connexion libérée
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier user.js est importé
