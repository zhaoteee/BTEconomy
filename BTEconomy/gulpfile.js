var gulp = require('gulp');


var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

gulp.task('script', function () {
    gulp.src('static/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/static/js'));
});

gulp.task('sass', function () {
    gulp.src('./static/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/static/css'));
});
gulp.task('images', function () {
    gulp.src('static/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/static/images'));
});
gulp.task('copy', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('adminscript', function () {
    gulp.src('_admin_/user/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/_admin_/user/js'));
});

gulp.task('adminmincss', function () {
    gulp.src('_admin_/user/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/_admin_/user/css'));
});
gulp.task('adminimages', function () {
    gulp.src('_admin_/user/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/_admin_/user/images'));
});
gulp.task('admincopyh', function () {
    gulp.src('_admin_/user/*.html')
        .pipe(gulp.dest('dist/_admin_/user/'));
});
gulp.task('admincopyf', function () {
    gulp.src('_admin_/user/css/font/*')
        .pipe(gulp.dest('dist/_admin_/user/css/font/'));
});

gulp.task('server', function () {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            host: "localhost",
            //host: "192.168.1.12",
            //host: "10.0.0.60",
            port:8081,
            proxies: [
                {
                    source : "/lampconsole",
                    // target : "http://app05.udhd.cn:8111/lampconsole"
                    // target : "http://10.0.0.49:8080/lampconsole"
                    target : "http://www.lopkj.cn:8111/lampconsole/"
                }
            ]
        }));
});


gulp.task('default', [
    'script', 'sass', 'copy',
    'adminscript', 'adminmincss', 'admincopyh','admincopyf',
    'server']);