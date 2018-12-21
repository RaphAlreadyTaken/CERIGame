/******** Chargement des Middleware
*
********/
const MongoClient = require('mongodb').MongoClient; //Définition middleware mongodb et instance MongoClient
const express = require('express'); //Import Express

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router
var dsnMongoDB = "mongodb://127.0.0.1:27017/";	//Connexion base mongodb

router.post('/', function(request, response)
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
            dbo.collection("defi").insert(request.body); //Insertion dans base
            response.send("Défi inséré dans base de données mongo");
        }
    });        
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier getThemes.js est importé
