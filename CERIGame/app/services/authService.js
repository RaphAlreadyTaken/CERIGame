/**
 * Service d'authentification
 * @param {?} $http - requête http
 * @param {?} $window - navigateur
 * @param {Object} session - objet session
 */
function authService($http, $window, session)
{
	session.connected = false;

	/**
	 * Vérifie si l'utilisateur est connecté
	 * @returns {boolean} Utilisateur connecté
	 */
	this.isLoggedIn = function()
	{
		var userInfo = JSON.parse(localStorage.getItem("sessionUser"));
		var userId = userInfo["id"];

		return $http
		.post('http://localhost:3131/checkLog', {'id': userId})
		.then(function(response)
		{
			return response;
		});
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
				localStorage.setItem('sessionUser', JSON.stringify(response.data.data));
				console.log('Utilisateur connecté: ' + response.data.statusResp + ', ' + response.data.statusMsg);
			}

			$window.location.reload();
			return response;
		});
	};
	

	/**
	 * Déconnecte un utilisateur
	 * @returns {Promise} Réponse serveur
	 */
	this.logOut = function()
	{
		var userInfo = JSON.parse(localStorage.getItem("sessionUser"));
		var userId = userInfo["id"];

		return $http
		.post('http://localhost:3131/logout', {'id': userId})
		.then(function()
		{
			$window.location.reload();
		});
	};
};