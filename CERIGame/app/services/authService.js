/**
 * Service d'authentification
 * @param {?} $http - requête http
 * @param {Object} session - objet session
 */
function authService($http, session)
{
	/**
	 * Vérifie si l'utilisateur est connecté
	 * @returns {boolean} Utilisateur existant
	 */
	this.isLoggedIn = function()
	{
		return session.getUser() !== null;
	};

	/**
	 * Connecte un utilisateur
	 * @param {String} login - Identifiant
	 * @param {String} password - Mot de passe
	 * @returns {Promise} Réponse serveur
	 */
	this.logIn = function(login, password)
	{
		alert(login + ' (' + typeof(login) + ') => ' + password + ' (' + typeof(password) + ')');

		return $http
			.post('http://localhost:3131/login', {'login': login, 'password': password})
			.then(function(response)
			{
				if (response.data.statusResp)
				{
					console.log('Utilisateur connecté: ' + response.data.statusResp + ', ' + response.data.statusMsg +  ', ' + JSON.stringify(response.data.data));
				}

				return response.data;
			});
	};

	/**
	 * Déconnecte un utilisateur
	 * @returns {Promise} Réponse serveur
	 */
	this.logOut = function()
	{
		return $http
			.get('http://localhost:3131/logout')
			.then(function(response)
			{
				console.log('Utilisateur déconnecté');
				session.destroy();
				return response.data;
			});
	};
};