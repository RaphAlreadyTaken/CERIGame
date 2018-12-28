/**
 * Contrôleur de quizz
 * @param {?} $scope - Variable de contexte
 * @param {*} quizz - Service quizz
 */
function quizzController($scope, $rootScope, $interval, defi, histo, quizz, user)
{
    $scope.quizzS = quizz;    //Référence à quizzService

    $scope.questionCount = [{
        name: '3',
        value: '3'
    },
    {
        name: '5',
        value: '5'
    },
    {
        name: '10',
        value: '10'
    }]

    $scope.difficulte = [{
        name: 'Facile',
        value: '2'
    },
    {
        name: 'Intermédiaire',
        value: '3'
    },
    {
        name: 'Difficile',
        value: '4'
    }]
    
    $scope.themes = [];
    $scope.themes.push({name: 'Théme aléatoire', value: 'randomTheme'});

    $scope.obtainThemes = function()
    {
        quizz.getThemes()
        .then(function(response)
        {
            $scope.themes = $scope.themes.concat(response.data);
        });
    };
    $scope.obtainThemes();
    
    $scope.chrono = function()
    {
        $scope.stopChrono = false;
        $scope.chrn = "00:00";    //Chronomètre
        sCpt = 0;  //Compteur de secondes

        mnome = $interval(function()
        {   
            if ($scope.stopChrono === true)
            {
                return;
            }

            sCpt += 1;
            $scope.chrn = (Math.floor(sCpt / 600) % 60) + "" + (Math.floor(sCpt / 60) % 10) + ":" + (Math.floor(sCpt / 10) % 6) + "" + sCpt % 10;

            if (sCpt == 3600)   //Dépassement d'1h
            {
                $scope.chrn = "u ded?";
                return;
            }
        }, 1000)
        
        clearInterval(mnome);
    }
    
    $scope.obtainQuestions = function(nbQ, theme, difficulte)
    {
        quizz.getQuestion(nbQ, theme, difficulte)
        .then(function(response)
        {
            $scope.questions = response.data; 
        });
    };

    $scope.showNextQuestion = function($index)
    {
        document.getElementById("question" + $index).style.display = "none";

        if ($index < $scope.questions.length - 1)
        {
            document.getElementById("question" + ($index + 1)).style.display = "initial";
        }
        else
        {
            $scope.endQuizz = true;
        }
    };

    $scope.checkQuizzStatus = function(propos, $index)
    {
        $scope.showNextQuestion($index);
        $scope.storeAnswer(propos);

        if ($scope.endQuizz === true)
        {
            $scope.resultatQuizz();
            $scope.recapQuizz = true;
            $scope.launchQuizz = false;
            document.getElementById("question0").style.display = "initial";
            $scope.storeResult($scope.bilan);
            $scope.stopChrono = true;
            $scope.answerSet = [];
        }
    }
    
    $scope.answerSet = [];
    
    $scope.storeAnswer = function(prop)
    {
        $scope.answerSet.push(prop);
    }
    
    $scope.resultatQuizz = function()
    {
        nbOkRep = 0;
        $scope.bilan = [];

        for (var i = 0; i < $scope.answerSet.length; i++)
        {
            value = {};
            value['question'] = $scope.questions[i]['question'];
            value['expRep'] = $scope.questions[i]['réponse'];

            if ($scope.answerSet[i] === $scope.questions[i]['réponse'])
            {
                value['givRep'] = "Bonne réponse";
                nbOkRep++;
            }
            else if ($scope.answerSet[i] === undefined)
            {
                value['givRep'] = "Aucune réponse";
            }
            else
            {
                value['givRep'] = "Mauvaise réponse";
            }

            value['anecdote'] = $scope.questions[i]['anecdote'];

            $scope.bilan.push(value);
        }

        score = Math.floor((nbOkRep * 1398.2) / sCpt);
        $scope.bilan['score'] = score;

        if ($scope.contextDefi === true)
        {
            var content = {'score_defiant': $scope.score_defiant, 'score_defie': $scope.bilan['score']};
            
            if (content.score_defie > content.score_defiant)
            {
                defi.result = "Defi gagné. Vous avez remporté la médaille!";
                defi.saveResult($scope.id_defiant, user.getCurUser().id);
                user.getMedailles(user.getCurUser().id);
            }
            else
            {
                defi.result = "Defi perdu. " + $scope.ident_defiant + " a remporté la médaille!";
                defi.saveResult($scope.id_defiant, $scope.id_defiant);
            }
        }
    }

    $scope.storeResult = function()
    {
        var infoToSave = {};

        infoToSave['id_users'] = user.getCurUser().id;
        infoToSave['nbreponse'] = nbOkRep;
        infoToSave['temps'] = sCpt;
        infoToSave['score'] = $scope.bilan['score'];

        histo.saveResult(infoToSave)
        .then(function()
        {
            histo.getHisto(infoToSave['id_users']);
            histo.getTop10();
            $interval.cancel(mnome);
        })
    }
    
    $scope.toggleDefiOpt = function()
    {
        $scope.displayChallengers = !$scope.displayChallengers;
        $scope.challengeSent = !$scope.challengeSent;
    }

    $rootScope.$on('quizzLaunch', function(event, defi)
    {
        $scope.contextDefi = true;
        $scope.questions = defi.quizz;
        $scope.id_defiant = defi.id_user_defiant;
        $scope.ident_defiant = defi.ident_user_defiant;
        $scope.score_defiant = defi.score_user_defiant;
        $scope.endQuizz = false;
        $scope.recapQuizz = false;
        $scope.launchQuizz = true;
        $scope.chrono();
    })
};
