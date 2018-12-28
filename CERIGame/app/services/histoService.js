/**
 * Service historique
 * @return {Object}
 */
function histoService($http)
{

    this.top10 = [];

    /**
     * Récupère le top10 des joueurs
     * @returns {Promise} Réponse serveur (top10)
     */   
   this.getTop10 = function()
   {
       var _this = this;

       return $http
       .get('http://localhost:3131/getTop10')
       .then(function(response)
       {
           _this.top10 = response.data;
       });
   };

   this.histo = [];

   this.getHisto = function(id)
   {
        var _this = this;

        return $http
        .post('http://localhost:3131/getHisto', {'id': id})
        .then(function(response)
        {
            for (var i = 0; i < response.data.length; i++)
            {
                response.data[i].date = response.data[i].date.substring(0, 10) + " (" + response.data[i].date.substring(11, 19) + ")";
            }

            _this.histo = response.data;
        });
   };

   this.saveResult = function(infoToSave)
   {
       return $http
       .post('http://localhost:3131/saveResult', {'info': infoToSave})
       .then(function(response)
       {
           return response.data;
       });
   };
}