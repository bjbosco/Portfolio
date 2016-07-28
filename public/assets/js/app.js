var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'app/components/AboutMe/AboutMe.html',
            controller  : 'aboutMeController'
        })

        // .when('/', {
        //     templateUrl: 'app/components/ComingSoon/ComingSoon.html'
            
        // })
        .when('/AboutMe.html', {
            templateUrl: 'app/components/AboutMe/AboutMe.html',
            controller: 'aboutMeController'
        })
        .when('/ComingSoon.html', {
            templateUrl: 'app/components/ComingSoon/ComingSoon.html'//,
            //controller  : 'homeController'
        });

});

// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope, $location) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $scope.navigate = function (path) {
        $location.path(path);
    }
});
app.controller('aboutMeController', function ($scope, $location) {
    $scope.skills = orderSkills(_skills);

    function orderSkills(skillList) {
        var skillArray = [];

        skillList.forEach(function (row) {

            row.forEach(function (skill) {
                skillArray.push(skill);
            });
        });
 
        skillArray.sort(function (a, b) {

            return b.level - a.level;
        })


        var result = [];

        for (var x = 0; x < skillArray.length; x += 3) {

            result.push([skillArray[x], skillArray[x + 1] || null, skillArray[x + 2] || null]);
        }

        console.log(result);
        return result;
    };
}); 
//Navbar controller
// http://jsbin.com/ayigub/2/edit

app.directive("skilltile", function ($interpolate, $compile) {
    return {
        restrict: 'E',
        scope: {
            skill: '=',
        },
        templateUrl: '../app/shared/skillTile/SkillTile.html',
        //template: '<div>hello world</div>'
        link: function ($scope, $element, $attrs) {

            //init
            (function () {

                console.log($element[0]);
                var el = $element[0].querySelector('#bar');
                console.log(el.style.backgroundColor);

                //customize bar
                el.style.width = $scope.skill.level * 20 + '%';
                switch ($scope.skill.level) {
                    case 1:
                        el.style.backgroundColor = '#C20013';
                        break;
                    case 2:
                        el.style.backgroundColor = '#C85B00';
                        break;
                    case 3:
                        el.style.backgroundColor = '#C8A600';
                        break;
                    case 4:
                        el.style.backgroundColor = '#94BF00';
                        break;
                    case 5:
                        el.style.backgroundColor = '#23A900';
                        break;


                }
            })();


        }
    };
});

d3.select(".chart")
    .selectAll("div")
    .data(data)
    .enter().append("div")
    .style("width", function (d) { return d * 10 + "px"; })
    .text(function (d) { return d; });