jQuery(function($){
 
    $(window).on('load',function(e){
             
        // 二级菜单的显示与隐藏
        $('.tab1>li').children('ul').hide();

        $('.tab1').hover(function(){
            $('.tab1>li').children('ul').stop().slideDown();
        },function(){
            $('.tab1>li').children('ul').stop().slideUp();
        })

        $('.header').css('box-shadow','0 3px 5px #ccc');  })

        $('.mainLeft .banner').carousel_c({
        "width":210,
        "height":400,
        "index":0,
        "type":'horizontal',
        "touch":false,
        "button":false,
        "className":['page2','active2'],
        "imgs":['../imgs/wb_lis_ban1.jpg','../imgs/wb_lis_ban2.jpg','../imgs/wb_lis_ban3.jpg','../imgs/wb_lis_ban4.jpg']
    });
})