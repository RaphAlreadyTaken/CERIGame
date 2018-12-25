/**
 * Contrôleur de profil
 * @param {?} $scope - Variable de contexte
 * @param {*} user - Service utilisateur
 * @param {*} localStorage - Service stockage local
 */
function userController($scope, $rootScope, user, localStorage, defi)
{
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

    $scope.getAllUsers = function()
    {
        user.getAllUsers()
        .then(function(response)
        {
            $scope.userList = response.data;
        });
    };
    $scope.getAllUsers();

    $scope.toggleProfilDisplay = function()
    {
        $scope.showProfil = !$scope.showProfil;
    }

    $scope.toggleDefiOpt = function()
    {
        $scope.displayChallengers = !$scope.displayChallengers;
        $scope.challengeSent = true;
    }

    this.getId = function()
    {
        return userId;
    }

    $scope.modifProfil = function(id, avatar, identifiant, prenom, nom)
    {
        user.updateProfil(id, avatar, identifiant, prenom, nom)
    };

    $scope.getAllDefis = function()
    {
        defi.getChallengeList(userId)
        .then(function(response)
        {
            $rootScope.allDefis = response.data;
        })
    };
    $scope.getAllDefis();

    $scope.hideInteract = function()
    {
        $scope.showInteract = false;
    };
};