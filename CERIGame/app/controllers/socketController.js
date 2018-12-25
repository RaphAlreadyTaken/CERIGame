/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 */
function socketController($scope, $rootScope, socket, user, defi)
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
            $scope.idDefi = data.idDefi;
        });
    });

    socket.on('confirmDelete', function(data)
    {
        $rootScope.$apply(function()
        {
            console.log("rootscope apply");
            $rootScope.allDefis = data;
        });
    });

    $scope.test = function()
    {
        socket.emit('message', "hello server");
    }
};