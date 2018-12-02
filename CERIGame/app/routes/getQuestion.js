
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
        // var p1 = request.params.p1;
        // var p2 = request.params.p2;
        // Connexion MongoDB
        MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
        {
            console.log('WOW'); 
            if(err) 
            {
                return console.log('Erreur connexion base de données mongo'); 
            }
            if(mongoClient) 
            {
                // Exécution des requêtes
                var dbo = mongoClient.db("db");

                dbo.collection("quizz").findOne({thème: "Linux"}, {projection: {quizz: {$elemMatch: {id: 10}}}}, function(err,result)
                {
                    if(err)
                    {
                        return console.log('Erreur conversion données mongo');                         
                    }
                    console.log(result);
                    response.send(result);
                    mongoClient.close();
                });    
            }
        });        
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier index.js est importé



// app.get('/db/quizz/:p1/:p2', (request, response) => 
// {
// 	var p1 = request.params.p1;
// 	var p2 = request.params.p2;
// 	// Connexion MongoDB
// 	MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
// 	{
// 		if(err) 
// 		{
// 			return console.log('erreur connexion base de données'); 
// 		}
// 		if(mongoClient) 
// 		{
// 			// Exécution des requêtes
// db.quizz.find({thème: "Linux"}, {quizz: {$elemMatch: {id: 10}}});
		
// 		}
// 	});
// });