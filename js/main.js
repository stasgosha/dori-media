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

    // Validate
    $("#page-form").validate({
        rules: {
            userName: {
                required: true,
                minlength: 2
            },
            userPhone: {
                required: true
            }
        },
        submitHandler: function(form) {
            // $(form).submit();
            ajaxSubmit( $(form), callback );
        },
        errorPlacement: function(error, element) {
            $(element).closest('.form-row').append(error);
        },
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