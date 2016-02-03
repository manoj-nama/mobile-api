'use strict';

var gulp = require("gulp"),
	inject = require("gulp-inject"),
	concat = require("gulp-concat"),
   spawn = require('child_process').spawn,
	bowerInject = require("main-bower-files"),
   node;


gulp.task("inject", function() {
	console.log("Injecting into home.html");
	var target = gulp.src("./client/home.html"),
		sources = gulp.src(["./client/components/**/*.js", "./client/app/**/*.js", "./client/assets/styles/**/*.css"], {read: false}),
		options = { relative: true };

	return target.pipe(inject(gulp.src(bowerInject(), {read: false}), {name: "bower", relative: true}))
		.pipe(inject(sources, options))
		.pipe(gulp.dest("./client"));
});

gulp.task('scripts', function() {
	return gulp.src(["./client/components/**/*.js", "./client/app/**/*.js"])
		.pipe(concat("application.js"))
		.pipe(gulp.dest("./.build/"));
});

gulp.task('styles', function() {
	return gulp.src(["./client/assets/**/*.css"])
		.pipe(concat("application.css"))
		.pipe(gulp.dest("./.build/"));
});

gulp.task("serve", function () {
   if (node) node.kill();
   node = spawn('node', ['app.js'], {stdio: 'inherit'});
   node.on('close', function (code) {
      if (code === 8) {
         gulp.log('Error detected, waiting for changes...');
      }
   });

   gulp.watch([
      "./client/components/**/*.js",
      "./client/app/**/*.js",
      "./client/app.js",
      "./app.js",
      "./*.json",
      "./server/**/*.js",
      "./client/assets/styles/**/*.css"
   ], function() {
      gulp.run('serve');
   })
});

process.on('exit', function() {
   if (node) node.kill();
});

gulp.task("build", ["scripts", "styles", "inject"], function() {
	console.log("Building for prod..");
});