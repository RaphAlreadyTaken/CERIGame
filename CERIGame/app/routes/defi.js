/******** Chargement des Middleware
*
********/
const MongoClient = require('mongodb').MongoClient; //Définition middleware mongodb et instance MongoClient
const ObjectId = require('mongodb').ObjectID;   //ID des objets stockés dans les collections
const express = require('express'); //Import Express

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

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier getThemes.js est importé
