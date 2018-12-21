/**
 * Contrôleur de défi
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function defiController($scope, defi, socket)
{
    $scope.lancerDefi = function(id, quizzQuestions, quizzScore)
    {
        defi.initDefi(id, quizzQuestions, quizzScore)
        .then(function()
         {
            $scope.confirmDefi = socket.confirmDefi;
            $scope.displayConfirm = true;
         });
    };
};