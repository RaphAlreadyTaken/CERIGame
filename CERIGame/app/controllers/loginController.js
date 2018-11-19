/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - Service authentification
 */
function loginController($scope, auth)
{
    if (auth.isLoggedIn())
    {
        alert("Vous êtes connecté, espèce de con");
        $scope.logged = true;
    }

    $scope.login = null;
    $scope.password = null;

    if (localStorage !== null)
    {
        $scope.ls = JSON.parse(localStorage.getItem("sessionUser"));
    }

    //console.log("local: " + $scope.ls['id']);

    $scope.formLogin = function()
    {
        auth.logIn($scope.login, $scope.password, $scope.ls)
        .then(function(data)
        {
            if (auth.isLoggedIn())
            {
                $scope.logged = true;
                console.log(auth.isLoggedIn());
            }
            else
            {
                $scope.logged = false;
            }
        });
    };

    $scope.logOut = function()
    {
        auth.logOut($scope);
    };
};