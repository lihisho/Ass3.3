let app = angular.module('myApp', ["ngRoute"]);

app.controller('indexController', function ($scope, $window) {
    $scope.getUserName=function(){
        var user_name="Guest";
        if($window.sessionStorage.getItem("userName")!=null){
            user_name= $window.sessionStorage.getItem("userName");
        }
        return user_name;
    }
    /* check whether there is a logged user in the system */
     $scope.isUserLoggedIn= function(){
         if($window.sessionStorage.getItem("token")!=null )
             return true;
         else
             return false;
     }
});

// config routes
app.config(function($routeProvider)  {
    $routeProvider
    // homepage
        .when('/home', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        // register
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as regCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl'
        })
        .when('/loggedUserHome', {
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as loginCtrl'
        })
        .when('/favourites',{
            templateUrl:'pages/favourites/favourites.html',
            controller: 'favouritesController as favorCtrl'
        })
        // other
        .otherwise({ redirectTo: '/home' });
});

// app.service("SharedProperties", function($window){
//     var serverUrl="http://localhost:3000";
//     this.getServerURl=function(){
//         return this.serverUrl;
//     }
//     this.isUserLogged=function(){
//         if($window.sessionStorage.getItem("token")!=null){
//             console.log("hi");
//             return true;
//         }
//         else{
//             return false;
//         }
//     }
// });
