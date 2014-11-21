var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  return gulp.src(['./*.js',
    './routes/*.js',
    './public/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('develop', ['lint'], function () {
  nodemon({ script: 'server.js', ext: 'html js', /*ignore: ['ignored.js']*/ })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
})
