/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - Service authentification
 */
function loginController($scope, auth)
{
    console.log("Checking controller");

    $scope.login = null;
    $scope.password = null;
    $scope.ls = null;

    $scope.formLogin = function()
    {
        if (localStorage !== null)
        {
            $scope.ls = JSON.parse(localStorage.getItem("sessionUser"));
        }

        auth.logIn($scope.login, $scope.password, $scope.ls)
        .then(function(data)
        {
            $scope.logged = auth.isLoggedIn();
        })
    };

    $scope.logOut = function()
    {
        auth.logOut($scope);
        $scope.logged = auth.isLoggedIn();
    };

    $scope.bandeau = function()
    {
        var userInfo = JSON.parse(localStorage.getItem("sessionUser"));
        var lastConnect = new Date(userInfo["date"]);
        var lastConnectReadable = lastConnect.getDate() + "/" + (lastConnect.getMonth() + 1) + "/" + lastConnect.getFullYear() + " à " + lastConnect.getHours() + "h" + lastConnect.getMinutes();
        
        return "Utilisateur connecté. Bienvenue.\nDernière connexion: " + lastConnectReadable + "\n";
    };
};