/**
 * Service d'authentification
 * @param {?} $http - requête http
 * @param {Object} session - objet session
 */
function authService($http, session)
{
	/**
	 * Vérifie si l'utilisateur est connecté
	 * @returns {boolean} Utilisateur connecté
	 */
	this.isLoggedIn = function()
	{
		return $http
			.get('http://localhost:3131/checkLog')
			.then(function(response)
			{
				console.log("Response logged: " + response.data);

				if (response.data == true)
				{
					return true;
				}
				
				return false;
			});
	};


	/**
	 * Connecte un utilisateur
	 * @param {String} login - Identifiant
	 * @param {String} password - Mot de passe
	 * @returns {Promise} Réponse serveur
	 */
	this.logIn = function(login, password, ls)
	{
		return $http
		.post('http://localhost:3131/login', {'login': login, 'password': password, 'ls' : ls})
		.then(function(response)
		{
			if (response.data.statusResp === true)
			{
				localStorage.setItem('sessionUser', JSON.stringify(response.data.data));
				console.log('Utilisateur connecté: ' + response.data.statusResp + ', ' + response.data.statusMsg);
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
	};
};