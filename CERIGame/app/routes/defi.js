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

router.post('/defiList', function(request, response)
{
    // Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err) 
        {
            return console.log('Erreur connexion base de données mongo'); 
        }

        if(mongoClient) 
        {
            // Exécution des requêtes
            var dbo = mongoClient.db("db"); //Base à utiliser

            dbo.collection("defi").find({'id_user_defie': request.body.id}).toArray(function(err, arrayResult) //Récupération de tous les quizz lancés à l'user (selon son id)
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

router.post('/getDefi', function(request, response)
{
    // Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err)
        {
            return console.log('Erreur connexion base de données mongo');
        }

        if(mongoClient)
        {
            // Exécution des requêtes
            var dbo = mongoClient.db("db"); //Base à utiliser
            dbo.collection("defi").findOne({'_id': ObjectId(request.body.idDefi)}, function(err, result) //Insertion dans base
            {
                if (err)
                {
                    console.log(err);
                }
                
                else
                {
                    console.log("%o", result);
                    mongoClient.close();
                    response.send(result);
                }
            });
        }
    });
});

router.post('/initDefi', function(request, response)
{
    // Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err)
        {
            return console.log('Erreur connexion base de données mongo');
        }

        if(mongoClient)
        {
            // Exécution des requêtes
            var dbo = mongoClient.db("db"); //Base à utiliser
            dbo.collection("defi").insertOne(request.body, function(err) //Insertion dans base
            {
                if (err)
                {
                    console.log(err);
                }
                
                else
                {
                    var idDefi;
                    idDefi = request.body._id;
                    mongoClient.close();
                    response.send({'message': "Défi envoyé", 'idDefi': idDefi});
                }
            });
        }
    });
});

router.post('/deleteDefi', function(request, response)
{
    console.log("%o", request.body);

    // Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient)
    {
        if(err)
        {
            return console.log('Erreur connexion base de données mongo'); 
        }

        if(mongoClient)
        {
            // Exécution des requêtes
            var dbo = mongoClient.db("db"); //Base à utiliser
            dbo.collection("defi").findOneAndDelete({'_id': ObjectId(request.body.idDefi)}); //Insertion dans base

            MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient)
            {
                if(err)
                {
                    return console.log('Erreur connexion base de données mongo');
                }

                if(mongoClient)
                {
                    // Exécution des requêtes
                    dbo.collection("defi").findOneAndDelete({'_id': ObjectId(request.body.idDefi)}); //Insertion dans base

                    dbo.collection("defi").find({'id_user_defie': request.body.id}).toArray(function(err, arrayResult) //Récupération de tous les quizz lancés à l'user (selon son id)
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
        }
    });
});

router.post('/saveResult', function (request, response, next)
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
        
        sql = "insert into fredouil.hist_defi (id_users_defiant, id_users_defie, id_users_gagnant, date) values (" + request.body.id_users_defiant + ", " + request.body.id_users_defie + ", " + request.body.id_users_gagnant + ", now()::timestamp(0))";

        console.log(sql);
        
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
    });
});

router.post('/getMedailles', function(request, response)
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
            
            sql = "select count(id_users_gagnant) from fredouil.hist_defi where id_users_gagnant = " + request.body.id + " group by id_users_gagnant;";
    
            console.log(sql);
            
            client.query(sql, function(err, result)
            {
                if (err)
                {
                    console.log('Erreur d’exécution de la requête' + err.stack);
                }
                else
                {
                    response.send(result.rows[0].count);
                }
            });
    
            client.release();
        });
});


/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier getThemes.js est importé
