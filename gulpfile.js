// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'assets/js/';

gulp.task('js', function () {

    var jsFiles = ['bower_components/*'];
    console.log(plugins.mainBowerFiles());
    gulp.src(plugins.mainBowerFiles())
	.pipe(plugins.filter('*.js'))
	.pipe(plugins.concat('test.js'))
	.pipe(gulp.dest(dest));

    //gulp.src(plugins.mainBowerFiles())
	//	.pipe(plugins.filter('*.js'))
	//	.pipe(plugins.concat('main.js'))
	//	.pipe(plugins.uglify())
	//	.pipe(gulp.dest(dest + 'js'));

});