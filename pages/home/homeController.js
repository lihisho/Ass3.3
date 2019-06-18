// home controller
angular.module("myApp")
    .controller("homeController", function ($scope, $http, $window, $location) {
        //handle login
        $scope.login = function() {
            $http({
                method: "POST",
                url:"http://localhost:3000/users/login",
                // headers: {},
                data: {
                    "username": $scope.username,
                    "password": $scope.password
                }
            }).then(function mySuccess(response) {
                    $window.sessionStorage.setItem("token",response.data);
                    $window.sessionStorage.setItem("userName",$scope.username);
                    $location.path('/loggedUserHome');
            }, function myError(response) {
                //Todo: deal with error!
            });

        }
        var onSucessRandPOI=function(response){
            $scope.randomePOIs=response.data;
        }
        var onErrorRandPOI=function(response){
            console.log(response);
        }
        // TODO: determine real minimal rank
        $http.get("http://localhost:3000/poi/getRandomPOI/3").then(onSucessRandPOI,onErrorRandPOI);
    });