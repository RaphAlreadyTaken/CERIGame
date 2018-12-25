/**
 * Contrôleur de défi
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function defiController($scope, $rootScope, defi, socket, user)
{
    $scope.lancerDefi = function(id, ident, quizzQuestions, quizzScore)
    {
        defi.initDefi(id, ident, quizzQuestions, quizzScore)
        .then(function()
         {
            $scope.confirmDefi = socket.confirmDefi;
            $scope.displayConfirm = true;
         });
    };

    $scope.recupDefi = function(idDefi)
    {
        defi.getDefi(idDefi)
        .then(function(response)
        {
           return response.data;
        })
    }

    $scope.supprDefi = function(idDefi)
    {
        defi.deleteDefi(idDefi);
    };

    $scope.execDefi = function(defi)
    {
        $rootScope.$broadcast("quizzLaunch", defi);
    }

    $scope.execDefiFromNotif = function(idDefi)
    {
        defi.getDefi(idDefi)
        .then(function(response)
        {
            $scope.execDefi(response.data);
        });
    }

    $scope.$on('defiEval', function(event, content)
    {
        $scope.hideResult = false;

        if (content.score_defie > content.score_defiant)
        {
            $scope.defiResult = "Defi remporté. Vous avez remporté la médaille!";
            defi.saveResult(content.id_defiant, user.getCurUser().id);
        }
        else
        {
            $scope.defiResult = "Defi perdu. " + content.ident_defiant + " a remporté la médaille!";
            defi.saveResult(content.id_defiant, content.id_defiant);
        }      
    });

    $scope.recupMedailles = function(id)
    {
        defi.getMedailles(id)
        .then(function(response)
        {
            $scope.nbMedailles = "Vous avez gagné " + response.data + " médaille";

            if (response.data > 1)
            {
                $scope.nbMedailles += "s";
            }
        });
    };
    $scope.recupMedailles(user.getCurUser().id);
};