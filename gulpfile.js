var bower = require('bower');
var underscore = require('underscore');
var underscoreStr = require('underscore.string');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('bundle-libraries-auto', ['bower'], function(){
  var bowerFile = require('./bower.json');
  var bowerPackages = bowerFile.dependencies;
  var bowerDir = './bower_components';
  var exclude = [];
  var packagesOrder = [];
  var mainFiles = [];

  // Function for adding package name into packagesOrder array in the right order
  function addPackage(name){
    // package info and dependencies
    var info = require(bowerDir + '/' + name + '/bower.json');
    var dependencies = info.dependencies;
    
    // add dependencies by repeat the step
    if(!!dependencies){
      underscore.each(dependencies, function(value, key){
        if(exclude.indexOf(key) === -1){
          addPackage(key);
        }
      });
    }
    
    // and then add this package into the packagesOrder array if they are not exist yet
    if(packagesOrder.indexOf(name) === -1){
      packagesOrder.push(name);
    }
  }

  // calculate the order of packages
  underscore.each(bowerPackages, function(value, key){
    if(exclude.indexOf(key) === -1){ // add to packagesOrder if it's not in exclude
      addPackage(key);
    }
  });

  // get the main files of packages base on the order
  underscore.each(packagesOrder, function(bowerPackage){
    var info = require(bowerDir + '/' + bowerPackage + '/bower.json');
    var main = info.main;
    var mainFile = main;

    // get only the .js file if mainFile is an array
    if(underscore.isArray(main)){
      underscore.each(main, function(file){
        if(underscoreStr.endsWith(file, '.js')){
          mainFile = file;
        }
      });
    }

    // make the full path
    mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;

    // only add the main file if it's a js file
    if(underscoreStr.endsWith(mainFile, '.js')){
      mainFiles.push(mainFile);
    }
  });

  // run the gulp stream
  return gulp.src(mainFiles)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('nodemon', function() {
  return nodemon({
    script: './bin/www',
    ext: 'js html css scss'
  })
  .on('change', ['lint', 'js', 'sass'])
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('client/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
gulp.task('js', function() {
  return gulp.src('client/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

// Default Task
gulp.task('default', ['lint', 'bundle-libraries-auto', 'js', 'sass', 'nodemon']);