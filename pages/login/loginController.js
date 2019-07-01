// login controller
angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window, $location, poiDetails) {
        $scope.showDet=function(event){
            poiDetails.poiPopoverCtrl(event.target.id);
        };
        //retrive
        $http({
            method: "GET",
            url:"http://localhost:3000/private/poi/getLastSavedFavouritePOI",
            headers: {"x-auth-token": $window.sessionStorage.getItem("token")},
        }).then(function mySuccess(response) {
                $scope.lastSavedPOIs=response.data;
        }, function myError(response) {
            console.log(response);
        });

        $http({
            method: "GET",
            url:"http://localhost:3000/private/users/getPopularPOI",
            headers: {"x-auth-token": $window.sessionStorage.getItem("token")},
        }).then(function mySuccess(response) {
                $scope.recommendedPOIs=response.data;
        }, function myError(response) {
            console.log(response);
        });


    });