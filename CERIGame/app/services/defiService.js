/**
 * Service défi
 */
function defiService($http, user, socket)
{
    this.initDefi = function(id, quizzQuestions, quizzScore)
    {
        return $http
       .post('http://localhost:3131/initDefi', {'userDefie': id, 'userDefiant': user.getCurUser().id, 'userDefiantIdent': user.getCurUser().ident, 'questions': quizzQuestions, 'score': quizzScore})
       .then(function(response)
       {
           socket.emit('confirmDefi', response.data);
       });
    }
}