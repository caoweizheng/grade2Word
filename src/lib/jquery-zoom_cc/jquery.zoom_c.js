;(function($){

    $.fn.cZoom = function(options){

        return this.each(function(){

            // 设置默认值
            let defaults = {
                width:50,
                height:30,
                ratio:3
            }
            // 参数合并
            let opt = $.fn.extend({},defaults,options);
            // 将don元素转成jq对象
            let $this = $(this);

            let $smallImg = $this.children('img');

            $this.addClass('smallImg');
            
            // $smallImg.addClass('img');

            let init = function(){
                let $bigImg = $('<div/>');
                let $img = $('<img/>').appendTo($bigImg);

                let $zoom = $('<div/>');

                // 放大镜   
                $zoom.addClass('zoom');
                $zoom.appendTo($this);

                 $bigImg.addClass('bigImg');

                if($smallImg[0].complete){
                    // 设置大图的宽高
                    $img.css('width',$smallImg.outerWidth() * opt.ratio);
                    $img.css('height',$smallImg.outerHeight() * opt.ratio);


                    $zoom.css('width',$smallImg.outerWidth() / opt.ratio);
                    $zoom.css('height',$smallImg.outerHeight() / opt.ratio);


                }else{

                    $smallImg[0].onload = function(){
                        $img.css('width',$smallImg.outerWidth() * opt.ratio);
                        $img.css('height',$smallImg.outerHeight() * opt.ratio);

                        $zoom.css('width',$smallImg.outerWidth() / opt.ratio);
                        $zoom.css('height',$smallImg.outerHeight() / opt.ratio);
                    }
                }
                      

                 $img.attr('src',$this.children('img').data('big'))

                $bigImg.appendTo($this);
                $('<div/>').addClass('mask').appendTo($this);

                 // 鼠标移入移出
                 $(document).on('mouseenter','.mask',function(){
                    $bigImg.stop().fadeIn(200);
                    $zoom.stop().show();
                 }).on('mouseleave','.mask',function(){
                    $bigImg.stop().fadeOut();
                    $zoom.stop().hide();
                 }).on('mousemove','.mask',function(event){
                         
                 
                    // 隐藏放大镜和大图
                    if(event.target.className != 'mask'){
                        $bigImg.stop().fadeOut(0);
                        $zoom.stop().hide();

                        return;
                    }
                    let ox = event.offsetX - $zoom.width()/2;
                    let oy = event.offsetY - $zoom.height()/2;

                    // 边界判断  左边
                    if(ox < 0){
                        ox = 0;
                        //右边
                    }else if(ox >= $smallImg.width() - $zoom.width() ){
                        ox = $smallImg.width() - $zoom.width();
                    }
                    // 边界判断  上边
                    if(oy < 0){
                        oy = 0;
                        // 下边
                    }else if(oy >= $smallImg.height() - $zoom.height() ){
                        oy = $smallImg.height() - $zoom.height();
                    }

                    // 设置放大镜移动
                    $zoom.css('left',ox);
                    $zoom.css('top',oy);

                    // 设置大图移动
                    $img.css('left',-ox*opt.ratio);
                    $img.css('top',-oy*opt.ratio);
                         
                 })


            }
            // 初始化
            // 创建大图
            // 创建放大镜
            // 鼠标移入小图 放大镜与 大图成倍数移动
            // 处理鼠标边界问题
            // 处理鼠标移出小图问题
            init();

                 
        });

    }

})(jQuery);