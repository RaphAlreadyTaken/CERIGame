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
        console.log("calling on: " + callback);
        sock.on(eventName, callback);
    },
    emit: function(eventName, data)
    {
        console.log("calling emit: " + eventName + " with " + data);
        sock.emit(eventName, data);
    }};
}