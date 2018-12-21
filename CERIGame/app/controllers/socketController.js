/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 */
function socketController($scope, socket)
{
    socket.on('notification', function(data)
    {
        alert("New user connected");
    });

    $scope.test = function()
    {
        socket.emit('message', "hello server");
    }
};