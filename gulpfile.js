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
    cssSource: 'assets/css/',
    jsDestination: 'public/assets/js/',
    cssDestination: 'public/assets/css/',
};

var name = {
    js_AngularApp: 'app.js',
    js_LibraryBundle: 'lib.js',
    js_min_LibraryBundle: 'lib.min.js'

}
//FTP info
var user = 'bjbosco@brandonbos.co';
var pass = 'c1Ms01337!panel';
var host = 'brandonbos.co';
var port = 21;
var remoteFolder = '/public_html';

// Define default destination folder
var dest = 'public/assets/js/';

gulp.task('js-lib', function () {

    //console.log(plugins.mainBowerFiles('**/*.js'));

    //outputs lib and lib-min
    gulp.src(plugins.mainBowerFiles('**/*.js'))
        .pipe(plugins.concat(name.js_LibraryBundle))
        .pipe(plugins.minify())
        .pipe(gulp.dest(dest));

});

gulp.task('js-app', function () {

    //outputs app.js for all custom angular stuff
    gulp.src(path.appSource + '**/*.js')
        .pipe(plugins.order([
            'app.module.js',
            'app.route.js',
            'app.controller.js',

        ]))
        .pipe(plugins.concat(name.js_AngularApp))
        .pipe(gulp.dest(dest));

});

gulp.task('js', ['js-app', 'js-lib']);
gulp.task('css', ['css-lib']);

gulp.task('css-lib', function () {

    //lib files
    return gulp.src(plugins.mainBowerFiles('**/*.less'))
        .pipe(plugins.less())
        .pipe(gulp.dest(path.cssDestination));
});
gulp.task('css-app', function () {

    //lib files
    return gulp.src(plugins.mainBowerFiles('**/*.less'))
        .pipe(plugins.less())
        .pipe(gulp.dest(path.cssDestination));
});


gulp.task('ftp-deploy', function () {

    var conn = getFtpConnection();

    return gulp.src(path.root + '/**/', { buffer: false })
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
