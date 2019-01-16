const gulp = require("gulp");
const sass = require("gulp-sass")
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");

// Open in the Browser
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./app/"
        },
        port: 3000
    });


    done();
}

// BrowserSync Reload
function browserSyncReload() {
    browsersync.reload();
}

//html function

function htmlFun() {
    return gulp.src("./src/*html")
        .pipe(gulp.dest('./app/'));
}

// CSS task
function cssFun() {
    return gulp
        .src("./src/scss/app.scss")
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(gulp.dest("./app/css/"))
        .pipe(rename({suffix: ".min"}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./app/css/"))
        .pipe(browsersync.stream());
}

function jsFun() {
    return (
        gulp.src('./src/js/*.js')
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./app/js/'))
            .pipe(browsersync.stream())
    );
}


function myClean() {
    return del(["./app/*.html","./app/js/*.js","/app/css/*.css"]);
}


function watchFiles() {
    gulp.watch(["./src/scss/**/*","./src/scss/*"], cssFun).on('change', browserSyncReload);;
    gulp.watch("./src/js/*", jsFun).on('change', browserSyncReload);;
    gulp.watch("./src/*.html", htmlFun).on('change', browserSyncReload);;
}


gulp.task('html', htmlFun );
gulp.task('css', cssFun );
gulp.task('js', jsFun );
gulp.task('clean', myClean );

const build = gulp.series(myClean, gulp.parallel(htmlFun, jsFun,  cssFun ));
const watch = gulp.parallel(watchFiles , browserSync );

exports.watch = watch;
exports.build = build;


