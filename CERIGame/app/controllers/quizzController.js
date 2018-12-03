/**
 * Contrôleur de quizz
 * @param {?} $scope - Variable de contexte
 * @param {*} quizz - Service quizz
 */
function quizzController($scope, $interval, quizz, user)
{
    console.log("Checking quizz controller");

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
            console.log($scope.questions);
        });
    };

    $scope.obtainThemes = function()
    {
        quizz.getThemes()
        .then(function(response)
        {
            $scope.themes = response.data;
        });
    };
    $scope.obtainThemes();

    $scope.showNextQuestion = function($index)
    {
        document.getElementById("question" + $index).style.display = "none";

        if (document.getElementById("question" + ($index + 1)) !== null)
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
            $scope.stopChrono = true;
        } 
    }

    $scope.answerSet = [];

    $scope.storeAnswer = function(prop)
    {
        $scope.answerSet.push(prop);
        console.log("%o", $scope.answerSet);
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

            $scope.bilan.push(value);
        }

        score = Math.floor((nbOkRep * 1398.2) / sCpt);
        $scope.bilan['score'] = score;
    }
};