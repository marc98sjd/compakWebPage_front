$(document).ready(function(){
    $(".owl-carousel").owlCarousel({

        responsive:{
            0:{
                items:1,
                margin: 10,
                animateOut: 'fadeOut',
                responsiveClass:true,
                nav: false
            },
            600:{
                items:3,
                margin: 10,
                animateOut: 'fadeOut',
                responsiveClass:true,
                nav:false
            },
            1000:{
                items:5,
                margin: 25,
                animateOut: 'fadeOut',
                responsiveClass:true,
                nav: false
            }
        }
    });
});

function hover(element) {
    var src = element.getAttribute('src');
    var res = src.replace("png", "jpg");
    element.setAttribute('src', res);
}

function unhover(element) {
    var src = element.getAttribute('src');
    var res = src.replace("jpg", "png")
    element.setAttribute('src', res);
}