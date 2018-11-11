/**
 * Service session
 * @param {?} $log - ?
 * @param {Object} localStorage - Objet stockage local
 * @return {Object|sessionService}
 */
function sessionService($log, sessionStorage)
{
    this.exists = false;

    /**
     * Getter utilisateur
     * @returns {Object} Utilisateur
     */
    this.getUser = function()
    {
        return this.user;
    };

    /**
     * Setter utilisateur
     * @returns {Object} Session
     */
    this.setUser = function(user)
    {
        alert("User created");
        console.log("User created");
        this.user = user;
        sessionStorage.setItem('sessionUser', JSON.stringify(user));
        console.log(sessionStorage);
        this.exists = true;
    };
}