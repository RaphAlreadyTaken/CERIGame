/**
 * Service session
 * @param {?} $log - ?
 * @param {Object} localStorage - Objet stockage local
 * @return {Object|sessionService}
 */
function sessionService($log, localStorage)
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
        localStorage.setItem('session.user', JSON.stringify(user));
        this.exists = true;
    };
}