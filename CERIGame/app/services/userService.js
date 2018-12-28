/**
 * Service user
 * @return {Object}
 */
function userService($http, localStorage)
{
    this.allDefis =[];

    this.getChallengeList = function(id)
    {
        var _this = this;

        return $http
        .post('http://localhost:3131/defi/defiList', {'id': id})
        .then(function(response)
        {
            angular.copy(response.data, _this.allDefis);
        });
    }
    
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
            return response.data;
        });
    };

    this.getCurUser = function()
    {
        return JSON.parse(localStorage.getItem("sessionUser"));
    }

    this.allUsers = [];

    /**
     * Récupère tous les utilisateurs
     * @returns {Promise} Réponse serveur (utilisateurs)
	 */
    this.getUserList = function()
    {
        var _this = this;

        return $http
        .get('http://localhost:3131/getAllUsers')
        .then(function(response)
        {
            angular.copy(response.data, _this.allUsers);
        });
    };

    this.medailles = [];

    this.getMedailles = function(id)
    {
        var _this = this;

        return $http
        .post('http://localhost:3131/defi/getMedailles', {'id': id})
        .then(function(response)
        {
            angular.copy(response.data, _this.medailles);
        })
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