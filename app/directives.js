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
  /*
  app.directive("productReviews", function () {
    return {
      restrict: 'E',
      templateUrl: "product-reviews.html"
    };
  });

  app.directive("productSpecs", function () {
    return {
      restrict: "A",
      templateUrl: "product-specs.html"
    };
  });

  app.directive("productTabs", function () {
    return {
      restrict: "E",
      templateUrl: "product-tabs.html",
      controller: function () {
        this.tab = 1;

        this.isSet = function (checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function (activeTab) {
          this.tab = activeTab;
        };
      },
      controllerAs: "tab"
    };
  });

  app.directive("productGallery", function () {
    return {
      restrict: "E",
      templateUrl: "product-gallery.html",
      controller: function () {
        this.current = 0;
        this.setCurrent = function (imageNumber) {
          this.current = imageNumber || 0;
        };
      },
      controllerAs: "gallery"
    };
  });
*/
})();
