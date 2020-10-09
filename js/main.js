$(document).ready(function() {
    $('.inputfile').change(function() {
        if (this.files[0]) { // если выбрали файл 
            let el = $('.inputfile + label');
            $(el).text(this.files[0].name);
            $(this).addClass('active');
        }
    }); 
    
    //slider
    $('.slider').each(function(i, el){
        $(el).find('.slider__inner').on('init reInit', function(e, s, c, n){
            $(el).addClass('first-step');
        });

        $(el).find('.slider__inner').on('beforeChange', function(e, s, current, next){
            if (next == 5) {
                $(el).find('.js-next').addClass('js-form-submit');
            } else{
                $(el).find('.js-next').removeClass('js-form-submit');
            }

            if (next != 0) {
                $(el).removeClass('first-step');
            } else{
                $(el).addClass('first-step');
            }
        });

        $(el).find('.slider__inner').slick({
            infinite: false, 
            draggable: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: true,
            arrows: false,
            autoplay: false,
            swipe: false,
            keyboard: false,
            infinite: false,
            // appendArrows: $('.slider-btn'),
            // nextArrow: '<button type="submit" class="slick-btn slick-next"></button>',
            // prevArrow: '<button type="submit" class="slick-btn slick-prev"></button>',
        });

        $(el).delegate('.js-next:not(.js-form-submit)', 'click', function(e){
            e.preventDefault();
            // e.stopPropagation();

            console.log('js-next');

            if (checkFields()) {
                $(el).find('.slider__inner').slick('slickNext');
            }
        });

        $(el).delegate('.js-form-submit', 'click', function(e){
            e.preventDefault();
            // e.stopPropagation();

            $(el).find('form').submit();
        });

        $(el).find('.js-prev').click(function(e){
            e.preventDefault();
            e.stopPropagation();

            $(el).find('.slider__inner').slick('slickPrev');
        });

        function checkFields(){
            let isValid = false;

            return isValid;
        }
    });



    $('.btn.fw-black').on('click', function() {
        $('body').toggleClass('slider-active');
    });
    $('#form-end').on('click', function() {
        $('body').toggleClass('slider-active');
        $('body').addClass('slider-end');
    });

    // Validate
    $("#page-form").validate({
        rules: {
            "project-name": {
                required: true,
                minlength: 2
            },
            genre: {
                required: true
            }
        },
        onfocusout: true,
        onkeyup: true,
        submitHandler: function(form) {
            // $(form).submit();
            ajaxSubmit( $(form), callback );
        },
        // errorPlacement: function(error, element) {
        //     // $(element).closest('.form-row').append(error);
        // },
    });

    function callback(){}

    function ajaxSubmit(form, modalID, redirect){
        var form_data = form.serialize();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: form_data,
            success: function(form) {
                $(form).trigger('reset');

                if (redirect !== undefined) {
                    window.location.href = redirect;
                } else{
                    if (modalID !== false) {
                        hideModal('.modal');
                        showModal(modalID);
                    } else{
                        console.log('js-submit');
                        $('.slider__inner').slick('slickNext');
                    }
                }
            }
        });
    }
});