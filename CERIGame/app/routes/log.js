/******** Chargement des Middleware
*
********/
const express = require('express'); //Import Express
const pgClient = require('pg'); // définit le middleware pg
const sha1 = require('sha1');
var path = require('path'); //Import path

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router

//Requête POST avec action "/log/login" => connexion de l'utilisateur
router.post('/login', function (request, response) 
{
    var log = request.body.login;		//Récupération variable "login" de la requête POST
    var pass = request.body.password;	//Récupération variable "password" de la requête POST
    
    //Vérification des informations de login auprès de la base postgresql
    var sql = "select * from fredouil.users where identifiant like '" + log + "';";

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
            var responseData = {};  //Array retour
            
            if(err)
            {
                console.log('Erreur d’exécution de la requête: ' + err.stack);
            }
            else if((result.rows[0] != null) && (result.rows[0].motpasse == sha1(pass)))    //Verification utilisateur trouvé et mdp
            {
                if (result.rows[0].statut == 0) //Nouvelle connexion
                {
                    responseData.data = {}; //Sous-array retour
                
                    //Stockage données session (pour création ultérieure du localStorage)
                    responseData.data['ident'] = result.rows[0].identifiant;
                    responseData.data['nom'] = result.rows[0].nom;
                    responseData.data['prenom'] = result.rows[0].prenom;
                    responseData.data['date'] = new Date();
                    responseData.data['id'] = result.rows[0].id;
                    
                    //Modification du statut de connexion
                    sql = "update fredouil.users set statut = 1 where id = " + result.rows[0].id + ";";

                    //Exécution de la requête SQL et traitement du résultat
                    client.query(sql, function(err)
                    {
                        if(err)
                        {
                            console.log('Erreur d’exécution de la requête: ' + err.stack);
                        }
                        else
                        {
                            console.log("Statut connecté mis à jour: 1");
                        }
                    });

                    request.session.connected = true;

                    responseData.statusResp = true;
                    responseData.statusMsg = 'Connexion réussie : bonjour ' + result.rows[0].prenom;
                    console.log(responseData.statusMsg);
                }
                else    //Utilisateur déjà connecté
                {
                    responseData.statusResp = false;
                    responseData.statusMsg='Connexion échouée : utilisateur déjà connecté';
                    console.log(responseData.statusMsg);
                }
            }
            else
            {
                responseData.statusResp = false;
                responseData.statusMsg='Connexion échouée : informations de connexion incorrectes';
                console.log(responseData.statusMsg);
            }

            response.send(responseData);
        })

        client.release();   //Connexion libérée
    })
});

//Requête POST avec action "/log/logout" => déconnexion de l'utilisateur
router.post('/logout', function (request, response) 
{
    //Modification du statut de connexion
    var sql = "update fredouil.users set statut = 0 where id = " + request.body.id + ";";

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
            client.query(sql, function(err)
            {
                if (err)
                {
                    console.log('Erreur d’exécution de la requête: ' + err.stack);
                }
                else
                {
                    console.log("Statut connecté mis à jour: 0");
                }
            });

            client.release();   //Connexion libérée
        });

    request.session.connected = false;
    response.sendFile(path.resolve('./CERIGame/login.html'));	//Page login;
});

//Requête POST avec action "/log/checkLog" => statut de connexion de l'utilisateur
router.post('/checklog', function (request, response)
{
    //Vérification du statut de connexion dans la base postgresql
    var sql = "select statut from fredouil.users where id = " + request.body.id + ";";
    
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
                response.send(result);
            }
        });

        client.release();   //Connexion libérée
    });
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier log.js est importé
