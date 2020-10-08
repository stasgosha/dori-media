$(document).ready(function() {
    $('.inputfile').change(function() {
        if (this.files[0]) { // если выбрали файл 
            let el = $('.inputfile + label');
            $(el).text(this.files[0].name);
            $(this).addClass('active');
        }
    }); 
    
    //slider
    $('.slider__inner').slick({
        infinite: false, 
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: true,
        appendArrows: $('.slider-btn'),
        nextArrow: '<button type="submit" class="slick-btn slick-next"></button>',
        prevArrow: '<button type="submit" class="slick-btn slick-prev"></button>',
    });
    $('.btn.fw-black').on('click', function() {
        $('body').toggleClass('slider-active');
    });
    $('#form-end').on('click', function() {
        $('body').toggleClass('slider-active');
        $('body').addClass('slider-end');
    });
});