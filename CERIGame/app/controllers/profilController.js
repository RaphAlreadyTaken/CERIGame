/**
 * Contrôleur de profil
 * @param {?} $scope - Variable de contexte
 * @param {*} user - Service utilisateur
 * @param {*} localStorage - Service stockage local
 */
function profilController($scope, user, localStorage)
{
    console.log("Checking profile controller");

    $scope.getProfil = function()
    {
        var userData = JSON.parse(localStorage.getItem("sessionUser"));
        var userId = userData['id'];

        user.getUser(userId)
        .then(function(responseData)
        {
            return responseData['identifiant'] + responseData['nom'] + " " + responseData['prenom'] + " " + responseData['avatar'] + responseData['statut'];
        });
    }
};