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