/******** Chargement des Middleware
*
********/
const MongoClient = require('mongodb').MongoClient; //Définition middleware mongodb et instance MongoClient
const ObjectId = require('mongodb').ObjectID;   //ID des objets stockés dans les collections
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router
var dsnMongoDB = "mongodb://127.0.0.1:27017/";	//Connexion base mongodb

//Requête POST avec action "/defi/defiList" => liste des défis lancés à l'utilisateur
router.post('/defiList', function(request, response)
{
    //Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err) 
        {
            return console.log('Erreur connexion base de données mongo'); 
        }

        if(mongoClient) 
        {
            //Base à utiliser
            var dbo = mongoClient.db("db");

            //Récupération de tous les défis lancés à l'user (selon son id)
            dbo.collection("defi").find({'id_user_defie': request.body.id}).toArray(function(err, arrayResult)
            {
                if (err)
                {
                    return console.log('Erreur conversion données mongo');
                }
                else
                {
                    mongoClient.close();    //Connexion libérée
                    response.send(arrayResult);
                }
            });
        }
    });
});

//Requête POST avec action "/defi/getDefi" => défi
router.post('/getDefi', function(request, response)
{
    //Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err)
        {
            return console.log('Erreur connexion base de données mongo');
        }

        if(mongoClient)
        {
            //Base à utiliser
            var dbo = mongoClient.db("db");

            //Récupération du défi (selon son id)
            dbo.collection("defi").findOne({'_id': ObjectId(request.body.idDefi)}, function(err, result)
            {
                if (err)
                {
                    return console.log('Erreur conversion données mongo');
                }
                
                else
                {
                    mongoClient.close();    //Connexion libérée
                    response.send(result);
                }
            });
        }
    });
});

//Requête POST avec action "/defi/initDefi" => insertion du défi dans base + notification
router.post('/initDefi', function(request, response)
{
    //Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err)
        {
            return console.log('Erreur connexion base de données mongo');
        }

        if(mongoClient)
        {
            //Base à utiliser
            var dbo = mongoClient.db("db");

            //Insertion dans base
            dbo.collection("defi").insertOne(request.body, function(err)
            {
                if (err)
                {
                    return console.log('Erreur conversion données mongo');
                }
                else
                {
                    mongoClient.close();
                    response.send({'message': "Défi envoyé", 'idDefi': request.body._id});
                }
            });
        }
    });
});

//Requête POST avec action "/defi/deleteDefi" => suppression du défi + nouvelle liste de défis
router.post('/deleteDefi', function(request, response)
{
    //Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient)
    {
        if(err)
        {
            return console.log('Erreur connexion base de données mongo'); 
        }

        if(mongoClient)
        {
            //Base à utiliser
            var dbo = mongoClient.db("db");

            //Suppression du défi dans la base (selon son id)
            dbo.collection("defi").findOneAndDelete({'_id': ObjectId(request.body.idDefi)}, function(err)
            {
                if (err)
                {
                    return console.log('Erreur conversion données mongo');
                }
            });

            //Récupération de tous les quizz lancés à l'user (selon son id)
            dbo.collection("defi").find({'id_user_defie': request.body.id}).toArray(function(err, arrayResult)
            {
                if (err)
                {
                    return console.log('Erreur conversion données mongo');
                }
                else
                {
                    mongoClient.close();
                    response.send(arrayResult);
                }
            });
        }
    });
});

//Requête POST avec action "/defi/saveResultDefi" => sauvegarde d'un résultat de défi
router.post('/saveResultDefi', function (request, response)
{
    //Insertion résultat défi
    var sql = "insert into fredouil.hist_defi (id_users_defiant, id_users_defie, id_users_gagnant, date) values (" + request.body.id_users_defiant + ", " + request.body.id_users_defie + ", " + request.body.id_users_gagnant + ", now()::timestamp(0))";

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
                return console.log('Erreur d’exécution de la requête: ' + err.stack);
            }
            else
            {
                response.send(result);
            }
        });

        client.release();   //Connexion libérée
    });
});

//Requête POST avec action "/defi/getMedailles" => liste des médailles gagnées par l'utilisateur
router.post('/getMedailles', function(request, response)
{
    //Récupération identifiant de l'utilisateur battu dans chaque défi gagné par l'utilisatuer
    var sql = "select fredouil.users.identifiant as opponent from fredouil.hist_defi inner join fredouil.users on (case when id_users_defie != id_users_gagnant then id_users_defie else id_users_defiant end = fredouil.users.id) where id_users_gagnant = " + request.body.id + ";";

    //Instance de connexion avec toutes les informations de la BD
    var pool = new pgClient.Pool(
    {
        user: 'uapv1603044',
        host: '192.168.2.130',
        database: 'etd',
        password: 'LZJIMq',
        port: 5432
    });

    //Connexion à la base4
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

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier defi.js est importé
