/**
 * Contrôleur de profil
 * @param {?} $scope - Variable de contexte
 * @param {*} user - Service utilisateur
 * @param {*} localStorage - Service stockage local
 */
function userController($scope, user)
{
    $scope.userS = user;    //Référence à user (userService.js)

    $scope.getId = function()
    {
        return user.getCurUser().id;
    }

    user.getChallengeList($scope.getId());
    user.getMedailles($scope.getId());

    $scope.getUserProfile = function(id)
    {
        user.getUser(id)
        .then(function(response)
        {
            $scope.user = response.data;
        });
    };
    $scope.getUserProfile($scope.getId());

    $scope.getAllUsers = function()
    {
        user.getUserList();
    };

    $scope.toggleProfilDisplay = function()
    {
        $scope.showProfil = !$scope.showProfil;
    }

    $scope.modifProfil = function(id, avatar, identifiant, prenom, nom)
    {
        user.updateProfil(id, avatar, identifiant, prenom, nom)
    };

    $scope.hideInteract = function()
    {
        $scope.showInteract = false;
    };
};