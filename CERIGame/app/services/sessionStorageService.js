
/**
 * Service stockage (session)
 * @param {?} $window - Navigateur
 * @returns {Object} - Stockage session local
 */
function sessionStorageService($window)
{
	if ($window.sessionStorage)
	{
		return $window.sessionStorage;
	}

	throw new Error('Session storage support needed');
};

sessionStorageService.$inject = ['$window'];