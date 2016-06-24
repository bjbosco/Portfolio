// Include Gulp
var gulp = require('gulp');
var ftp = require('vinyl-ftp');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

//Relivent paths
var path = {
    root: 'public/',
    appSource: 'public/app/',
    assetSource: 'public/assets/',
    jsDestination: 'public/assets/js/',
    cssDestination: 'public/assets/css/',
};

var name = {
    js_AngularApp: 'app.js',
    js_LibraryBundle: 'lib.js',
    js_min_LibraryBundle: 'lib.min.js'

}
var user = 'bjbosco@brandonbos.co';
var pass = 'c1Ms01337!panel';
var host = 'brandonbos.co';
var port = 21;
var remoteFolder = '/public_html';

// Define default destination folder
var dest = 'public/assets/js/';

gulp.task('js', function () {

    //console.log(plugins.mainBowerFiles('**/*.js'));

    //outputs lib and lib-min
    gulp.src(plugins.mainBowerFiles('**/*.js'))
	.pipe(plugins.concat(name.js_LibraryBundle))
    .pipe(plugins.minify())
	.pipe(gulp.dest(dest));


    //outputs app.js for all custom angular stuff
    gulp.src(path.appSource + '**/*.js')
	.pipe(plugins.concat(name.js_AngularApp))
	.pipe(gulp.dest(dest));

});

gulp.task('ftp-deploy', function () {

    var conn = getFtpConnection();

    return gulp.src(path.root +'/**/', { buffer: false })
        .pipe(conn.newer(remoteFolder)) // only upload newer files 
        .pipe(conn.dest(remoteFolder));
});

gulp.task('default', ['js', 'css']);

//TOOLS
function getFtpConnection() {
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: pass,
        parallel: 5,
        log: plugins.log
    });
}
