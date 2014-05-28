'use strict';
var responses = [];
(function() {
    var app = angular.module('dimaSpa', ['dimaSpa-directives']);

    app.controller('InsertSelectController', ['$http', '$scope', '$q',
        function($http, $scope, $q) {

            $scope.responses = [];
            $scope.amount = '';

            $scope.submit = function(value) {
                if ($scope.insertSelect.$valid) {
                    post(value);
                };
                /*var counter = $scope.amount;
                while (counter > 0) {
                    counter--;
                    console.log(counter);
                    $http({
                        method: 'POST',
                        data: {
                            name: 'something'
                        },
                        url: '/insertSelect'
                    }).success(function(data) {
                        var usersCount = data.json[0]['COUNT(id)'];
                        console.log(usersCount);
                        //responses.push('Success, ' + usersCount);
                        $scope.responses.push('Success, ' + usersCount);
                    }).error(function(data) {
                        console.error(data);
                        //responses.push('Error, ' + data.message || data.error);
                        $scope.responses.push('Error, ' + data.message || data.error);
                    });
                }*/
            };


            var post = function(value) {

                var arr = new Array();

                for (var i = 0; i < value; i++) {
                    arr.push($http({
                        method: 'POST',
                        data: {
                            name: 'something'
                        },
                        url: '/insertSelect'
                    }))
                };

                $q.all(arr).then(
                    function(data) {
                        angular.forEach(data, function(item) {
                            $scope.responses.push({
                              id: item.data.json[0]['COUNT(id)']
                            });
                        });

                        console.log($scope.responses);
                    },
                    function(error) {

                    }
                )

            }



        }
    ]);
})();
