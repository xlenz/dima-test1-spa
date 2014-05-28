'use strict';
var responses = [];
(function () {
   var app = angular.module('dimaSpa', ['dimaSpa-directives']);

   app.controller('InsertSelectController', ['$http', '$scope', '$q',
      function ($http, $scope, $q) {
         $scope.responses = [];
         $scope.amount = '';
         $scope.submit = function (value) {
            if ($scope.insertSelect.$valid) {
               post(value);
            }
         };
         var post = function (value) {
            var arr = [];
            for (var i = 0; i < value; i++) {
               arr.push($http({
                  method: 'POST',
                  data: {
                     name: 'something'
                  },
                  url: '/insertSelect'
               }));
            }
            $q.all(arr).then(
               function (data) {
                  angular.forEach(data, function (item) {
                     addResponse(item.data);
                  });
               },
               function (error) {
                  angular.forEach(error, function (item) {
                     addResponse(item.error);
                  });
               }
            );
         };

         function addResponse(res) {
            var success = res.success ? 'Success' : 'Error';
            var data = res.success ? res.json : res.error;
            $scope.responses.push({
               state: success,
               data: data
            });
         }

      }
   ]);
})();
