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