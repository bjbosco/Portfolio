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
