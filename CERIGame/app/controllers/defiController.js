/**
 * Contrôleur de défi
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function defiController($scope, $rootScope, defi, socket)
{
    $scope.lancerDefi = function(id, ident, quizzQuestions, quizzScore)
    {
        defi.initDefi(id, ident, quizzQuestions, quizzScore)
        .then(function()
         {
            $scope.confirmDefi = socket.confirmDefi;
            $scope.displayConfirm = true;
         });
    };

    $scope.supprDefi = function(idDefi)
    {
        defi.deleteDefi(idDefi);
    };

    $rootScope.execDefi = function(quizz)
    {
        console.log("rootscope emission");
        $rootScope.$broadcast("quizzLaunch", quizz);
    }
};