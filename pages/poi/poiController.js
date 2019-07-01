// poi controller
var jq = $.noConflict();
angular.module("myApp").controller("poiController", function ($scope, $http, $window, poiDetails) {
    //handle poi details presentaion
    $scope.showDet=function(event){
        poiDetails.poiPopoverCtrl(event.target.id);
    };
    //logged user check
    $scope.isUserLoggedIn = function () {
        if ($window.sessionStorage.getItem("token") != null)
            return true;
        else
            return false;
    }
    //retriveing categories
    var onSucessCategories = function (response) {
        $scope.categories = response.data;
    }
    var onErrorCategories = function (response) {
        console.log(response);
    }
    $http.get("http://localhost:3000/categories/getAllCategories").then(onSucessCategories, onErrorCategories);
    //getAllPOIs
    var onSucessAllPOIs = function (response) {
        $scope.allPOIs = response.data;
    }
    var onErrorAllPOIs = function (response) {
        console.log(response);
    }
    $http.get("http://localhost:3000/poi/getALLPOIs").then(onSucessAllPOIs, onErrorAllPOIs);
    //change sort parameter
    $scope.sort = function () {
        if ($scope.sortByRank)
            return '-POIaverageRank';
        else
            return null;
    }
    //handle sort clicke
    $scope.toggleSortButtonText = "sort by rank";
    $scope.handleSortClicked = function () {
        if ($scope.toggleSortButtonText == "set to unsorted") {
            $scope.sortByRank = false;
            $scope.toggleSortButtonText = "sort by rank";
        }
        else {
            $scope.sortByRank = true;
            $scope.toggleSortButtonText = "set to unsorted";
        }
    }
    //handle review
    $scope.passPOIid = function (event) {
        $scope.poiForReview = event.target.id;
    }
    $scope.saveReview = function () {
        //checking the rank and content values
        if (!$scope.user_review)
            $scope.user_review = null;
        if (!$scope.userRating)
            alert("Please enter rank before submitting your review");
        else {
            $http({
                method: "POST",
                url: "http://localhost:3000/private/poi/saveReview",
                headers: { "x-auth-token": $window.sessionStorage.getItem("token") },
                data: {
                    "POIid": $scope.poiForReview,
                    "rank": $scope.userRating,
                    "review_content": $scope.user_review
                }
            }).then(function mySuccess(response) {
                alert("saved!");
                jq(".modal").modal('hide');
            }, function myError(response) {
                alert("save was unsuccesfull");
            });
        }
    }
    jq(document).ready(function () {
        jq(".modal").on('hidden.bs.modal', function () {
            jq('textarea#userContentInput').val('');
            $scope.user_review=null;
            jq('input[name="rate"]').prop('checked',false);
            $scope.userRating=null;
        });
    });
});

