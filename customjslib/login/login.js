'use strict';
angular.module('login', []);

//Routers
myApp.config(function($stateProvider) {
 
  //Login
  $stateProvider.state('login', {
	url: "/login",
    templateUrl: 'views/login/login.html',
	controller: 'loginController'
  });
  
  //Signup
  $stateProvider.state('signup', {
	url: "/signup",
    templateUrl: 'views/login/signup.html',
	controller: 'signupController'
  });
  
  //Logout
  $stateProvider.state('logout', {
	url: "/logout",
	template: "<h3>Logging out...</h3>",
    controller: 'logoutController'
  });
  
});

//Controllers
myApp.controller('loginController', ['$scope', '$location', '$rootScope','UserServices','$http', function($scope,  $location, $rootScope,UserServices,$http) {

	$scope.login = {"email":"jgsudhakar735@gmail.com", "password": "mypassword"};
    $rootScope.showSignUp = true;
	$scope.doLogin = function() {

		if ($scope.loginForm.$valid) {
            if(APP_RUN_MODE == 'OFFLINE'){
                $http.get('./customjslib/login/userdata.json').then(function(resultData){
                    var isValidUser = '';
                    var userInfoObj = {}
                    var result = resultData.data;
                    for(var i = 0;i < result.userlist.length; i++){
                        if(result.userlist[i].userEmail == $scope.login.email && result.userlist[i].userPwd == $scope.login.password){
                            isValidUser = true;
                            userInfoObj = result.userlist[i];
                            $rootScope.username = result.userlist[i].userfirstName + result.userlist[i].userlastName;
                        }
                    }
                    if(isValidUser){
                        window.sessionStorage["userInfo"] = JSON.stringify(userInfoObj);
                        $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
                        $location.path("/dashboard");
                    }else{
                        alert('Invalid Credentials ...');
                       $location.path("/login"); 
                    }
                });
            }else{
                UserServices.validateUser($scope.login).then(function(result){
                    $scope.data = result;
                    if (!result.error) {
                      window.sessionStorage["userInfo"] = JSON.stringify(result.data);
                      $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
                      $location.path("/dashboard");
                    }
                });	
            }
		}
	};
}]);

myApp.controller('signupController', ['$scope','$rootScope',  '$location','UserServices', function($scope,$rootScope, $location,UserServices) {
    $rootScope.showSignUp = false;
	$scope.doSignup = function() {
		/*if ($scope.signupForm.$valid) {	
			userServices.signup($scope.signup).then(function(result){
				$scope.data = result;
				if (!result.error) {	
					$location.path("/login");
				}	
			});	
		}*/
	}
    $scope.login = function(){
        $location.path("/login");
    }
}]);

myApp.controller('logoutController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
	sessionStorage.clear();
	$rootScope.userInfo = false;
	$location.path("/login");
}]);