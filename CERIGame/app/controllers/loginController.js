/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - service authentification
 */
function loginController($scope, auth)
{
    $scope.username = null;
    $scope.password = null;

    $scope.login = function()
    {
        auth.logIn($scope.username, $scope.password)
        .then(function(data)
        {
            alert('isLoggedIn: ' + auth.isLoggedIn());
            $scope.bandeauDisplay('Connexion réussie');
        })
    };
};