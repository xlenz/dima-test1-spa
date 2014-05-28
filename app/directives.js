'use strict';

(function () {
  var app = angular.module('dimaSpa-directives', []);
  app.directive("isForm", function () {
    return {
      restrict: 'E',
      templateUrl: "templates/isForm.html"
    };
  });

  app.directive("isList", function () {
    return {
      restrict: 'E',
      templateUrl: "templates/isList.html"
    };
  });
})();
