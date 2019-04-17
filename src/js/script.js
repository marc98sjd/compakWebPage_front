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
                margin: 50,
                animateOut: 'fadeOut',
                responsiveClass:true,
                nav: false
            }
        }
    });
});

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

let altura = $(".noticias").height();
function setTwitterHeight(altura) {
    $(".twitter-timeline").attr('data-height', altura);
}

includeHTML();
setTwitterHeight(altura);