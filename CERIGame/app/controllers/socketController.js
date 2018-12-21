/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 */
function socketController($scope, socket)
{
    socket.on('notifConnexion', function(data)
    {
        $scope.$apply(function()
        {
            $scope.serverMessage = data;
        });
    });

    socket.on('confirmDefi', function(data)
    {
        $scope.$apply(function()
        {
            $scope.confirmDefi = data;
            console.log(data);
        });
    });

    $scope.test = function()
    {
        socket.emit('message', "hello server");
    }
};