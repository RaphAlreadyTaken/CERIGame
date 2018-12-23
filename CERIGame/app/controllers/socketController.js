/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 */
function socketController($scope, socket, user, defi)
{
    socket.on('notifConnexion', function(data)
    {
        $scope.$apply(function()
        {
            $scope.serverMessage = data;
        });
    });

    socket.on('notifDeconnexion', function(data)
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
        });
    });

    socket.on('notifDefi_' + user.getCurUser().id, function(data)
    {
        $scope.$apply(function()
        {
            $scope.notifDefi = data.message;
            defi.idDefi = data.idDefi;
        });
    });

    socket.on('confirmDelete' + user.getCurUser().id, function(data)
    {
        $scope.$apply(function()
        {
            $scope.notifDefi = data;
        });
    });

    $scope.test = function()
    {
        socket.emit('message', "hello server");
    }
};