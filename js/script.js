var Masonry = require("masonry-layout");
var imagesLoaded = require("imagesloaded");
var $ = require("jquery");
var data = require("../data/projects.json");
(function ($) {
  $(".technologies-container").each(function (index) {
    let tech_list = $(this);
    data[index]["technologies"].forEach(function (item, i) {
      tech_list.append(`<li>${item}<span>,</span></li>`);
    });
  });
})($);

var grid = document.querySelector(".card-list-container");
var msnry = new Masonry(grid, {
  // options...
  itemSelector: ".card-item",
  // use element for option
  columnWidth: ".grid-sizer",
  percentPosition: true,
  gutter: 20,
});

imagesLoaded(function () {
  msnry.layout();
});

(function ($) {
  $(".about-me__link").on("click", function (e) {
    e.preventDefault();
    $(".history-section").toggleClass("open").slideToggle();
  });
  $("nav li a[href='#about_me']").on("click", function (e) {
    e.preventDefault();

    if ($(".history-section").hasClass("open")) {
      $("html, body").animate(
        {
          scrollTop: $("#history").offset().top,
        },
        1000
      );
      return;
    } else {
      $(".history-section").toggleClass("open").slideToggle();
      $("html, body").animate(
        {
          scrollTop: $("#history").offset().top,
        },
        1000
      );
    }
  });
})($);

//Header JS functionality

(function ($) {
  $(".toggle-btn").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("toggled");
    $("header .main-header__inner-container ").slideToggle();
  });
})($);
(function ($) {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $("header .main-header__inner").addClass("scrolled");
    } else {
      $("header .main-header__inner").removeClass("scrolled");
    }
  });
})($);
