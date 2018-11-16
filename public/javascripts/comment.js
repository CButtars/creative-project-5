angular.module('comment', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.comments = [];
            $scope.addComment = function() {
                var newcomment = { title: $scope.formContent, name: $scope.nameContent, votes: 0 };
                $http.post('/comments', newcomment).success(function(data) {
                    $scope.comments.push(data);
                });
                $scope.formContent = '';
            };
            $scope.getAll = function() {
                return $http.get('/comments').success(function(data) {
                    angular.copy(data, $scope.comments);
                });
            };
            $scope.getAll();
            $scope.incrementVotes = function(comment) {
                $http.put('/comments/' + comment._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        comment.votes += 1;
                    });
            };
            $scope.decrementVotes = function(comment) {
                $http.put('/comments/' + comment._id + '/downvote')
                    .success(function(data) {
                        console.log("downvote worked");
                        comment.votes -= 1;
                    });
            };
            $scope.delete = function(comment) {
                $http.delete('/comments/' + comment._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);
