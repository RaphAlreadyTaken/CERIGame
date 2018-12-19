/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 */
function socketController($scope, socket)
{
    socket.on('notification', function(data)
    {
        $scope.bandeauDisplay('Message du serveur' + data);
    });

    $scope.test = function()
    {
        socket.emit('message', "hello server");
    }
};