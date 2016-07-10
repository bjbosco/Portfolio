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
    cssBuildSource: 'public/assets/css/build/',
    jsDestination: 'public/assets/js/',
    cssDestination: 'public/assets/css/',
    jsBuildSource: 'public/assets/js/build/',
    lessBuildSource: 'public/assets/less/'

};

var name = {
    js_AngularApp: 'app.js',
    js_LibraryBundle: 'lib.js',
    js_min_LibraryBundle: 'lib.min.js',
    js_customCode: 'app-custom.js',
    css_customCode: 'main.css'
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
        .pipe(gulp.dest(path.jsDestination));

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
        .pipe(gulp.dest(path.jsDestination));

    gulp.src(path.jsBuildSource + '**/*.js')
        .pipe(plugins.concat(name.js_customCode))
        .pipe(gulp.dest(path.jsDestination));
});

gulp.task('js', ['js-app', 'js-lib']);
gulp.task('css', ['css-lib']);

gulp.task('css-lib', function () {

    //lib files
    return gulp.src(plugins.mainBowerFiles('**/*.less'))

        .pipe(plugins.less())
        .pipe(gulp.dest(path.cssDestination));
});

gulp.task('less-app', function () {



    //  gulp.src(path.lessBuildSource + '**/*.less')
    gulp.src([path.lessBuildSource + "*.less",
        path.lessBuildSource + "Components/*.less",
        path.lessBuildSource + 'Misc/Lato/lato.less',
        path.lessBuildSource + 'Views/*.less'])
        // .pipe(plugins.order([
        //     'main.less',
        //     'Misc/Lato/lato.less'

        // ]))
        .pipe(plugins.debug())

        .pipe(plugins.less())
        .pipe(plugins.concat(name.css_customCode))
        .pipe(gulp.dest(path.cssDestination));
});

// gulp.task('css-app', function () {

//     //lib files
//   gulp.src(path.cssBuildSource + '**/*.css')
//         .pipe(plugins.concat(name.css_customCode))
//         .pipe(gulp.dest(path.cssDestination));
// });


gulp.task('listen', function () {

    // return plugins.watch([path.assetSource + '**/*.css', path.assetSource + '/less/**/*.less',path.assetSource + 'js/build/**/*.js', 'public/**/*.html',
    // '!' + path.cssDestination + name.css_customCode, '!' + path.jsDestination + name.js_AngularApp, '!' + path.jsDestination + name.js_customCode
    // ], function () {
    //        gulp.start('js-app');
    //        gulp.start('less-app');
    //     });
return plugins.watch([path.assetSource + '**/*.*', path.appSource + '**/*.*',
    '!' + path.cssDestination + name.css_customCode, '!' + path.jsDestination + name.js_AngularApp, '!' + path.jsDestination + name.js_customCode
    ], function () {
           gulp.start('js-app');
           gulp.start('less-app');
        });

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
