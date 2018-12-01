
/******** Chargement des Middleware
*
********/
const MongoClient = require('mongodb').MongoClient; //Définition middleware mongodb et instance MongoClient

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router
var dsnMongoDB = "mongodb://127.0.0.1:27017/db";	//Connexion base mongodb



router.get('/', function(request, response)
{
        var p1 = request.params.p1;
        var p2 = request.params.p2;
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
                mongoClient.collection("quizz").find({thème: "Linux"}, {quizz: {$elemMatch: {id: 10}}}).toArray(function(err,result)
                {
                    if(err)
                    {
                        return console.log('Erreur conversion données mongo');                         
                    }
                    console.log(result);
                    mongoClient.close();
                });    
            }
        });
});
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