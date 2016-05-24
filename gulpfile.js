"use strict";

//var path = require("path");
var gulp = require("gulp");
var babel = require('gulp-babel'); // ES6 -> ES5 for javascript.
var sourcemaps = require("gulp-sourcemaps"); // Create Source Maps for CSS, JS
var less = require("gulp-less"); // Convert Less to CSS
var cssnano = require("gulp-cssnano"); // Minify CSS
var concat = require("gulp-concat"); // Make many files into one.
//var uglify = require("gulp-uglify"); // Minify JS
var htmlmin = require('gulp-htmlmin'); // Minify HTML
var templateCache = require('gulp-angular-templatecache'); // Pre-Cache HTML

var paths = {
    dist: "./llr/"
};



// Less => CSS
gulp.task("css", function () {
    return gulp.src("./src/css/style.less")
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: ["./src/css/overrides"]
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dist));
});

// Minify and template cache html files.
gulp.task("html", function () {
    return gulp.src("./src/app/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache({
            module: "app",
            root: "app/"
        }))
        .pipe(gulp.dest(paths.dist));
});


// JS All Vendor Scripts into one file.
gulp.task("vendor-script", function () {
    return gulp.src([
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-cookies/angular-cookies.min.js",
        "./node_modules/angular-animate/angular-animate.min.js",
        "./node_modules/angular-aria/angular-aria.min.js",
        "./node_modules/angular-animate/angular-animate.min.js",
        "./node_modules/angular-sanitize/angular-sanitize.min.js",
        "./node_modules/angular-toastr/dist/angular-toastr.tpls.min.js",
        "./node_modules/angular-material/angular-material.min.js"
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(paths.dist));
});

// CSS All Vendor CSS into one file.
gulp.task("vendor-css", function () {
    return gulp.src([
        //"./node_modules/angular-material/angular-material.min.css",
        "./node_modules/angular-toastr/dist/angular-toastr.min.css"
    ])
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest(paths.dist));
});


// JS All Javascript (other than vendors) minified into one file.
gulp.task("script", function () {
    return gulp.src("./src/app/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ["es2015"] }))
        //.pipe(uglify())       disable to allow debugging on the browser
        .pipe(concat("script.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dist));
});

gulp.task("index", function () {
   return gulp.src("./src/index.html")
   .pipe(gulp.dest(paths.dist)); 
});

gulp.task("build", ["css", "html", "index", "vendor-script", "vendor-css", "script"]);

gulp.task("watch", function () {
    gulp.watch("./src/index.html", ["index"]);
    gulp.watch("./src/app/**/*.js", ["script"]);
    gulp.watch("./src/app/**/*.html", ["html"]);
    gulp.watch("./src/css/**/*.less", ["css"]);
});