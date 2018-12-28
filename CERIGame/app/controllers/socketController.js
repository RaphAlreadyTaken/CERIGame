/**
 * Contrôleur de webSocket
 * @param {?} $scope - Variable de contexte
 */
function socketController($scope, socket, user)
{
    socket.on('notifConnexion', function(data)
    {
        $scope.$apply(function()
        {
            $scope.serverMessage = data;
            user.getUserList();
        });
    });

    socket.on('notifDeconnexion', function(data)
    {
        $scope.$apply(function()
        {
            $scope.serverMessage = data;
            user.getUserList();
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
            user.getChallengeList(user.getCurUser().id);
        });
    });

    $scope.test = function()
    {
        socket.emit('message', "hello server");
    }
};