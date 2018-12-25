/**
 * Service défi
 */
function defiService($http, user, socket)
{
    this.getChallengeList = function(userId)
    {
        return $http
        .post('http://localhost:3131/defi/defiList', {'id': userId})
        .then(function(response)
        {
            return response;
        });
    };

    this.initDefi = function(id, ident, quizzQuestions, quizzScore)
    {
        return $http
       .post('http://localhost:3131/defi/initDefi', {'id_user_defie': id, 'id_user_defiant': user.getCurUser().id, 'ident_user_defiant': user.getCurUser().ident, 'quizz': quizzQuestions, 'score_user_defiant': quizzScore})
       .then(function(response)
       {
           var content = {'id': id, 'auteur': user.getCurUser().ident, 'message': response.data.message + " à " + ident, 'idDefi': response.data.idDefi};
           socket.emit('confirmDefi', content);
       });
    }

    this.deleteDefi = function(idDefi)
    {
        return $http
        .post('http://localhost:3131/defi/deleteDefi', {'idDefi': idDefi, 'id': user.getCurUser().id})
        .then(function(response)
        {
            console.log(response.data);
            socket.emit('confirmDelete', response.data);
        });
    };
}