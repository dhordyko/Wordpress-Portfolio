"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var browserSync = require("browser-sync").create();
// var autoprefixer = require('gulp-autoprefixer');
// var cssimport = require("gulp-cssimport");
var fileInclude = require("gulp-file-include");
const webp = require("gulp-webp");
var sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
// Compile sass into CSS & auto-inject into browsers with autoprefixer
gulp.task("include", async function () {
  gulp
    .src("./index.html")
    .pipe(
      fileInclude({
        context: {
          arr: ["test1", "test2"],
        },
      })
    )
    .pipe(gulp.dest("./dist"));
});
gulp.task("sass", function () {
  return gulp
    .src(["./sass/styles.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        style: "compressed",
        errLogToConsole: false,
        onError: function (err) {
          return notify().write(err);
        },
      })
    )
    .pipe(sourcemaps.write("."))

    .pipe(sourcemaps.write("../css"))

    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// watching scss/html files
gulp.task("watch", function (done) {
  browserSync.init({
    open: "external",
    server: {
      baseDir: "./dist/",
    },
    port: 3000,
    reload: true,
  });
  gulp.watch(["./sass/**/*.scss"], gulp.series("sass"));
  gulp
    .watch("./components/*")
    .on("change", gulp.series(gulp.parallel("include"), browserSync.reload));
  gulp.watch("./styles.css").on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp
    .watch("./js/script.js")
    .on("change", gulp.series(gulp.parallel("js"), browserSync.reload));
  done();
});
// JavaScript

gulp.task("js", function () {
  return browserify({
    entries: ["./js/script.js"],
    debug: true,
    transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
  })
    .bundle()
    .pipe(source("script.js"))
    .pipe(gulp.dest("dist"));
});
//Images optimization

gulp.task("images", function () {
  return gulp
    .src("images/**/*.{png,jpg,svg}")
    .pipe(
      webp({
        preset: "photo",
        alphaQuality: 100,
        quality: 100,
        method: 5,
        sns: 100,
        autoFilter: true,
        sharpness: 7,
        lossless: true,
      })
    )
    .pipe(gulp.dest("dist/images"));
});
// Data

gulp.task("data", function () {
  gulp.src("./data/CV-Daria_Khordykova-CA.pdf").pipe(gulp.dest("dist"));
});

// default task
gulp.task(
  "default",
  gulp.series(
    gulp.parallel("include"),
    gulp.parallel("sass"),
    gulp.parallel("js"),
    gulp.parallel("watch"),
    gulp.parallel("images"),
    gulp.parallel("data")
  )
);
