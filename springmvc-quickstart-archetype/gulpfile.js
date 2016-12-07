var gulp = require('gulp');
var argv = require('yargs').argv;

var uglify = require('gulp-uglify');
var runSequence = require('gulp-run-sequence');
var gzip = require('gulp-gzip');
var clean = require("gulp-clean");


var useref = require('gulp-useref');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var csso = require('gulp-csso');


var warFolder = argv.warFolder

targetFolder = 'target/' + warFolder

console.log("######## targetFolder", targetFolder);


//清理输出
gulp.task("clean", function () {
    return gulp.src("src/main/webapp_target/**", {read: false})
        .pipe(clean());
});

const ROOT_DIR = 'src/main/webapp/';


var manifestFileFolder = targetFolder + "/resources";

// mini,rev css+js & rev-replace htmls
gulp.task("html", function () {
    var jsFilter = filter("**/*.js", {restore: true});
    var cssFilter = filter("**/*.css", {restore: true});


    var userefFiles = "**/*.{jsp,html,xml}";

    var userefFilter = filter(userefFiles, {restore: true});

    var revFileFilter = filter(['**/*.{js,css}'], {restore: true});


    return gulp.src(ROOT_DIR + userefFiles)
        .pipe(useref({
            searchPath: ROOT_DIR
        }))

        .pipe(jsFilter)
        .pipe(uglify())             // Minify any javascript sources
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        .pipe(csso())               // Minify any CSS sources
        .pipe(cssFilter.restore)

        .pipe(revFileFilter)
        .pipe(rev())                // Rename the concatenated files (but not index.html)
        .pipe(revFileFilter.restore)

        .pipe(revReplace({replaceInExtensions: ['.js', '.css', '.jsp']}))         // Substitute in new filenames

        .pipe(gulp.dest(targetFolder))

        // .pipe(rev.manifest())// Record rev manifest to file
        // .pipe(gulp.dest(manifestFileFolder))


});


gulp.task('copyFonts', function () {
    gulp.src('**/dist/fonts/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest(targetFolder + '/resources/vendor/fonts'));
});

// Default Task
gulp.task('default', function () {
    runSequence('html', 'copyFonts');
});