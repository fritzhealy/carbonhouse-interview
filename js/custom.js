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
        });
        
        var $list = $('#list');
        var $grid = $('#grid');
        var $events_wrapper = $('#events-wrapper');
        $list.click(function(){
            $events_wrapper.removeClass('grid');
            $events_wrapper.addClass('list');
            $list.addClass('active');
            $grid.removeClass('active');
            $('.event').css('height','');
        });
        $grid.click(function(){
            $events_wrapper.removeClass('list');
            $events_wrapper.addClass('grid');
            $grid.addClass('active');
            $list.removeClass('active');
            $('.event').matchHeight();
        });

        var $views = $('.plugin.social .view');
        var $tabs = $('.plugin.social .social.bar li');
        $tabs.click(function(){
            var $this = $(this);
            $tabs.removeClass('active');
            $views.removeClass('active');
            $this.addClass('active');
            $views.filter(function(i, el){
                return $this.data('source') === $(el).data('source');
            }).addClass('active');
        });
    });
})(jQuery);