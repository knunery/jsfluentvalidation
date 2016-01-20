var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('watch', function() {
	gulp.watch(['src/**/*.js'],['scripts']);
});

gulp.task("scripts", function () {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('default', ['scripts', 'watch']);