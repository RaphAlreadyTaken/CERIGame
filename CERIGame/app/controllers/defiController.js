/**
 * Contrôleur de défi
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function defiController($scope, defi, socket)
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
};