'use strict';

angular.module('dashboard', []);

//Routers
myApp.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
	url: '/dashboard',
    templateUrl: 'views/dashboard/dashboard.html',
	data:{
		auth:true
	}
  });

});

//Controllers
myApp.controller('studentStatsController', ['$scope', 'DashBoardServices','$http','$location', function($scope, DashBoardServices,$http,$location) {
    
     if(APP_RUN_MODE == 'OFFLINE'){
            var studentList =  STUDENT_LIST ;                                
            if(studentList =='undefined' || studentList == null || studentList.length < 1){
                                            $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    $scope.data = result;
                    STUDENT_LIST = result;
                });                         
                }else{
                $scope.data = STUDENT_LIST;
                }
            }else{
                DashBoardServices.getStudentStats(null).then(function(result){
                   
                });	
            }
}]);

myApp.controller('employeeStatsController', ['$scope', 'DashBoardServices','$http','$location', function($scope, DashBoardServices,$http,$location) {
    if(APP_RUN_MODE == 'OFFLINE'){
                var employeeList =  EMPLOYEE_LIST;      
            if(employeeList =='undefined' || employeeList == null || employeeList.length < 1){
                                            $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    $scope.data = result;
                    EMPLOYEE_LIST = result;
                });                         
                }else{
                $scope.data = EMPLOYEE_LIST;
                }
            }else{
                DashBoardServices.getEmployeeStats(null).then(function(result){
                   
                });	
            }
}]);
