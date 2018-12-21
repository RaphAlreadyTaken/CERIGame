/**
 * Contrôleur de défi
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function defiController($scope, defi)
{
    $scope.lancerDefi = function(id, quizzInfo)
    {
        defi.initDefi(id, quizzInfo)
        .then(function(response)
        {
            console.log(response.data);
        });
    }
};