var gulp = require('gulp')
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    argv = require('yargs').argv,
    path = require('path');

gulp.task('view', function(){
    var capitalize = function(val){
      return val.charAt(0).toUpperCase() + val.slice(1);
    };

    var name = argv.name;
    var parentPath = argv.parent || '';
    var destinationPath = path.join('app/views', parentPath, name);

    return gulp
      .src('templates/view/**/*')
      .pipe(template({
        name: name,
        upCaseName: capitalize(name)
      }))
      .pipe(rename(function(path){
        path.basename = path.basename.replace('view', name);
      }))
      .pipe(gulp.dest(destinationPath));
  }
);
