/**
 * Contrôleur d'historique
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function histoController($scope, histo)
{
    $scope.topTen = function()
    {
        histo.getTop10()
        .then(function(response)
        {
            $scope.top10 = response.data.rows;
        });
    };

    $scope.userHisto = function(id)
    {
        histo.getHisto(id)
        .then(function(response)
        {
            $scope.histoUser = response.data.rows;
        });
    };
};