'use strict';

angular.module('students', []);

//Routers
myApp.config(function($stateProvider) {
  //To get All the Student List
  $stateProvider.state('students', {
	url: "/students",
    templateUrl: 'views/students/studentlist.html',
	controller: 'studentListController'
  });
    
   //To Add  Employee Details for Edit
  $stateProvider.state('addStudent', {
	url: "/addStudent",
    templateUrl: 'views/students/addStudent.html',
	controller: 'studentController'
  });     
       //To get  Student Details
  $stateProvider.state('studentdetails', {
	url: "/studentdetails",
    templateUrl: 'views/students/studentdetails.html',
	controller: 'studentDetailsController'
  });
    
    //To get  Student Details for Delete
  $stateProvider.state('deleteStudent', {
	url: "/deleteStudent",
    templateUrl: 'views/students/deleteStudent.html',
	controller: 'studentDetailsController'
  });
    
      //To get  Student Details for Edit
  $stateProvider.state('editStudent', {
	url: "/editStudent",
    templateUrl: 'views/students/editStudent.html',
	controller: 'studentDetailsController'
  });
    
    $stateProvider.state('editdeletestudent',{
        url : "/editdeletestudent",
        templateUrl : 'views/students/editdeletestudent.html',
        controller : 'studentSearchController'
    });
});

// student controller
myApp.controller('studentController', ['$scope', 'StudentsServices','$http','$location', function($scope, StudentsServices,$http,$location) {
    
    var nextEmpIdAry = [];
    // getting the next employee number 
    for(var i = 0; i <STUDENT_LIST.studentList.length;i++){
        nextEmpIdAry.push(STUDENT_LIST.studentList[i].studentNumber);
    }
    var nextEmpIdIs = Math.max.apply(null,nextEmpIdAry);
    $scope.student = {"studentFirstName":"","studentlastName" : "","studentEmail" : "","studentMobile":"","studentClass" :"","studentNumber":nextEmpIdIs+1}

        $scope.addStudent = function(){
        STUDENT_LIST.studentList.push($scope.student);
        $location.path("/dashboard");
    }
    
    $scope.cancel = function(){
        $location.path("/editdeletestudent");
    }
}]);

myApp.controller('studentSearchController', ['$scope', 'StudentsServices','$http','$location', function($scope, StudentsServices,$http,$location) {
    
    $scope.enteredStuId =  "";
    $scope.data = {};
    $scope.isSuccess =false;
    // getting the next employee number 
    
    $scope.searchStudent = function(){
        
        if($scope.enteredStuId.trim() == '' ){
            alert('Enter Student Number !');
        }else{
           for(var i = 0; i <STUDENT_LIST.studentList.length;i++){
                if(STUDENT_LIST.studentList[i].studentNumber == $scope.enteredStuId){
                   $scope.data =  STUDENT_LIST.studentList[i];
                    $scope.isSuccess = true;
                    break;
                }
            }
           if(jQuery.isEmptyObject($scope.data) ){
               $scope.enteredStuId =  "";
               alert('No records found !')
           }
        }
    }
    $scope.studentDetails = function(studentNo,operation){
        StudentsServices.setStudentId(studentNo);
        if(operation == 'View')    
         $location.path("/studentdetails");   
        else if(operation =='Edit')    
         $location.path("/editStudent");   
        else
        $location.path("/deleteStudent");       
    }
    
    $scope.cancel = function(){
        $location.path("/dashboard");
    }
}]);

//Controllers
myApp.controller('studentListController', ['$scope', 'StudentsServices','$http','$location', function($scope, StudentsServices,$http,$location) {
     if(APP_RUN_MODE == 'OFFLINE'){
         var studentList = STUDENT_LIST;
            if(studentList == undefined || studentList == null || studentList.length <1 ){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    $scope.data = STUDENT_LIST;
                });
            }else{
                 $scope.data = STUDENT_LIST;                           
            }
            }else{
                StudentsServices.getAllStudentsList(null).then(function(result){
                   
                });	
            }
    $scope.studentDetails = function(studentNo,operation){
        StudentsServices.setStudentId(studentNo);
        if(operation == 'View')    
         $location.path("/studentdetails");   
        else if(operation =='Edit')    
         $location.path("/editStudent");   
        else
        $location.path("/deleteStudent");       
    }
}]);




myApp.controller('studentDetailsController', ['$scope', 'StudentsServices','$http','$location', function($scope, StudentsServices,$http,$location) {
     
     if(APP_RUN_MODE == 'OFFLINE'){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    for(var i= 0;i<STUDENT_LIST.studentList.length;i++){
                        if(STUDENT_LIST.studentList[i].studentNumber == StudentsServices.getStudentId()){
                            $scope.data = STUDENT_LIST.studentList[i];
                            break;
                        }
                    }
                    
                });
            }else{
                StudentsServices.getAllStudentsList(null).then(function(result){
                   
                });	
            }
    
    // On click of cancel button on Edit Student and Delete Student and Ok button on View Student pages
    $scope.studentList = function(){
        $location.path("/students");
    }
    
    // Update Student
    $scope.updateStudent = function(stuNO){
        var studentNumberIs = stuNO;
        var studentFirstName = $scope.data.studentFirstName;
        var studentlastName = $scope.data.studentlastName;
        var studentEmail = $scope.data.studentEmail;
        var studentClass = $scope.data.studentClass;
        var studentMobile = $scope.data.studentMobile;
        var studentNumber = $scope.data.studentNumber;
        if(APP_RUN_MODE == 'OFFLINE' && studentNumberIs == studentNumber){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    for(var i= 0;i<STUDENT_LIST.studentList.length;i++){
                        if(STUDENT_LIST.studentList[i].studentNumber == studentNumber){
        var obj =  {"studentFirstName":studentFirstName,"studentlastName" :studentlastName,                        "studentEmail" : studentEmail,"studentClass" : studentClass,            "studentMobile":studentMobile,"studentNumber" :studentNumber}
                            STUDENT_LIST.studentList[i] = obj;
                            break;
                        }
                    }
                    
                });
            $location.path("/students")
            }else{
                StudentsServices.getAllStudentsList(null).then(function(result){
                   
                });	
            }
    }
    
    // delete Student
    $scope.deleteStudent = function(studentNo){
                if(APP_RUN_MODE == 'OFFLINE'){
                $http.get('./customjslib/dashboard/dashboarddata.json').then(function(resultData){
                    var result = resultData.data;
                    for(var i= 0;i<STUDENT_LIST.studentList.length;i++){
                        if(STUDENT_LIST.studentList[i].studentNumber == studentNo){
                            STUDENT_LIST.studentList.splice(i,1);
                            break;
                        }
                    }
                    
                });
            $location.path("/students")
            }else{
                StudentsServices.getAllStudentsList(null).then(function(result){
                   
                });	
            }
    }
	
}]);
