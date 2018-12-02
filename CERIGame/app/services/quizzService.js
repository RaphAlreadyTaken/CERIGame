/**
 * Service quizz
 * @param {?} 
 * @return {?}
 */
function quizzService($http)
{
    this.getQuestion = function(param1, param2)
    {
        return $http
        .post('http://localhost:3131/getQuestion', {'nbQuestions': param1, 'theme': param2})
        .then(function(response)
        {
            return response;
        });
    };

    this.getThemes = function()
    {
        return $http
        .post('http://localhost:3131/getThemes')
        .then(function(response)
        {
            return response;
        });
    };
}