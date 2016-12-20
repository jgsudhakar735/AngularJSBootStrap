'use strict';
/**
* This will handle all the User related services like Authentication fetching the User Details and updating the User Details
*/

myApp.factory('StudentsServices' ,['$http', '$q', function($http, $q){
    var studentId = '';
    var factory = {
        getAllStudentsList  : getAllStudentsList, 
        setStudentId:setStudentId,
        getStudentId:getStudentId
    };
    
    return factory;
    
    function getAllStudentsList(user){
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
    
    function setStudentId(studentNo){
        studentId =studentNo;
    }
    
    function getStudentId(){
        return studentId;
    }
    
}]);