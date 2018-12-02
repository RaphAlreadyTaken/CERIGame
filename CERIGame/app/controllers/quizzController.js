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

    $scope.chrono = function()
    {
        $scope.chrn = "00:00";    //Chronomètre
        sCpt = 0;  //Compteur de secondes

        var mnome = $interval(function()
        {
            sCpt += 1;
    
            $scope.chrn = (Math.floor(sCpt / 600) % 60) + "" + (Math.floor(sCpt / 60) % 10) + ":" + (Math.floor(sCpt / 10) % 6) + "" + sCpt % 10;
        }, 1000)
        
        if (sCpt == 3600)   //Dépassement d'1h
        {
            $scope.chrn = "u ded?";
            clearInterval(mnome);
        }

    }
    
    $scope.obtainQuestions = function(nbQ, theme, difficulte)
    {
        quizz.getQuestion(nbQ, theme, difficulte)
        .then(function(response)
        {
            $scope.question = response.data;
            
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
};