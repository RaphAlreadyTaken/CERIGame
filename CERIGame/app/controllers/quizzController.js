/**
 * Contrôleur de quizz
 * @param {?} $scope - Variable de contexte
 * @param {*} quizz - Service quizz
 */
function quizzController($scope, quizz)
{
    console.log("Checking quizz controller");

    $scope.obtainQuestions = function()
    {
        $scope.question = quizz.getQuestion();
    };
};