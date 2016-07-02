// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope, $location) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $scope.navigate = function (path) {
        $location.path(path);
    }
});