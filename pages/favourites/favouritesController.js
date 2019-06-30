// poi controller
angular.module("myApp").controller("favouritesController", function ($scope, $http, $window) {
    $scope.userFavourites=JSON.parse(sessionStorage.getItem('userFavouritePOIs'));
    //logged user check
    $scope.isUserLoggedIn= function(){
        if($window.sessionStorage.getItem("token")!=null )
            return true;
        else
            return false;
    }
    //change sort parameter
    $scope.sort=function(){
        if($scope.sortByRank)
            return '-POIaverageRank';
        else
            return null;
    }
    //handle sort click
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
    //get categories
    var onSucessCategories=function(response){
        $scope.categories=response.data;
    }
    var onErrorCategories=function(response){
        console.log(response);
    }
    $http.get("http://localhost:3000/categories/getAllCategories").then(onSucessCategories,onErrorCategories);
    //remove Favourite POI from the user favourite poi list saved in the session storage
    $scope.removeFavPOI=function(poiID)
    {
        for(var i = 0; i < $scope.userFavourites.length; i++) {
            var fav_poi = $scope.userFavourites[i];
            if(fav_poi.POIid== poiID){
                $scope.userFavourites.splice(i,1);
            }
        }
        $window.sessionStorage.setItem("userFavouritePOIs",JSON.stringify($scope.userFavourites));
    }
    //save all favourites stored in the user sessiong storage
    $scope.saveLocalFavouritesList=function(){
        var favToBeSaved={POIs:[]};
        $scope.userFavourites.map(function(favorPOI){
            favToBeSaved.POIs.push({
               "id" :favorPOI.POIid,
               /* TODO: date will be assigned when user save to favourite */
               "date": favorPOI.InsertionDate
            });
        })
        $http({
            method: "POST",
            url:"http://localhost:3000/private/poi/saveFavouritePOIs",
            headers: {"x-auth-token":$window.sessionStorage.getItem("token")},
            data: favToBeSaved
        }).then(function mySuccess(response) {
            alert("saved!");
        }, function myError(response) {
            alert("save was unsuccesfull");
        });
    }
});

