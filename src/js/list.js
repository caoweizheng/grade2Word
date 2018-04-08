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

        // 轮播图
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

        // 关键字搜索模块
        let kwBrands = $('.kwBrands');
        let kwkwType = $('.kwType');
        let brandsKW = '浪琴 爱宝时 天梭 迪沃斯 欧米茄 劳力士 赫柏林 CK 百达翡丽 菲拉格慕 艾美达 诺美纳 帝舵 积家 阿玛尼 万国 宝玑 宝珀 美度 库尔沃 莫勒 柏高 荣汉斯 卡西欧'.split(' ');

        let typeKW = '机械 自动机械 手动机械 石英 光能 智能 电波 人动电能 陀飞轮 电子 其它'.split(' ');    
        createKeyWord(kwBrands,brandsKW);
        createKeyWord(kwkwType,typeKW);
        function createKeyWord(container,kwArr){
            container.append($.map(kwArr,function(item){
                return `<li><a href="#">${item}</a></li>`;
                     
            }));
        }
})