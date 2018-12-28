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

//Requête POST avec action "/quizz/getThemes" => thèmes de quizz
router.post('/getThemes', function(request, response)
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

            //Récupération des thèmes
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

                    for(i = 0; i < arrayResult.length; ++i) //On ne conserve que les thèmes
                    {
                        arrayReturn.push({name: arrayResult[i]['thème'], value: arrayResult[i]['thème']});
                    }
                    
                    mongoClient.close();    //Connexion libérée
                    response.send(arrayReturn);
                }
            });
        }
    });
});

//Requête POST avec action "/quizz/getQuestions" => questions du quizz
router.post('/getQuestions', function(request, response)
{   
    var nbQuestions = parseInt(request.body.nbQuestions, 10); //Récupèration du nombre de questions souhaitées
    var theme =  request.body.theme; //Récupération du thème souhaité
    var difficulte = parseInt(request.body.difficulte, 10); //Récupération de la difficulté souhaitée
    
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
            var dbo = mongoClient.db("db")

            //Si l'utilisateur a demandé un thème aléatoire
            if(theme == "randomTheme")
            {
                dbo.collection("quizz").find({}, {projection: {thème:1, _id:0}}).toArray(function(err,arrayThemes) //Récupération de tous les thèmes
                {
                    if(err)
                    {
                        return console.log('Erreur conversion données mongo');                         
                    }
                    else
                    {                        
                        var rand = Math.floor(Math.random() * Math.floor(arrayThemes.length)); //On choisit un thème au hasard parmis ceux disponibles
                        theme = arrayThemes[rand]['thème'];

                        //Récupération de toutes les infos du thème donné
                        dbo.collection("quizz").find({thème: theme}).toArray(function(err,arrayResult)
                        {
                            if(err)
                            {
                                return console.log('Erreur conversion données mongo');                         
                            }
                            else
                            {
                                var arrayQuestions = arrayResult[0].quizz; //Récupération des questions dans le résultat de la requête mongo
                                var arrayReturn = [];
                                var i;

                                for(i = 0; i < nbQuestions; ++i) //Pour garder le nombre de questions souhaitées
                                {
                                    var rand = Math.floor(Math.random() * Math.floor(arrayQuestions.length)); //On en choisit au hasard parmi toutes celles disponibles
                                    arrayReturn.push(arrayQuestions[rand]); //On l'ajoute au tableau de retour
                                    arrayQuestions.splice(rand, 1); //On la supprime de l'ancien tableau pour éviter les doublons

                                    while(arrayReturn[i]['propositions'].length > difficulte) //On retire un certain nombre de propositions en fonction de la difficulté choisie
                                    {
                                        var randProp = Math.floor(Math.random() * Math.floor(arrayReturn[i]['propositions'].length)); //On choisit une proposition au hasard parmi la liste

                                        if(arrayReturn[i]['propositions'][randProp] != arrayReturn[i]['réponse']) //Si elle n'est pas la bonne réponse
                                        { 
                                            arrayReturn[i]['propositions'].splice(randProp, 1); //Alors on la supprime
                                        }
                                    }
                                }

                                mongoClient.close();    //Connexion libérée
                                response.send(arrayReturn);
                            }
                        });
                     }
                });                            
            }

            //S'il a demandé un thème précis
            else
            {
                dbo.collection("quizz").find({thème: theme}/*, {projection: {quizz: {$elemMatch: {id: 10}}}}*/).toArray(function(err,arrayResult) //Récupération de toutes les infos du thème donné
                {
                    if(err)
                    {
                        return console.log('Erreur conversion données mongo');                         
                    }
                    else
                    {
                        var arrayQuestions = arrayResult[0].quizz; //Récupération des questions dans le résultat de la requête mongo
                        var arrayReturn = [];
                        var i;

                        for(i = 0; i < nbQuestions; ++i) //Pour garder le nombre de questions souhaitées
                        {
                            var rand = Math.floor(Math.random() * Math.floor(arrayQuestions.length)); //On en choisit au hasard parmi toutes celles disponibles
                            arrayReturn.push(arrayQuestions[rand]); //On l'ajoute au tableau de retour
                            arrayQuestions.splice(rand, 1); //On la supprime de l'ancien tableau pour éviter les doublons

                            while(arrayReturn[i]['propositions'].length > difficulte) //On retire un certain nombre de propositions en fonction de la difficulté choisie
                            {
                                var randProp = Math.floor(Math.random() * Math.floor(arrayReturn[i]['propositions'].length)); //On choisit une proposition au hasard parmi la liste

                                if(arrayReturn[i]['propositions'][randProp] != arrayReturn[i]['réponse']) //Si elle n'est pas la bonne réponse
                                { 
                                    arrayReturn[i]['propositions'].splice(randProp, 1); //Alors on la supprime
                                }
                            }
                        }
                        mongoClient.close();    //Connexion libérée
                        response.send(arrayReturn);
                    }
                });
            }
        }
    });
});

//Requête POST avec action "/quizz/saveResultQuizz" => sauvegarde d'un résultat de quizz
router.post('/saveResultQuizz', function (request, response)
{
    //Insertion résultat quizz
    var sql = "insert into fredouil.historique (id_users, date, nbreponse, temps, score) values (" + request.body.info['id_users'] + ", now()::timestamp(0), " + request.body.info['nbreponse'] + ", " + request.body.info['temps'] + ", " + request.body.info['score'] + ");"

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
                console.log('Erreur d’exécution de la requête' + err.stack);
            }
            else
            {
                response.send(result);
            }
        });

        client.release();   //Connexion libérée
    })
});

//Requête POST avec action "/quizz/getHisto" => historique de quizz
router.post('/getHisto', function (request, response)
{
    //Récupération de l'historique de quizz d'un utilisateur (selon son id)
    var sql = "select nbreponse, temps, score, date from fredouil.historique where id_users = " + request.body.id + ";";

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
    })
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier user.js est importé
