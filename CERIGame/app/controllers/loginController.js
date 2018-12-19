/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - Service authentification
 */
function loginController($scope, auth)
{
    $scope.login = null;
    $scope.password = null;

    $scope.formLogin = function()
    {
        auth.logIn($scope.login, $scope.password)
        .then(function()
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
        
        //document.getElementById("bandeau").innerHTML = "Utilisateur connecté. Bienvenue.\nDernière connexion: " + lastConnectReadable + "\n";   //Alternative
        return "Utilisateur connecté. Bienvenue.\nDernière connexion: " + lastConnectReadable + "\n";
    };
};