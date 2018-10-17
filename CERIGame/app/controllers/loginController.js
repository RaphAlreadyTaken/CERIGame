/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - service authentification
 */
function loginController($scope, auth)
{
    $scope.login = null;
    $scope.password = null;

    $scope.formLogin = function()
    {
        auth.logIn($scope.login, $scope.password)
        .then(function(data)
        {
            alert('isLoggedIn: ' + auth.isLoggedIn());
            //$scope.bandeauDisplay('Connexion réussie');
        });
    };

    $scope.createUser = function()
    {
        session.setUser()
    }
};