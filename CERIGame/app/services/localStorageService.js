/**
 * Service stockage (session)
 * @param {?} $window - Navigateur
 * @returns {Object} - Stockage session local
 */
function localStorageService($window)
{
	if ($window.localStorage)
	{
		return $window.localStorage;
	}

	throw new Error('Session storage support needed');
};

localStorageService.$inject = ['$window'];