/**
 * Contrôleur de quizz
 * @param {?} $scope - Variable de contexte
 * @param {*} quizz - Service quizz
 */
function quizzController($scope, quizz)
{
    console.log("Checking quizz controller");

    $scope.obtainQuestions = function(nbQ, theme)
    {
        quizz.getQuestion(nbQ, theme)
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