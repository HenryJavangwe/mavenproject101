$('.carousel-courses').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
});

var owl1 = $('.carousel-courses');
owl1.owlCarousel();
// Go to the next item
$('.nextBtn1').click(function() {
    owl1.trigger('next.owl.carousel');
})

// Career Services Carousel
$('.careers').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
});

var owl2 = $('.careers');
owl2.owlCarousel();
// Go to the next item
$('.nextBtn2').click(function() {
    owl2.trigger('next.owl.carousel');
}) 
