'use strict';
/**
* This will handle all the User related services like Authentication fetching the User Details and updating the User Details
*/

myApp.factory('UserServices' ,['$http', '$q', function($http, $q){
    
    var factory = {
        validateUser  : authenticateUser
       /* fetUserDetails: getUserDetails,
        updateUserDetails : updateUserDetails,
        logOutUser : logOutUser*/
    };
    
    return factory;
    
    function authenticateUser(user){
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URL+'authenticateUser/',user)
        .then(function(response){
            deferred.resolve(response.data)
        },function(errResponse){
            console.log('Error While Authenticating User');
            deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
}]);