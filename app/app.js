'use strict';
var responses = [];
(function () {
  var app = angular.module('dimaSpa', ['dimaSpa-directives']);

  app.controller('InsertSelectController', [
    '$http',
    function ($http) {
      var queries = this;
      queries.responses = [];
      queries.amount = '';

      queries.submit = function () {
        var counter = queries.amount;
        while (counter > 0) {
          counter--;
          console.log(counter);
          $http({
            method: 'POST',
            data: {
              name: 'something'
            },
            url: '/insertSelect'
          }).success(function (data) {
            var usersCount = data.json[0]['COUNT(id)'];
            console.log(usersCount);
            responses.push('Success, ' + usersCount);
            //queries.responses.push('Success, ' + usersCount);
          }).error(function (data) {
            console.error(data);
            responses.push('Error, ' + data.message || data.error);
            //queries.responses.push('Error, ' + data.message || data.error);
          });
        }
      };
    }
  ]);
})();
