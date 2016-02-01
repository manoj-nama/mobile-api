'use strict';

var gulp = require("gulp"),
	inject = require("gulp-inject"),
	concat = require("gulp-concat"),
	bowerInject = require("main-bower-files");


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

gulp.task("build", ["scripts", "styles", "inject"], function() {
	console.log("Building for prod..");
});