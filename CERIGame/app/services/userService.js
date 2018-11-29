/**
 * Service user
 * @return {Object}
 */
function userService($http)
{
    /**
	 * Récupère un utilisateur grâce à son ID
     * @param {*} id - ID d'un utilisateur (PGSQL)
	 * @returns {Promise} Réponse serveur (utilisateur)
	 */
    this.getUser = function(id)
    {
        return $http
        .post('http://localhost:3131/getUser', {'id': id})
        .then(function(response)
        {
            return response;
        });
    }

    /**
	 * Récupère tous les utilisateurs
	 * @returns {Promise} Réponse serveur (utilisateurs)
	 */
    this.getAllUsers = function(id)
    {
        return $http
        .get('http://localhost:3131/getAllUsers')
        .then(function(response)
        {
            return response;
        });
    };
}