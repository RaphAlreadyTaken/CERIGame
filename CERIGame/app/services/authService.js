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
		return (session.getUser() !== null && session.getUser() !== undefined);
	};

	/**
	 * Connecte un utilisateur
	 * @param {String} login - Identifiant
	 * @param {String} password - Mot de passe
	 * @returns {Promise} Réponse serveur
	 */
	this.logIn = function(login, password)
	{
		return $http
			.post('http://localhost:3131/login', {'login': login, 'password': password})
			.then(function(response)
			{
				if (response.data.statusResp === true)
				{
					session.setUser(response.data.data);
					console.log('Utilisateur connecté: ' + response.data.statusResp + ', ' + response.data.statusMsg +  ', ' + JSON.stringify(response.data));
				}

				return response;
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