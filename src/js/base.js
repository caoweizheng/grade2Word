jQuery(function($){
    // header广告
    $('.header').load('../html/base.html header',function(){

        $('.ad .container').css('background',"url(../imgs/wb_head_ad.jpg)");
        // 点击关闭广告
        $('.ad span').on('click',function(){
                     
            $('.ad .container').slideUp(500);
        })

        // 鼠标移入万表app
        moveToApp();

        moveToContact();

        SearchEvent();
    });
    // 顶部万表app动画
    function moveToApp(){
             
        $('.useropt .wb').hover(function(){

            $('.wb a>span').css({
                border:'1px solid #ccc',
                 borderBottom:'1px solid #fff'
            })
                 
            $(this).children('.wbApp').stop().slideDown('fast');
        },function(){

            $('.wb a>span').css({
                border:'1px solid transparent'
            })
            $(this).children('.wbApp').stop().slideUp('fast');
        });

        // 切花二维码
        $('.wb_bot>span:first-child').on('mouseover',function(){
            $(this).css({
                color:'#000'
            })
            $('.wb img').attr('src','../imgs/wb_head_app.jpg')
            $(this).siblings('span').css('color','#9A9791');
                 
        })
        $('.wb_bot>span:last-child').on('mouseover',function(){
            $(this).css({
                color:'#000'
            })
            $('.wb img').attr('src','../imgs/wb_head_wchat.png')

            $(this).siblings('span').css('color','#9A9791');
                 
        })
    }
    // 顶部服务专线动画
    function moveToContact(){
        $('.useropt .contact').hover(function(){

            $('.contact a>span').css({
                border:'1px solid #ccc',
                 borderBottom:'1px solid #fff'
            })
                 
            $(this).children('.contacts').stop().slideDown('fast');
            },function(){

                $('.contact a>span').css({
                    border:'1px solid transparent'
                })
                $(this).children('.contacts').stop().slideUp('fast');
        });
    }   

    // 顶部搜索框
    function SearchEvent(){
        $('.logo .search input').hover(function(){
            $(this).css('borderBottomColor','#000');
        },function(){
            $(this).css('borderBottomColor','#ccc');

            //显示热门推荐
        }).focus(function(){
            $('.search').find('.recommend').stop().show();
        }).blur(function(){
            $('.search').find('.recommend').stop().hide();
        });
    }

    // 侧边栏
    $('.backTop').load('../html/base.html .menu',function(){

        $('.menu').css('height',window.innerHeight);

        $('.menuList li').hover(function(){
                
            $(this).children().stop().fadeIn(300);
                 
        },function(){
            $(this).children().stop().fadeOut(300);
        });

        // 返回顶部
        $('.toTop').on('click',function(){

            $('body,html').animate({'scrollTop':0},800);
        });


        // 鼠标移入人工服务时的动画
        $('.service').hover(function(){
            $('.serviceCon').show().stop().animate({
                left:-300
            });
        },function(){
            $('.serviceCon').css({
                    left:-290
                }).stop().hide();
            });
    });
    // 底部
    $('.footer').load('../html/base.html footer',function(){
        $('.right .r1').find('li').eq(0).addClass('hover');
        $('.right .r2').find('li').eq(0).addClass('hover');

        // 切换二维码
        $('.right .r1').find('li').eq(0).on('mouseenter',function(){
                 
            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');

            $('.right .r1').find('img').attr('src','../imgs/wb_fot_wb.png');
        })

        $('.right .r1').find('li').eq(1).on('mouseenter',function(){
                 
            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');


            $('.right .r1').find('img').attr('src','../imgs/wb_fot_dyh.png');
        })        


        $('.right .r2').find('li').eq(0).on('mouseenter',function(){
                 
            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');

            $('.right .r2').find('img').attr('src','../imgs/wb_fot_wb.png');
        })

        $('.right .r2').find('li').eq(1).on('mouseenter',function(){
                 
            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');


            $('.right .r2').find('img').attr('src','../imgs/wb_fot_dyh.png');
        })
             
             
    })
});