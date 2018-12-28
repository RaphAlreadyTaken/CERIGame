/**
 * Service user
 * @return {Object}
 */
function userService($http, localStorage)
{
    this.allDefis =[];
    this.allUsers = [];
    this.avatar = "";
    this.medailles = [];

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
    
    this.getCurUser = function()
    {
        return JSON.parse(localStorage.getItem("sessionUser"));
    }

    /**
	 * Récupère un utilisateur grâce à son ID
     * @param {*} id - ID d'un utilisateur (PGSQL)
	 * @returns {Promise} Réponse serveur (utilisateur)
	 */
    this.getUser = function(id)
    {
        var _this = this;

        return $http
        .post('http://localhost:3131/user/getUser', {'id': id})
        .then(function(response)
        {
            return response.data;
        });
    };

    /**
     * Récupère tous les utilisateurs
     * @returns {Promise} Réponse serveur (utilisateurs)
	 */
    this.getUserList = function()
    {
        var _this = this;

        return $http
        .get('http://localhost:3131/user/getAllUsers')
        .then(function(response)
        {
            angular.copy(response.data, _this.allUsers);
        });
    };

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
	 * @returns {Promise} Réponse serveur
	 */
    this.updateAvatar = function(id, avatar)
    {
        var _this = this;

        return $http
        .post('http://localhost:3131/user/updateAvatar', {'id': id, 'avatar': avatar})
        .then(function(response)
        {
            _this.avatar = response.data;
        });
    };
}