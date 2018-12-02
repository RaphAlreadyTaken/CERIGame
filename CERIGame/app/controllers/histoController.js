/**
 * Contrôleur d'historique
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function histoController($scope, histo, user)
{
    console.log("Checking histo controller");

    $scope.topTen = function()
    {
        console.log("calling controller topten");

        histo.getTop10()
        .then(function(response)
        {
            $scope.top10 = response.data.rows;
            console.log($scope.top10);
        });
    };
};