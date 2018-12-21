/**
 * Service socket
 * @return {Object}
 */
function socketService($rootScope)
{
    var sock = io.connect("http://localhost:3131");

    return {
    on: function(eventName, callback)
    {
        sock.on(eventName, callback);
    },
    emit: function(eventName, data)
    {
        sock.emit(eventName, data);
    }};
}