var app = angular.module('app', ['ngRoute']);

  
 app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/components/Home/Home.html',
                controller  : 'homeController'
            })

            // route for the about page
            .when('/ComingSoon.html', {
                templateUrl : 'app/components/ComingSoon/ComingSoon.html'//,
                //controller  : 'homeController'
            });

            // // route for the contact page
            // .when('/contact', {
            //     templateUrl : 'pages/contact.html',
            //     controller  : 'contactController'
            // });
    });

// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope, $location) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $scope.navigate = function (path) {
        $location.path(path);
    }
});
app.controller('homeController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Hello world';
    });
//Navbar controller