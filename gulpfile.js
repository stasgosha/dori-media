let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function() {
    return gulp.src('Dori-Media/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('Dori-Media/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function() {
    return gulp.src([
            'node_modules/normalize.css/normalize.css', 
            'node_modules/slick-carousel/slick/slick.css',
            // 'node_modules/rateyo/src/jquery.rateyo.css',

        ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('Dori-Media/css'))
});

gulp.task('script', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/slick-carousel/slick/slick.js',
            // 'node_modules/rateyo/src/jquery.rateyo.js',  
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('Dori-Media/js'))
});

gulp.task('html', function() {
    return gulp.src('Dori-Media/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src('Dori-Media/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "Dori-Media/"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('Dori-Media/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('Dori-Media/*.html', gulp.parallel('html'));
    gulp.watch('Dori-Media/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync')) //'script',