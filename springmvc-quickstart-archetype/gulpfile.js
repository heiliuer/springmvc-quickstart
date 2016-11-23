var gulp = require('gulp');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var concatVendor = require('gulp-concat-vendor');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css')
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var runSequence = require('gulp-run-sequence');
var gzip = require('gulp-gzip');
var clone = require('gulp-clone');
clean = require("gulp-clean");
var series = require('stream-series');

var vendorJs;
var vendorCss;

var warFolder = argv.warFolder

targetFolder = 'target/' + warFolder

console.log("######## targetFolder", targetFolder);

gulp.task('lib-js-files', function () {
    vendorJs = gulp.src(mainBowerFiles('**/*.js'), {base: 'bower_components'})
        .pipe(concatVendor('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(targetFolder + '/resources/vendor/js'));

    vendorJs.pipe(clone())
        .pipe(gzip())
        .pipe(gulp.dest(targetFolder + '/resources/vendor/js'));
});

gulp.task('lib-css-files', function () {
    vendorCss = gulp.src(mainBowerFiles('**/*.css'), {base: 'bower_components'})
        .pipe(concat('lib.min.css'))
        .pipe(minify())
        .pipe(gulp.dest(targetFolder + '/resources/vendor/css'));

    vendorCss.pipe(clone())
        .pipe(clone())
        .pipe(gzip())
        .pipe(gulp.dest(targetFolder + '/resources/vendor/css'));
});

//清理输出
// gulp.task("clean", function () {
//     return gulp.src("src/main/webapp_target/**", {read: false})
//         .pipe(clean());
// });

gulp.task('html', function () {
    var target = gulp.src("src/main/webapp/WEB-INF/**/*.{jsp,html,xml}");
    var sources = gulp.src(['src/main/webapp/resources/js/*.js', 'src/main/webapp/resources/css/*.css'], {read: false});
    return target.pipe(inject(series(vendorJs, vendorCss, sources), {relative: true}))
        .pipe(gulp.dest(targetFolder + '/WEB-INF/'));
});

gulp.task('copyFonts', function () {
    gulp.src(mainBowerFiles('**/dist/fonts/*.{ttf,woff,woff2,eof,svg}'))
        .pipe(gulp.dest(targetFolder + '/resources/vendor/fonts'));
});

// Default Task
gulp.task('default', function () {
    runSequence('lib-js-files', 'lib-css-files', 'html', 'copyFonts');
});