let app = angular.module('myApp', ["ngRoute"]);

app.controller('indexController', function ($scope, $window, $location) {
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

     $scope.logOut=function(){
        $window.sessionStorage.removeItem("token");
        $window.sessionStorage.removeItem("userName");
        $location.path('/home');
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
        // retrieve password
        .when('/retrievePassword', {
            templateUrl: 'pages/home/retrievePassword.html',
            controller : 'homeController as homeCntrl'
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

app.service("poiDetails", function($http,$rootScope){
   this.poiPopoverCtrl=function(poiId){
        var onDetailsRetrvied = function (response) {
            $rootScope.model_title=response.data.poiDetails[0].POIname;
            $rootScope.model_content=response.data.poiDetails[0].POIdescription;
            $rootScope.model_numViewers=response.data.poiDetails[0].POInumOfViewers;
            $rootScope.model_averagePoiRank=response.data.poiDetails[0].POIaverageRank;
            var numReviews=response.data.poiLastReviews.length;
            if(numReviews==2){
                $rootScope.model_first_review=(response.data.poiLastReviews[0].Critic).concat
                (" (",(response.data.poiLastReviews[0].RankDate).substring(0,10)+")");
                $rootScope.model_second_review=(response.data.poiLastReviews[1].Critic)
                .concat(" (",(response.data.poiLastReviews[1].RankDate).substring(0,10)+")");;
            }
            else if(numReviews==1){
                $rootScope.model_first_review=response.data.poiLastReviews[0].Critic;
            }
        }
        var onDetailsFailed = function (response) {
            //deal with errors!
            console.log(response);
        }
        $rootScope.model_first_review=null;
        $rootScope.model_second_review=null;
        $http.get("http://localhost:3000/poi/getPOIDet/"+poiId).then(onDetailsRetrvied, onDetailsFailed);
    }
});
