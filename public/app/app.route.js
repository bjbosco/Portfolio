app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        // .when('/', {
        //     templateUrl : 'app/components/AboutMe/AboutMe.html',
        //     controller  : 'aboutMeController'
        // })

        .when('/', {
            templateUrl: 'app/components/ComingSoon/ComingSoon.html'
            
        })
        .when('/AboutMe.html', {
            templateUrl: 'app/components/AboutMe/AboutMe.html',
            controller: 'aboutMeController'
        })
        .when('/ComingSoon.html', {
            templateUrl: 'app/components/ComingSoon/ComingSoon.html'//,
            //controller  : 'homeController'
        });

});
