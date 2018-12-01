/**
 * Service quizz
 * @param {?} 
 * @return {?}
 */
function quizzService($http)
{
    this.getQuestion = function()
    {
        return $http
        .post('http://localhost:3131/getQuestion')
        .then(function(response)
        {
            return response.data;
        });
    };
}