// register controller
angular.module("myApp").controller("registerController", function ($scope, $http) {
        // set possible questions for register.
        $http({
            method : "GET",
            url : "http://localhost:3000/users/GetVerificationQuestions"
        }).then(function mySuccess(response) {
            $scope.questionList = response.data;
        }, function myError(response) {
            $scope.test="NOT-OK";
        });

        $http({
            method : "GET",
            url : "http://localhost:3000/categories/getAllCategories"
        }).then(function mySuccess(response) {
            $scope.categoryList = response.data;
        }, function myError(response) {
            $scope.test="NOT-OK";
        });
        // TODO: remove all error functions.

        // $scope.register = function() {
        
        //     $http({
        //         method : "POST",
        //         url : "http://localhost:3000/users/login",
        //         data: {
        //             "username":$scope.username,
        //             "password":$scope.password
        //         }
        //     }).then(function mySuccess(response) {
        //         $scope.test=response.data;
        //     }, function myError(response) {
        //         $scope.test="NOT-OK";
        //     });
        // }
        

        // var systemCountries=[];
        // fs.readFile('./Resources/countries.xml','utf8', function(err, data){
            
        //     parser.parseString(data, function(err,result){
        //         var countries= result.Countries.Country;
        //         var i;
        //         for( i=0;i<countries.length;i++)
        //             systemCountries.push(countries[i].Name[0]);
        //     })
        // });
        // $scope.countryList= systemCountries;           
});


    
