                      
require(['config'],function(){
         
    require(['jquery','base','zoom','common'],function($){

        let data = [];
        $('.style li').eq(0).addClass('styleClick');
        // 点击款式切换样式
        $('.style li').on('click',function(){
                 
            $(this).siblings().removeClass('styleClick');
            $(this).addClass('styleClick');
        })

        // 根据id获取数据
        let gid = window.location.search;
        gid = gid.slice(1,gid.indexOf('.'))             

        $.get({url:'../api/goodsList.php',data:{'type':'Gid','id':gid},success:function(res){
            data = $.parseJSON(res);

            updatePage(data[0]);
            // 动态生成放大镜小图
            let smallImgs = $.map(data,function(item){

                // 给商品添加数量属性
                item.qty = 0;
                     

                return `<li>
                            <img src="${item.imgUrl}" data-big="${item.imgUrl}"/>
                        </li>`;
            })      
            $('<ul/>').append(smallImgs).appendTo('.smallList')
            // 添加高亮样式
            $('.smallList li').eq(0).addClass('pick');

            // 放大镜, 默认放大第一个
            $('.zoomBox').cZoom({
                ratio:2
            });

            // 点击其他小图调用放大镜的方法
            $('.smallList li').on('click',function(){

                // 添加/去除高亮样式
                $(this).siblings().removeClass('pick');
                $(this).addClass('pick');
                     
                // 更新对应的商品信息
                updatePage(data[$(this).index()]);
                                       
                $('.zoomBox').children().remove();
                let $img = $(this).children('img').clone();
                    
                $img.appendTo($('.zoomBox'));

                $('.zoomBox').cZoom({
                    // 放大两倍
                    ratio:2
                });        
            })
        }})

        // 修改商品数量
        // 增加
        $('.add').on('click',function(){
            let qty = $('.qty')[0].value*1;
                 
            qty += 1;
            if(qty >= 99){
                qty = 99;
            }
            $('.qty')[0].value = qty;
        });
        // 减少
        $('.less').on('click',function(){
            let qty = $('.qty')[0].value*1;
                 
            qty -= 1;
            if(qty <= 1){
                qty = 1;
            }
            $('.qty')[0].value = qty;
        })

        // 获取cookie
        var carList = Cookie.get('goodsList');   
        console.log(carList)
                                 
        if(carList.length==0){
            carList = [];
        }else{
            carList = $.parseJSON(carList);
        }

        // 添加购物车
        $('.addCar').on('click',function(){ 
                 
            let pickNum;
            let g_index;
            $.map($('.smallList li'),function(item,idx){
                if(item.className == 'pick'){
                    pickNum =  idx;
                }   
            })

            var has = carList.some(function(goods,idx){
                g_index = idx ;
                return goods.gid == data[pickNum].gid;
            })
            if(has){
                carList[g_index].qty += $('.qty')[0].value*1;
                     
            }else{
                // 添加之前判断是否添加的是否同一个商品
                data[pickNum].qty += $('.qty')[0].value*1;
                carList.push(data[pickNum]);
                     
            }
            // 添加
            document.cookie = 'goodsList='+JSON.stringify(carList)+';path=/';
                         
                 
            updateCar();
        })


        // 更新商品详情信息
        function updatePage(opt){

            $('.zoomBox').children().attr({'src':opt.imgUrl,'data-big':opt.imgUrl});
            $('.con').text(opt.desc);
            $('.grands').text('品牌:   '+(opt.stores).slice(0,-3));
            $('.colume').text('销量:   '+opt.volume);
            $('.price').text('￥'+opt.price);
            $('.stage').text('每月'+(opt.price/12).toFixed(0)+'元×12期');
            $('.t_con').find('a').eq(1).text((opt.stores) +'  >');
            $('.t_con').find('a').eq(2).text((opt.desc));
            $('.t_stores').find('a').text((opt.stores));

        }
           
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