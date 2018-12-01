/**
 * Contrôleur de profil
 * @param {?} $scope - Variable de contexte
 * @param {*} user - Service utilisateur
 * @param {*} localStorage - Service stockage local
 */
function userController($scope, user, localStorage)
{
    console.log("Checking user controller");

    var userData = JSON.parse(localStorage.getItem("sessionUser"));
    var userId = userData['id'];

    $scope.getUserProfile = function(id)
    {
        user.getUser(id)
        .then(function(response)
        {
            $scope.user = response.data;
        });
    };
    $scope.getUserProfile(userId);

    $scope.getAvailableUsers = function()
    {
        user.getAvailableUsers()
        .then(function(response)
        {
            $scope.userList = response.data;
        });
    };
    $scope.getAvailableUsers();

    $scope.toggleProfilDisplay = function()
    {
        $scope.showProfil = !$scope.showProfil;
    }

    $scope.modifProfil = function(id, avatar, identifiant, prenom, nom)
    {
        user.updateProfil(id, avatar, identifiant, prenom, nom)
    };
};