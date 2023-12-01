var Masonry = require("masonry-layout");
var imagesLoaded = require("imagesloaded");
var $ = require('jquery');
var data = require('../data/projects.json');
(function ($) {

  $('.technologies-container').each(function(index){
    let tech_list = $(this);
   data[index]['technologies'].forEach(function(item, i){
    tech_list.append(`<li>${item}<span>,</span></li>`);
   })
  })
  })($);
 
var grid = document.querySelector('.card-list-container');
var msnry = new Masonry( grid, {
  // options...
  itemSelector: '.card-item',
  // use element for option
  columnWidth: '.grid-sizer',
  percentPosition: true,
  gutter: 20
});
 
imagesLoaded(function(){
  msnry.layout();
}); 

(function ($) {
$('.about-me__link').on('click', function(e){
  e.preventDefault();
$('.history-section').slideToggle();
 
})
  })($);