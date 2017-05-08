var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchPath = require("gulp-watch-path");

gulp.task("toes5", function(){
    return gulp.src('app/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
})

gulp.task("auto", function(){
    gulp.watch("app/js/*.js",function(event){
        var paths = watchPath(event,"app/js","dist/js");
        gulp.src(paths.srcPath)
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.distDir))
    })
    gulp.watch("app/js/*.js",["browserify"])
    //gulp.watch("app/js/*.js",["browserify"])
})

gulp.task("browserify", function () {
    var b = browserify({
        entries: "dist/js/doView.js"
    });
    return b.bundle()
        .pipe(source("doView.js"))
        .pipe(gulp.dest("dist/script"));
});

gulp.task("default", ["toes5","browserify","auto"])