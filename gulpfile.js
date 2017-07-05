var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public/"
        },
        notify: false
    });
});

//pug
gulp.task('pug', function() {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.stream());
});


//bower
gulp.task('bower', function () {
    gulp.src('src/bower_components/**/*.*')
        .pipe(gulp.dest('public/bower_components'))
});


//css
gulp.task('css', function () {
   gulp.src('src/sass/**/*.*')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 10 version', 'ie 9'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

//scripts

gulp.task('scripts', function() {
    return gulp.src([
        'src/libs/slick.min.js',
        'src/libs/materialize/waves.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());
});


//img
gulp.task('img', function () {
    gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('public/img'))
       // .pipe(browserSync.stream());
});


//js
gulp.task('js', function () {
    gulp.src('src/js/**/*.*')
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());
});


//fonts
gulp.task('fonts', function () {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('public/fonts'))
        .pipe(browserSync.stream());
});



// watch
gulp.task('watch', function () {
    //gulp.watch('src/*.html', ['html']);
    gulp.watch('src/template/**/*.html', ['html']);
    gulp.watch('src/sass/**/*.scss', ['css']);
    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/libs/**/*.js', ['scripts']);
    gulp.watch('src/img/**', ['img']);
    gulp.watch('src/fonts/**', ['fonts']);
    gulp.watch('src/bower/**', ['bower']);
});

//default
gulp.task('default', [ 'browser-sync', 'pug', 'css', 'img', 'js', 'scripts', 'fonts', 'watch', 'bower']);