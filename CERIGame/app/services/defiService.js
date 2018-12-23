/**
 * Service défi
 */
function defiService($http, user, socket)
{
    this.initDefi = function(id, ident, quizzQuestions, quizzScore)
    {
        return $http
       .post('http://localhost:3131/initDefi', {'id_user_defie': id, 'id_user_defiant': user.getCurUser().id, 'ident_user_defiant': user.getCurUser().ident, 'quizz': quizzQuestions, 'score_user_defiant': quizzScore})
       .then(function(response)
       {
           var content = {'id': id, 'auteur': user.getCurUser().ident, 'message': response.data + " à " + ident};
           socket.emit('confirmDefi', content);
       });
    }
}