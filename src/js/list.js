jQuery($=>{
 
    $(window).on('load',e=>{
             
        // 二级菜单的显示与隐藏
        $('.tab1>li').children('ul').hide();

        $('.tab1').hover(()=>{
            $('.tab1>li').children('ul').stop().slideDown();
        },()=>{
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
        let $kwBrands = $('.kwBrands');
        let $kwkwType = $('.kwType');
        let brandsKW = '浪琴 爱宝时 天梭 迪沃斯 欧米茄 劳力士 赫柏林 CK 百达翡丽 菲拉格慕 艾美达 诺美纳 帝舵 积家 阿玛尼 万国 宝玑 宝珀 美度 库尔沃 莫勒 柏高 荣汉斯 卡西欧'.split(' ');

        let typeKW = '机械 自动机械 手动机械 石英 光能 智能 电波 人动电能 陀飞轮 电子 其它'.split(' ');    
        createKeyWord($kwBrands,brandsKW);
        createKeyWord($kwkwType,typeKW);
        function createKeyWord(container,kwArr){
            container.append($.map(kwArr,function(item){
                return `<li><a>${item}</a></li>`;
                     
            }));
        }

        // 生成商品列表
        let $goodsList = $('.goodsList');

        let status = [200,304];

        let g_xhr = new XMLHttpRequest();


        g_xhr.onload = ()=>{

            if(status.includes(g_xhr.status)){
                let g_res = $.parseJSON(g_xhr.responseText);
                $goodsList.html('');
                     
                if(g_res.length == 0){                         
                    $goodsList.addClass('nogoods').html('没有找到相关的商品哟~~~');
                    return;
                }
                let g_arr = $.map(g_res,goods=>{

                    return `
                            <li>
                                <img src="${goods.imgUrl}"/>

                                <div class="con">
                                    <p class="clearfix">
                                        <span class="g_price">&yen;${goods.price}</span>
                                        <span class="g_volume">销量${goods.volume}</span>
                                    </p>

                                    <p class="g_des">${goods.desc}</p>
                                    <span class="g_special">${goods.special==null?'':goods.special}</span>
                                    <h4 class="g_stores">${goods.stores}</h4>
                                    <span class="g_Self-support">自营</span>

                                    <div class="botHide">
                                        <span class="addToLove">加入收藏</span>
                                        <span class="addToCar">加入购物车</span>
                                    </div>
                                </div>
                            </li> `;      
                })
                // 添加到页面中
                $('<ul/>').append(g_arr).appendTo($goodsList);


                     
            }
        }

        g_xhr.open('get','../api/goodsList.php',true);

        g_xhr.send();


        let $sort = $('.Sort');

        $sort.find('a').eq(0).addClass('sortActive');

        // 排序
        $sort.on('click','li',function(e){

            $(this).siblings().children().removeClass('sortActive');
            $(this).children().addClass('sortActive');

            let sortType = $(this).data('sorttype');

            g_xhr.open('get','../api/goodsList.php?type='+sortType,true);

            g_xhr.send();
                                  
                 
        })

        //  按价格搜索
        let $priceKW = $('.priceKW');

        $priceKW.on('click','a',function(){

            priceSearch($(this).text());

                 
        })

        // 手动输入搜索
        $('#comfirm').on('click',function(){
            console.log(999)
                 

            // 获取输入价格范围
            priceSearch($('#pLt').text()+'-'+ $('#Gt').text());
        })

        function priceSearch(priceAround){

            // 单项处理
            if(priceAround.indexOf('以下')>=0){

                priceAround = ('0-'+priceAround).replace('以下','');

            }else if(priceAround.indexOf('以上')>=0){

                priceAround = (priceAround + '-0').replace('以上','');

            }

            let arr = priceAround.split('-');

            arr = arr.map(function(item){
                     
                return item.replace(/,/g,'')*1;

            })

            g_xhr.open('get','../api/goodsList.php?type=priceSearch&aroundLt='+arr[0]+'&aroundGt='+arr[1],true);

            g_xhr.send();
 
        }
             


})