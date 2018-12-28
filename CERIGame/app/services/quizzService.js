/**
 * Service quizz
 * @param {?} 
 * @return {?}
 */
function quizzService($http)
{
    this.getQuestions = function(param1, param2, param3)
    {
        return $http
        .post('http://localhost:3131/quizz/getQuestions', {'nbQuestions': param1, 'theme': param2, 'difficulte': param3})
        .then(function(response)
        {
            return response;
        });
    };

    this.getThemes = function()
    {
        return $http
        .post('http://localhost:3131/quizz/getThemes')
        .then(function(response)
        {
            return response;
        });
    };
}