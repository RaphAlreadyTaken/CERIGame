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
    this.getAvailableUsers = function(id)
    {
        return $http
        .get('http://localhost:3131/getAllUsers')
        .then(function(response)
        {
            return response;
        });
    };

    /**
	 * Modifie les informations non nulles passées
     * @param {*} avatar - Image de profil
     * @param {*} identifiant - Nom utilisé dans l'app
     * @param {*} prenom - Prénom de l'utilisateur
     * @param {*} nom - Nom de l'utilisateur
	 * @returns {Promise} Réponse serveur
	 */
    this.updateProfil = function(id, avatar, identifiant, prenom, nom)
    {
        return $http
        .post('http://localhost:3131/updateProfil', {'id': id, 'avatar': avatar, 'identifiant': identifiant, 'prenom': prenom, 'nom': nom})
        .then(function(response)
        {
            return response;
        });
    };
}