(function (angular) {

angular.module('testApp', [])
    .controller('main', ['$scope', function($scope) {
        $scope.ready = true;
    }]);

} (angular));