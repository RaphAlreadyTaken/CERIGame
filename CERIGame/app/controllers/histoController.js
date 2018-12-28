/**
 * Contrôleur d'historique
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function histoController($scope, histo)
{
    $scope.histoS = histo;    //Référence à histoService

    $scope.topTen = function()
    {
        histo.getTop10();
    };

    $scope.userHisto = function(id)
    {
        histo.getHisto(id);
    };
};