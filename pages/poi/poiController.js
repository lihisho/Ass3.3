// poi controller
angular.module("myApp").controller("poiController", function ($scope, $http, $window) {
    
    //logged user check
    $scope.isUserLoggedIn= function(){
        if($window.sessionStorage.getItem("token")!=null )
            return true;
        else
            return false;
    }
    //retriveing categories
    var onSucessCategories=function(response){
        $scope.categories=response.data;
    }
    var onErrorCategories=function(response){
        console.log(response);
    }
    $http.get("http://localhost:3000/categories/getAllCategories").then(onSucessCategories,onErrorCategories);
    //getAllPOIs
    var onSucessAllPOIs=function(response){
        $scope.allPOIs=response.data;
    }
    var onErrorAllPOIs=function(response){
        console.log(response);
    }
    $http.get("http://localhost:3000/poi/getALLPOIs").then(onSucessAllPOIs,onErrorAllPOIs);
    //change sort parameter
    $scope.sort=function(){
        if($scope.sortByRank)
            return '-POIaverageRank';
        else
            return null;
    }
    //handle sort clicke
    $scope.toggleSortButtonText="sort by rank";
    $scope.handleSortClicked=function(){
        if($scope.toggleSortButtonText=="set to unsorted"){
            $scope.sortByRank=false;
            $scope.toggleSortButtonText="sort by rank"; 
        }
        else{
            $scope.sortByRank=true;
            $scope.toggleSortButtonText="set to unsorted";
        }
    } 
});

