'use strict';

angular.module('employees', []);

//Routers
myApp.config(function($stateProvider) {
 
    //To get All the Employee List
  $stateProvider.state('employees', {
	url: "/employees",
    templateUrl: 'views/employees/employeelist.html',
	controller: 'employeeListController'
  });
    
        //To get  Employee Details
  $stateProvider.state('employeesDetails', {
	url: "/employeesDetails",
    templateUrl: 'views/employees/employeedetails.html',
	controller: 'employeeDetailsController'
  });
    
     //To Add  Employee Details for Edit
  $stateProvider.state('addEmployee', {
	url: "/addEmployee",
    templateUrl: 'views/employees/addEmployee.html',
	controller: 'employeeController'
  }); 
    
    //To get  Employee Details for Delete
  $stateProvider.state('employeesRemove', {
	url: "/employeesRemove",
    templateUrl: 'views/employees/deleteEmployee.html',
	controller: 'employeeDetailsController'
  });
    
      //To get  Employee Details for Edit
  $stateProvider.state('employeesEdit', {
	url: "/employeesEdit",
    templateUrl: 'views/employees/editEmployee.html',
	controller: 'employeeDetailsController'
  });    

    $stateProvider.state('searchemployee',{
        url : "/searchemployee",
        templateUrl : 'views/employees/searchemployee.html',
        controller : 'employeeSearchController'
    });    
    
});

myApp.controller('employeeSearchController', ['$scope', 'EmployeeService','$http','$location', function($scope, EmployeeService,$http,$location) {
    
    $scope.enteredEmpId =  "101";
    $scope.data = {};
    $scope.isShow =false;
    // getting the next employee number 
    
    $scope.searchEmployee = function(){
        
        if($scope.enteredEmpId.trim() == '' ){
            alert('Enter Employee Number !');
        }else{
           for(var i = 0; i <EMPLOYEE_LIST.employeeList.length;i++){
                if(EMPLOYEE_LIST.employeeList[i].employeeNumber == $scope.enteredEmpId){
                   $scope.data =  EMPLOYEE_LIST.employeeList[i];
                    $scope.isShow = true;
                    break;
                }
            }
           if(jQuery.isEmptyObject($scope.data) ){
               $scope.enteredStuId =  "";
               alert('No records found !')
           }
        }
    }
     $scope.employeeDetails = function(employeeNo,operation){

        EmployeeService.setEmpId(employeeNo);

        if(operation == 'View')    
         $location.path("/employeesDetails");   
        else if(operation =='Edit')    
         $location.path("/employeesEdit");   
        else
        $location.path("/employeesRemove");       
        }
    
    $scope.cancel = function(){
        $location.path("/dashboard");
    }
}]);

//Controllers
myApp.controller('employeeListController', ['$scope', 'EmployeeServices','$http','$location', function($scope, EmployeeService,$http,$location) {
     
     if(APP_RUN_MODE == 'OFFLINE'){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    
                    $scope.data = EMPLOYEE_LIST;
                });
            }else{
                EmployeeServices.getAllEmployeesList(null).then(function(result){
                   
                });	
            }
    $scope.employeeDetails = function(employeeNo,operation){
        
    EmployeeService.setEmpId(employeeNo);
        
    if(operation == 'View')    
     $location.path("/employeesDetails");   
    else if(operation =='Edit')    
     $location.path("/employeesEdit");   
    else
    $location.path("/employeesRemove");       
    }
	
}]);


myApp.controller('employeeController', ['$scope', 'EmployeeServices','$http','$location', function($scope, EmployeeService,$http,$location) {
    
    var nextEmpIdAry = [];
    // getting the next employee number 
    for(var i = 0; i <EMPLOYEE_LIST.employeeList.length;i++){
        nextEmpIdAry.push(EMPLOYEE_LIST.employeeList[i].employeeNumber);
    }
    var nextEmpIdIs = Math.max.apply(null,nextEmpIdAry);
    $scope.employee = {"employeeFirstName":"","employeelastName" : "","employeeEmail" : "","employeeDesignation":"","employeeMobile" :"","employeeNumber":nextEmpIdIs+1}
    $scope.addEmployee = function(){
//        alert('calling the add employee function ');
        EMPLOYEE_LIST.employeeList.push($scope.employee);
        $location.path("/dashboard");
    }
    
    $scope.cancel = function(){
        $location.path("/dashboard");
    }
}]);

myApp.controller('employeeDetailsController', ['$scope', 'EmployeeServices','$http','$location', function($scope, EmployeeService,$http,$location) {
     
     if(APP_RUN_MODE == 'OFFLINE'){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    for(var i= 0;i<EMPLOYEE_LIST.employeeList.length;i++){
                        if(EMPLOYEE_LIST.employeeList[i].employeeNumber == EmployeeService.getEmpId()){
                            $scope.data = EMPLOYEE_LIST.employeeList[i];
                            break;
                        }
                    }
                    
                });
            }else{
                EmployeeServices.getAllEmployeesList(null).then(function(result){
                   
                });	
            }
    
    // On click of cancel button on Edit Employee and Delete Employee and Ok button on View Employee pages
    $scope.employeeList = function(){
        $location.path("/employees");
    }
    
    // Update Employee
    $scope.updateEmployee = function(employeeNumber){
        var employeeNumberIs = employeeNumber;
        var employeeFirstName = $scope.data.employeeFirstName;
        var employeelastName = $scope.data.employeelastName;
        var employeeEmail = $scope.data.employeeEmail;
        var employeeDesignation = $scope.data.employeeDesignation;
        var employeeMobile = $scope.data.employeeMobile;
        var empId = $scope.data.employeeNumber;
        if(APP_RUN_MODE == 'OFFLINE' && empId == employeeNumberIs){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    for(var i= 0;i<EMPLOYEE_LIST.employeeList.length;i++){
                        if(EMPLOYEE_LIST.employeeList[i].employeeNumber == empId){
        var obj =  {"employeeNumber":empId,"employeeFirstName" :employeeFirstName,                        "employeelastName" : employeelastName,"employeeEmail" : employeeEmail,            "employeeDesignation":employeeDesignation,"employeeMobile" :employeeMobile}
                            EMPLOYEE_LIST.employeeList[i] = obj;
                            break;
                        }
                    }
                    
                });
            $location.path("/employees")
            }else{
                EmployeeServices.getAllEmployeesList(null).then(function(result){
                   
                });	
            }
    }
    
    // delete Employee
    $scope.deleteEmployee = function(empId){
                if(APP_RUN_MODE == 'OFFLINE'){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    for(var i= 0;i<EMPLOYEE_LIST.employeeList.length;i++){
                        if(EMPLOYEE_LIST.employeeList[i].employeeNumber == empId){
                            EMPLOYEE_LIST.employeeList.splice(i,1);
                            break;
                        }
                    }
                    
                });
            $location.path("/employees")
            }else{
                EmployeeServices.getAllEmployeesList(null).then(function(result){
                   
                });	
            }
    }
	
}]);
