// home controller
angular.module("myApp")
    .controller("homeController", function ($scope, $http) {
        // button click count
        $scope.login = function() {
            $scope.test = "ggg";

        }

        $http({
            method : "POST",
            url : serverUrl + "/private/users/login",
            // headers: {},
            data: {
                "username": $scope.username,
                "password":$scope.password
            }
          }).then(function mySuccess(response) {

          }, function myError(response) {
          });
    });