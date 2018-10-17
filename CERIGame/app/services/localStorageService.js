
/**
 * Service stockage (session)
 * @param {?} $window - Navigateur
 * @returns {Object} - Stockage local
 */
function localStorageService($window)
{
	if ($window.localStorage)
	{
		return $window.localStorage;
	}

	throw new Error('Local storage support needed');
};

localStorageService.$inject = ['$window'];