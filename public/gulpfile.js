var gulp = require('gulp'),
		cssPrefixer = require('gulp-autoprefixer'),
		cssMin = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		jsMin = require('gulp-uglify'),
		watch = require('gulp-watch'),
		rimraf = require('rimraf'),
		browserify = require('gulp-browserify'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload;

/*------------------------------------*\
		#PATH
\*------------------------------------*/

var path = {
	dist:{
		html:'./dist/',
		css:'./dist/css/',
		js:'./dist/js/',
		img:'./dist/images/',
		font:'./dist/fonts/',
		libs:'./dist/libs/'
	},

	src:{
		html:'./src/*.html',
		css:'src/sass/index.scss',
		js:'src/js/App.js',
		img:'src/images/**/*.*',
		font:'src/fonts/**/*.*',
		libs:'src/libs/**/*.*'
	},

	watch:{
		html:'./src/*.html',
		css:'src/sass/**/*.*',
		js:'src/js/**/*.*',
		img:'src/images/**/*.*',
		font:'src/fonts/**/*.*'
	},

	clean:'./dist/'
};

/*------------------------------------*\
		#CONFIG SERVER
\*------------------------------------*/

var config = {
		server: {
				baseDir: "./dist"
		},
		tunnel: false,
		host: 'localhost',
		port: 8080,
		logPrefix: "Front-end"
};

/*------------------------------------*\
		#TASKS
\*------------------------------------*/

// #server
gulp.task('webserver', function () {
		browserSync(config);
});

// #clean
gulp.task('clean', function (cb) {
		rimraf(path.clean, cb);
});

// #html
gulp.task('html', function () {
		gulp.src(path.src.html)
				.pipe(gulp.dest(path.dist.html))
				.pipe(reload({stream: true}));
});

// #javascript
gulp.task('js', function () {
	gulp.src(path.src.js)
		.pipe(browserify({
				}))
		.pipe(jsMin())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(path.dist.js))
		.pipe(reload({stream: true}));
});

// #libs
gulp.task('libs',function(){
	gulp.src(path.src.libs)
		.pipe(gulp.dest(path.dist.libs));
});

// #sass
gulp.task('style', function () {
		gulp.src(path.src.css)
				.pipe(sass({
				}).on('error',sass.logError))
				.pipe(cssPrefixer({
						browsers: ['last 10 versions'],
						cascade: false
				}))
				.pipe(cssMin())
				.pipe(rename('app.min.css'))
				.pipe(gulp.dest(path.dist.css))
				.pipe(reload({stream: true}));
});

//ie8 sass
gulp.task('styleie8',function(){
	gulp.src('./src/sass/ie8.scss')
		.pipe(sass({}))
		.pipe(cssPrefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(cssMin())
		.pipe(rename('ie8.css'))
		.pipe(gulp.dest(path.dist.css))
		.pipe(reload({stream: true}));
});

// #images
gulp.task('image', function () {
		gulp.src(path.src.img)
				.pipe(gulp.dest(path.dist.img))
				.pipe(reload({stream: true}));
});

// #fonts
gulp.task('fonts', function() {
		gulp.src(path.src.font)
				.pipe(gulp.dest(path.dist.font));
});

/*------------------------------------*\
		#BUILD TASK
\*------------------------------------*/

gulp.task('build', [
		'html',
		'js',
		'style',
		'styleie8',
		'fonts',
		'image',
		'libs'
]);

/*------------------------------------*\
		#WATCH TASK
\*------------------------------------*/

gulp.task('watch', function(){
		watch([path.watch.html], function(event, cb) {
				gulp.start('html');
		});
		watch([path.watch.css], function(event, cb) {
				gulp.start('style');
		});
		watch([path.watch.js], function(event, cb) {
				gulp.start('js');
		});
		watch([path.watch.img], function(event, cb) {
				gulp.start('image');
		});
		watch([path.watch.font], function(event, cb) {
				gulp.start('fonts');
		});
		watch(['src/config.js'], function(event, cb) {
				gulp.start('js');
		});
});

/*------------------------------------*\
		#DEFAULT TASK
\*------------------------------------*/

gulp.task('default', ['build', 'webserver', 'watch']);