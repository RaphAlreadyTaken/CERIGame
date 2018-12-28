/**
 * Service d'authentification
 * @param {?} $http - requête http
 * @param {?} $window - navigateur
 * @param {Object} session - service session
 * @param {Object} socket - service socket
 */
function authService($http, $window, session, socket)
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
		.post('http://localhost:3131/log/checkLog', {'id': userId})
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
		.post('http://localhost:3131/log/login', {'login': login, 'password': password})
		.then(function(response)
		{
			if (response.data.statusResp === true)
			{
				localStorage.setItem('sessionUser', JSON.stringify(response.data.data));
				var content = {'id': response.data.data['id'], 'ident': response.data.data['ident']};
				socket.emit('notifConnexion', content);
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

		return $http
		.post('http://localhost:3131/log/logout', {'id': userInfo["id"]})
		.then(function()
		{
			var content = {'id': userInfo["id"], 'ident': userInfo['ident']};
			socket.emit('notifDeconnexion', content);
			$window.location.reload();
		});
	};
};