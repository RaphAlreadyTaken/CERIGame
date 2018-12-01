/**
 * Contrôleur de quizz
 * @param {?} $scope - Variable de contexte
 * @param {*} user - Service utilisateur
 */
function quizzController($scope, user)
{
    console.log("Checking quizz controller");

    $scope.obtainQuestions = function()
    {
        // .logIn($scope.login, $scope.password)
        // .then(function()
        // {
        //     $scope.logged = auth.isLoggedIn();
        // })
    };
};