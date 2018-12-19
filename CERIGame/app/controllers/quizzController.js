/**
 * Contrôleur de quizz
 * @param {?} $scope - Variable de contexte
 * @param {*} quizz - Service quizz
 */
function quizzController($scope, $interval, quizz, histo, localStorage)
{
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
            document.getElementById("question" + 0).style.display = "initial";
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
    }

    $scope.storeResult = function(bilan)
    {
        var infoToSave = {};
        var userTemp = JSON.parse(localStorage.getItem('sessionUser'));

        infoToSave['id_users'] = userTemp['id'];
        infoToSave['nbreponse'] = nbOkRep;
        infoToSave['temps'] = sCpt;
        infoToSave['score'] = $scope.bilan['score'];

        histo.saveResult(infoToSave)
        .then(function()
        {
            $interval.cancel(mnome);
        })
    }
};