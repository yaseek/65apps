(function (angular) {

angular.module('testApp', [])
    .controller('main', ['$scope', '$http', '$timeout',
        function($scope, $http, $timeout) {

        var RESOURCE_PERSONS = '/data/persons';

        // ENABLED SCOPE VARIABLES

        $scope.persons = {};
        $scope.ready = false;
        $scope.error = false;
        $scope.success = false;

        // SCOPE METHODS

        $scope.addPerson = function () {
            var new_id = Object.keys($scope.persons).reduce(function (p, c) {
                return p > c ? p : c;
            });
            new_id ++;
            $scope.persons[new_id] = {
                FIO: '',
                Age: '',
                Phone: '',
                Email: ''
            };
        };

        $scope.saveList = function () {
            var list = Object.keys($scope.persons).reduce(function (p, id) {
                var item = $scope.persons[id];
                if (!item.removed && !!item.FIO) {
                    p[id] = item;
                }
                return p;
            }, {});
            return $http.put(RESOURCE_PERSONS, list)
                .then(function () {
                    $scope.success = 'Сохранение данных успешно завершено';
                    $timeout(function () {
                        $scope.success = false;
                    }, 1000);
                });
        }

        $scope.loadList = function () {
            return $http.get(RESOURCE_PERSONS)
                .then(loadPersons, throwError);
        }

        // SCOPE LOGIC

        function loadPersons (res)  {
            $scope.persons = res.data;
            Object.keys($scope.persons).forEach(function(id) {
                $scope.persons[id].Age = Number($scope.persons[id].Age);
            });
        }

        function throwError (res) {
            $scope.error = [
                'Серверная ошибка',
                res.data
            ].join(': ');
        }

        $scope.loadList()
            .then(function () {
                $scope.ready = true;
            });

    }]);

} (angular));