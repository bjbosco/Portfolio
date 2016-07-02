app.controller('aboutMeController', function($scope, $location) {

        // create a message to display in our view
        $scope.message = 'Hello world';
        $scope.skills = _skills;
    });