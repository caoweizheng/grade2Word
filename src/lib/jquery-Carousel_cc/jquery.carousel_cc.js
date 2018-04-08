;(function($){

    $.prototype.carousel_c = function(options){

        //这里的this指向的是调用这个轮播图方法的 jQuery对象 $(ele)
        
        this.each(function(){
            // 这里的this指向的是DOM节点 ele
            // 轮播图的默认值
            let defaults = {
                width:810,
                height:320,
                // 轮播时间
                durlation:3500,
                // 轮播图的类型
                type:"fade",
                // 默认显示
                index:0,
                // 是否分页
                page:true,
                button:true,
                touch:true,
                // className:''
                // btnImg:[]
            }
            // 将当前dom节点转成jq对象
            let $this = $(this);
            // 传入的参数与默认的参数合并
            // 没有传入的参数优先选取options中的
            let opt = $.fn.extend({},defaults,options);

            // 传入的图片个数
            opt.len = opt.imgs.length;

            let $pages;
            // 分页的索引
            let pageIdx = opt.index;

            // 记录当前的索引值
            let currentIdx = opt.index;

            let navBg = ['#0E0F13','#070707','#564945','#030202','#000000','#151414','#45070C'];
            $('.nav').css('background',navBg[currentIdx]);

            let init = (opt)=>{

                $this.addClass('carousel_C');
                $this.css('height',opt.height);
                let $ul = $('<ul/>');
                     
                // 遍历传入的图片数组
                let res = $.map(opt.imgs,function(imgUrl,idx){
                    // 添加结构
                    let $li = $('<li/>');

                    let $img = $('<img/>');

                    $img.attr('src',imgUrl);

                    $img.appendTo($li);

                    return $li; 
                });//[$li,$li,$li]
                // 将轮播图添加到容器
                $ul.append(res).appendTo($this);

                // 将第一张图片复制到轮播图的最后面
                $ul.find('li').eq(0).clone().appendTo($ul);
                //如果是水平轮播图
                if(opt.type == 'horizontal'){

                    // 添加水平滚动时的样式
                    $ul.addClass('horizontal');
                    // 由于复制了一份,所以总长度要加一份
                    $ul.width(opt.width*(opt.len + 1));
                    $ul.height(opt.height); 

                }else if(opt.type === 'fade'){

                    //删除复制的那份
                    $ul.find('li').last().remove();
                    $ul.addClass('fade');
                    $ul.width(opt.width);
                    $ul.height(opt.height);
                    // 淡入淡出初始化
                    //  除了当前的图片,其他的都隐藏
                    $ul.find('li').eq(currentIdx).siblings().css('opacity',0);
                        
                }

                // 添加分页
                if(opt.page){

                    $pages = $('<div/>');
                    $pages.addClass(opt.className[0]);

                    $.map(opt.imgs,function(url,idx){

                        let $page = $('<span/>');
                        $page.prop('index',idx);
                        // 将页码添加到容器中
                        $page.appendTo($pages);

                             
                    })
                    // 默认给传入的当前页添加高亮
                    $pages.find('span').eq(pageIdx).addClass(opt.className[1]);
                         
                    // 将页码容器添加到页面上
                    $pages.appendTo($this);


                    $pages.on('click','span',function(){

                        // 改变当前的页码索引和opt的index
                        pageIdx = $(this).prop('index');
                        opt.index = $(this).prop('index');
                        show();
                    })
                }


                // 如果有左右点击切换按钮
                if(opt.button){
                    // 左边
                    let $leftBtn = $('<img/>');
                    $leftBtn.addClass('btnLeft');
                    $leftBtn.attr('src',opt.btnImg[0]);
                    // 右边
                    let $rightBtn = $('<img/>');
                    $rightBtn.addClass('btnRight');
                    $rightBtn.attr('src',opt.btnImg[1]);
                    
                    // 添加按钮
                    $leftBtn.appendTo($this);
                    $rightBtn.appendTo($this);

                    // 点击向左按钮
                    $leftBtn.on('click',function(){

                        // 改变当前的页码索引和opt的index
                        pageIdx --;
                        opt.index --;

                        if(pageIdx < 0){
                            pageIdx = opt.len - 1;
                        }
                        // 没有实现无缝轮播
                        if(opt.index < 0){

                            opt.index =  opt.len - 1
                        }

                        show();
                    }) 

                    // 点击向右按钮
                    $rightBtn.on('click',function(){

                        // 改变当前的页码索引和opt的index
                        pageIdx ++;
                        opt.index ++;

                        if(pageIdx > opt.len - 1){
                            pageIdx = 0;
                        }
                        // 没有实现无缝轮播
                        if(opt.index > opt.len - 1){

                            $ul.css('left', 0);
                            opt.index =  0;
                        }

                        show();
                    })
                }

                     

                let move = ()=>{
                    // 运动
                    $this.timer = setInterval(function(){
                        opt.index++;
                        pageIdx ++;
                        // 判断页码的索引边界
                        if(pageIdx > opt.len - 1){
                            pageIdx = 0;
                        }

                        show();
                    // 轮播图切换的时间
                    },opt.durlation);


                }
                // 轮播图的运动
                move();

                if(opt.touch){

                    // 鼠标移入时停止轮播
                    $this.on('mouseenter',function(){
                        clearInterval($this.timer);
                    // 鼠标移时开始轮播
                    }.bind($this)).on('mouseleave',function(){
                        move();
                    });
                }

                let show = ()=>{

                    // 判断边界
                    // 如果不是淡入淡出,因为复制了一份在末尾,所以在判断大于的时候需要算上复制的那份
                    if(opt.type != 'fade'){

                        if(opt.index < 0){
                            opt.index = opt.len;
                        }else if(opt.index > opt.len){

                            // 轮播图移动到最后一个
                            // 快速将left/top设为第二个,接上复制的那份,制造无缝轮播效果
                            opt.index = 1;
                            if(opt.type === 'horizontal'){
                                $ul.css('left',0);

                            }else{
                                $ul.css('top',0);
                            }
                        }
                    }else{
                        // 淡入淡出的边界判断
                        if(opt.index < 0){
                                opt.index = opt.len - 1;
                            }else if(opt.index > opt.len - 1){

                                opt.index = 0;

                            }
                        }
                    let obj = {};
                    if(opt.type === 'horizontal'){
                        // 
                        obj.left = -opt.width * opt.index;
                        // 添加left动画
                        $ul.animate(obj);

                    }else if(opt.type == 'vertical'){
                       
                        obj.top = - opt.height * opt.index;
                        // 添加top动画
                        $ul.animate(obj);
                             
                    }else if(opt.type === 'fade'){

                        // 添加透明度动画
                        $ul.find('li').eq(currentIdx).animate({opacity:0},800,function(){
                            $(this).children('img')[0].style.transform = 'scale(1.1)'; 
                        });
                        
                        $ul.find('li').eq(opt.index).animate({opacity:1},800,function(){

                            $(this).children('img')[0].style.transform = 'scale(1)';     
                        });

                        currentIdx = opt.index;
                        $(this).parents('.nav').css('background',navBg[currentIdx]);

                    }
                        // 添加当前页的页码高亮
                        // 并清楚其他的页码高亮
                        $pages.find('span').removeClass(opt.className[1]);                             
                             
                        $pages.find('span').eq(pageIdx).addClass(opt.className[1]);
                }  
            }
            // 初始化轮播图
            // 设置结构
            // 设置显示
            // 设置运动
            init(opt);
        });
        
             
    }

// 传递jQuery,避免与其他插件中的$冲突
})(jQuery);