// Carrega Gulp e plugins
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var csslint = require('gulp-csslint');

// Diretório dos arquivos
var jsfiles = './public/src/js/**/*.js';
var cfiles = './public/src/coffee/**/*.coffee';
var sfiles = './public/src/sass/**/*.sass';
var cssfiles = './public/src/css/**/*.css';

var appfile = './app.coffee';
var configcoffee = './config/coffee/*.coffee';
var appfiles = './app/coffee/**/*.coffee';

// Nova tarafa: lint
gulp.task('lint', function() {
	// Selecionar arquivos e rodar tarefas
	return gulp.src(jsfiles)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

// Nova tarefa: dist
gulp.task('dist', function() {
	// Selecionar arquivos e rodar tarefas
	return gulp.src(jsfiles)
			.pipe(concat('./public/dist/js'))
			.pipe(rename('dist.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./public/dist/js'));
});

// Nova tarefa: coffee
gulp.task('coffee', function() {
	return gulp.src(cfiles)
			.pipe(coffee({bare: true}).on('error', gutil.log))
			.pipe(gulp.dest('./public/src/js'));
});

// Nova tarefa: sass
gulp.task('sass', function() {
	return gulp.src(sfiles)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./public/src/css'));
});

// Nova tarafa: lintCss
gulp.task('lintCss', function() {
	// Selecionar arquivos e rodar tarefas
	return gulp.src(cssfiles)
			.pipe(csslint())
			.pipe(csslint.reporter());
});

// Nova tarefa: distCss
gulp.task('distCss', function() {
	// Selecionar arquivos e rodar tarefas
	return gulp.src(cssfiles)
			.pipe(concat('./public/dist/css'))
			.pipe(rename('dist.min.css'))
			.pipe(minifyCss({compatibility: 'ie8'}))
			.pipe(gulp.dest('./public/dist/css'));
});

// Nova tarefa: coffee
gulp.task('appcoffee', function() {
	return gulp.src(appfile)
			.pipe(coffee({bare: true}).on('error', gutil.log))
			.pipe(gulp.dest('./'));
});

// Nova tarefa: coffee
gulp.task('configcoffee', function() {
	return gulp.src(configcoffee)
			.pipe(coffee({bare: true}).on('error', gutil.log))
			.pipe(gulp.dest('./config/js'));
});

// Nova tarefa: coffee
gulp.task('appfcoffee', function() {
	return gulp.src(appfiles)
			.pipe(coffee({bare: true}).on('error', gutil.log))
			.pipe(gulp.dest('./app/js'));
});

// Tarefa default
gulp.task('default', function(callback) {

	runSequence(['appcoffee', 'appfcoffee', 'coffee', 'configcoffee'], ['lint', 'dist'], 'sass', ['lintCss', 'distCss']);

	watch(jsfiles, function() {
		runSequence(['lint', 'dist']);
	});

	watch(cfiles, function() {
		runSequence('coffee', ['lint', 'dist']);
	});

	watch(sfiles, function() {
		runSequence('sass', ['lintCss', 'distCss']);
	});

	watch(cssfiles, function() {
		runSequence(['lintCss', 'distCss']);
	});

	watch(appfile, function() {
		gulp.run('appcoffee');
	});

	watch(configcoffee, function() {
		gulp.run('configcoffee');
	});

	watch(appfiles, function() {
		gulp.run('appfcoffee');
	});
});
