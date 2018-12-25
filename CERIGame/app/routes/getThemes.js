
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
            dbo.collection("quizz").find({}, {projection: {thème:1, _id:0}}).toArray(function(err,arrayResult) //Récupération de tous les thèmes
            {
                if(err)
                {
                    return console.log('Erreur conversion données mongo');                         
                }
                else
                {
                    var arrayReturn = [];
                    var i;
                    for(i=0; i<arrayResult.length; ++i) //On ne conserve que les thèmes
                    {
                        arrayReturn.push({name: arrayResult[i]['thème'], value: arrayResult[i]['thème']});
                    }
                    
                    mongoClient.close();
                    response.send(arrayReturn);
                }
            });
        }
    });
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier getThemes.js est importé
