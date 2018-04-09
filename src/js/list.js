                      
require(['config'],function(){
         
   require(['jquery','base','carousel'],function($){
                 
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
                $goodsList.removeClass('nogoods');
                if(g_res.length == 0){                         
                    $goodsList.addClass('nogoods').html('没有找到相关的商品哟~~~');
                    return;
                }
                let g_arr = $.map(g_res,goods=>{

                    return `
                            <li>
                                <a href="details.html?${goods.gid}"><img src="${goods.imgUrl}"/></a>

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
                 
            $(this).closest('li').siblings().children('a').removeClass('kwActive');
            $(this).addClass('kwActive');

            priceSearch($(this).text());

                 
        })

        // 手动输入搜索
        $('#comfirm').on('click',function(){
                 
            if(($('#pLt').val()+'-'+ $('#pGt').val()).trim() == '-'){
                return;
            }

            // 获取输入价格范围
            priceSearch($('#pLt').val()+'-'+ $('#pGt').val());
        })

        // 根据价格范围搜索相应的商品
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

        // 根据品牌搜索相应的数据

        $('.kwBrands').on('click','li',function(){

            $(this).siblings().children().removeClass('kwActive');
            $(this).children().addClass('kwActive');

            g_xhr.open('get','../api/goodsList.php?type=Brands&brand=' + $(this).text(),true);

            g_xhr.send();
                 
        });

        
        // 
        $('.btn_search').on('click',function(){

            console.log(999)
                 

            g_xhr.open('get','../api/goodsList.php?type=Brands&brand=' + $('.searchVal').text(),true);

            g_xhr.send();
        })

    

        $.ajax({url:"../api/history.php",success:function(res){
            
            let data = $.map($.parseJSON(res),function(item){
                     
                return `
                    <li>
                        <a href="#"><img src="${item.imgUrl}" /></a>
                        <div class="bot">
                            <p class="price">&yen;${item.price}</p>
                            <p class="content">${item.desc}</p>
                        </div>

                    </li>`;
            })
            $('<ul/>').append(data).appendTo('.history'); 
        }});

        // 动态生成热门品牌
        let hotBrands = '百达翡丽 江诗丹顿 宝珀 宝玑 欧米茄 万国 古驰 积家 劳力士 迪沃斯 卡地亚 天梭 浪琴 赫柏林 美度 阿玛尼 CK DW 精工 卡西欧'.split(' ');

        let _hotBrands = $.map(hotBrands,function(item,idx){

            return `<li><a href="#"><span>${idx+1}</span><span>${item}</span></a></li>`;
        })
        // 动态生成热门词
        let hotWord = 'rolex 卡地亚手表 手表app 手表品牌大全 手表品牌 dw手表 积家 iwc CK手表 沛纳海 卡地亚手表 万国手表 浪琴表价格 欧米茄报价 江诗丹顿手表 世界十大名表 十大名表 卡地亚蓝气球 seiko手表是什么牌子 muehle手表 diesel官网 小红书 依百克'.split(' ');

        let _hotword = $.map(hotWord,function(item){
            return `<li><a href="#">${item}</a></li>`;
        })

        $('<ul/>').append(_hotBrands).appendTo('.hotBrands');
        $('<ul/>').append(_hotword).appendTo('.hotBrands');
        // 侧边栏鼠标移入切换内容
        $('.mainLeft').find('h2').hover(function(){
                          
            if($(this).index() == 0){
                if($(this).next('h2')[0] == undefined){   
                    return;
                }
                $(this).css('color','#000');
                $(this).siblings('h2').css('color','#999')
                $(this).closest('div').next().show();
                $(this).closest('div').next().next().hide();
                

            }else{
                     
                $(this).css('color','#000')
                $(this).siblings('h2').css('color','#999')
                $(this).closest('div').next().next().show();
                $(this).closest('div').next().hide();
            }
        })



        // 默认隐藏导航菜单
        this.timer = setInterval(()=>{
                 
            if($('.tab1>li')[0]){     
                $('.tab1>li').children('ul').hide();

                $('.tab1').hover(()=>{
                    $('.tab1>li').children('ul').stop().slideDown();
                },()=>{
                    $('.tab1>li').children('ul').stop().slideUp();
                })
                clearInterval(this.timer);
            }
        }, 60);
   })
})