// include the required packages.
var gulp        = require('gulp'),
    data        = require('gulp-data'),
    stylus      = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    rename        = require('gulp-rename'),
    cleanCSS       = require('gulp-clean-css'),
    nib        = require('nib'),
    concat        = require('gulp-concat'),
    fontAwesome = require('font-awesome-stylus'),
    autoprefixer   = require('gulp-autoprefixer');


// Get one .styl file and render
gulp.task('stylusd', function () {
   return gulp.src('app/stylus/**/*.styl')
       .pipe(stylus({
           compress: true,
           use:[nib(), fontAwesome()]
       }))
       .pipe(rename({ suffix: '.min', prefix : '' }))
       .pipe(autoprefixer(['last 15 versions']))
       // .pipe(concat('main.min.css'))
       .pipe(cleanCSS())
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.js',
        'app/js/common.js' // Always at the end
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('build', ['stylusd', 'js'], function() {

    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js',
    ]).pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['stylusd', 'js', 'browser-sync'], function() {
    gulp.watch('app/stylus/**/*.styl', ['stylusd']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);