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
            if (id === $scope.userS.getCurUser().id)
            {
                $scope.userS.avatar = response.avatar;
            }

            $scope.user = response;
        });
    };
    $scope.getUserProfile($scope.getId())

    $scope.getAllUsers = function()
    {
        user.getUserList();
    };

    $scope.toggleProfilDisplay = function()
    {
        $scope.showProfil = !$scope.showProfil;
    }

    $scope.modifAvatar = function(id, avatar)
    {
        user.updateAvatar(id, avatar)
    };

    $scope.hideInteract = function()
    {
        $scope.showInteract = false;
    };
};