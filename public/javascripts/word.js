angular.module('word', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.defins = $scope.defs;
            $scope.addDef = function() {
                var newdef = { title: $scope.formContent, votes: 0 };
                $http.post('/comments', newdef).success(function(data) {
                    $scope.defins.push(data);
                });
                $scope.formContent = '';
            };
            $scope.getAll = function() {
                return $http.get('/comments').success(function(data) {
                    angular.copy(data, $scope.defins);
                });
            };
            $scope.getAll();
            /*$scope.incrementVotes = function(word) {
                $http.put('/comments/' + word._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        word.votes += 1;
                    });
            };
            $scope.decrementVotes = function(word) {
                $http.put('/comments/' + word._id + '/downvote')
                    .success(function(data) {
                        console.log("downvote worked");
                        word.votes -= 1;
                    });
            };
            $scope.delete = function(word) {
                $http.delete('/comments/' + word._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };*/
        }
    ]);
