var gulp = require("gulp");
var watch = require('gulp-watch');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var outputDir = './static/js';

gulp.task("default", function(){
    return watch('static/ts/**/*.ts', function (file) {

        console.log("Change in: \n" + file.history.join('\n'));

        return tsProject.src()
            .pipe(tsProject())
            .js.pipe( gulp.dest(outputDir) );
    });
});