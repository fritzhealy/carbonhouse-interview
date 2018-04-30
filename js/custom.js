(function($){
    $(document).ready(function(){
        $('.event').matchHeight();
        $('.blocks').matchHeight();
        $.fn.matchHeight._maintainScroll = true;

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
            load_slider();
        });

        function load_slider(){
            //init slider for social posts
            var $frame = $('.plugin.social .view.active >.row-2').eq(0);                
            var running_width = 0;
            var max_height = 0;
            $frame.find('.post').each(function(j, post){
                var $post = $(post);
                if($post.height()>max_height){
                    max_height = $post.height();
                }
                $post.css({
                    position: 'absolute',
                    top: 0,
                    left: running_width
                });
                running_width += $post.width() + 12;
            });
            $frame.height(max_height);
            $frame.find('.post').each(function(j, post){
                $(post).css({
                    height: '100%'
                });
            });
            $('.blocks').matchHeight();
        }

        //initial load
        load_slider();
        
        //move function
        var double_tap_block = false;
        $('.plugin.social .view >.row-1 >.col-2 .fa').click(function(){
            if(!double_tap_block){
                double_tap_block = true;
                var $this = $(this);
                var $frame = $(this).parents('.view').eq(0).find('>.row-2');
                var $posts = $frame.find('.post');
                var width = $posts.eq(0).width();
                var posts_count = $posts.length;
                var counter = 0;
                if($this.hasClass('fa-angle-left')){
                    $posts.each(function(i,post){
                        var $post = $(post);
                        var position = parseFloat($post.css('left'));
                        position -= width + 12;
                        $post.animate({
                            left: position
                        },200, function(){
                            counter +=1;
                            if(counter === posts_count){
                                $posts.each(function(j, out_of_frame){
                                    var $out_of_frame = $(out_of_frame);
                                    if(parseInt($out_of_frame.css('left'))<0){
                                        var $append = $out_of_frame.detach();
                                        var frame_width = parseInt($posts.eq(-1).css('left'))+width;
                                        $append.css('left',(frame_width+12));
                                        $frame.append($append);
                                    }
                                    if(j+1 === posts_count){
                                        double_tap_block = false;
                                    }
                                });
                            }
                        });
                    });
                } else {
                    var $prepend = $posts.eq(-1).detach();
                    $prepend.css('left',(-width-12));
                    $frame.prepend($prepend);
                    $posts.each(function(i,post){
                        var $post = $(post);
                        var position = parseFloat($post.css('left'));
                        position += width + 12;
                        $post.animate({
                            left: position
                        },200, function(){
                            counter +=1;
                            if(counter === posts_count){
                                double_tap_block = false;
                            }
                        });
                    });
                }
            }
        });
    });
})(jQuery);