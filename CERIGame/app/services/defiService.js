/**
 * Service défi
 */
function defiService($http, user)
{
    this.initDefi = function(id, quizzInfo)
    {
        console.log("%o, %o", user.getCurUser(), quizzInfo);

        return $http
       .post('http://localhost:3131/initDefi', {'userDefie': id, 'userDefiant': user.getCurUser(), 'quizz': quizzInfo})
       .then(function(response)
       {
           return response;
       });
    }
}