/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function socketController($scope, socket)
{
   socket.on('notification', function(data)
   {
       $scope.bandeauDisplay('Message du serveur' + data);
   });
};