'use strict';

var myApp = angular.module('myApp',[ 
  'ui.router',
  'ui.bootstrap',
  'validation', 
  'validation.rule', 
  'login',
  'students',
  'employees'    
]);

// configuration
myApp.config(function($urlRouterProvider,$httpProvider){
    // Here checking user is logged in or not , post login we are setting the data in the sessionstorage
        if(!window.sessionStorage["userInfo"]){
            $urlRouterProvider.otherwise("/login");  
          }else{
            $urlRouterProvider.otherwise("/dashboard");  
          }
});

// Run Phase



//For top sub menu (look others menu)
$(function () {
	$('.subnavbar').find ('li').each (function (i) {
		var mod = i % 3;
		if (mod === 2) {
			$(this).addClass ('subnavbar-open-right');
		}
	});
});