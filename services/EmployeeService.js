'use strict';
/**
* This will handle all the User related services like Authentication fetching the User Details and updating the User Details
*/

myApp.factory('EmployeeServices' ,['$http', '$q', function($http, $q){
    var employeeId = '';
    var factory = {
        getAllEmployeesList : getAllEmployeesList,
        setEmpId:setEmployeeId,
        getEmpId:getEmployeeId
       
    };
    
    return factory;
    
    function getAllEmployeesList(user){
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
    
    function setEmployeeId(employeeNo){
        employeeId =employeeNo;
    }
    
    function getEmployeeId(){
        return employeeId;
    }
    
}]);