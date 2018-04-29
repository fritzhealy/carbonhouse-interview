(function($){
    $(document).ready(function(){
        $('.event').matchHeight();
        $('.blocks').matchHeight();

        var $mobile = $('#mobile-menu');
        $('#hamburger').click(function(){
            if($mobile.hasClass('active')){
                $mobile.animate({
                    left: '-100%'
                }, 200, function(){
                    $mobile.removeClass('active');
                });
            } else {
                $mobile.addClass('active').animate({
                    left: 0
                },200);
            }
        });
        $('#close-menu').click(function(){
            $mobile.animate({
                left: '-100%'
            }, 200, function(){
                $mobile.removeClass('active');
            });
        })
    });
})(jQuery);