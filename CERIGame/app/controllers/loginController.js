/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - Service authentification
 */
function loginController($scope, auth)
{
    console.log("Checking controller");

    $scope.logged = auth.isLoggedIn();

    $scope.login = null;
    $scope.password = null;
    $scope.ls = null;

    $scope.formLogin = function()
    {
        if (localStorage !== null)
        {
            $scope.ls = JSON.parse(localStorage.getItem("sessionUser"));
            console.log("localStorage: %o", $scope.ls);
        }

        auth.logIn($scope.login, $scope.password, $scope.ls)
        .then(function(data)
        {
            $scope.logged = auth.isLoggedIn();
        });
    };

    $scope.logOut = function()
    {
        auth.logOut($scope);
        $scope.logged = auth.isLoggedIn();
    };
};