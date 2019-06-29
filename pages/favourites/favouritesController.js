// poi controller
angular.module("myApp").controller("poiController", function ($scope, $http, $window) {
    
    //logged user check
    $scope.isUserLoggedIn= function(){
        if($window.sessionStorage.getItem("token")!=null )
            return true;
        else
            return false;
    }
    //get favorite POI's
    
    
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

