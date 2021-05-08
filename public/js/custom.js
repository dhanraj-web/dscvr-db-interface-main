function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


// website loder//
$(window).on("load", function () {
  // will first fade out the loading animation
  $(".loader-inner").fadeOut();
  // will fade out the whole DIV that covers the website.
  $(".container2").fadeOut("slow");
});



$('.sponsors-ul').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  autoplay: true,
  slidesToScroll: 1,
  responsive: [
  {
  breakpoint: 1025,
  settings: {
  slidesToShow: 2,
  slidesToScroll: 2,
  infinite: true,
  dots: false,
  }
  },
  {
  breakpoint: 600,
  settings: {
  slidesToShow: 2,
  slidesToScroll: 2
  }
  },
  {
  breakpoint: 480,
  settings: {
  slidesToShow: 1,
  slidesToScroll: 1
  }
  }
  // You can unslick at a given breakpoint now by adding:
  // settings: "unslick"
  // instead of a settings object
  ]
  });