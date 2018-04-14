                      
require(['config'],function(){
         
    require(['jquery','base','zoom','common'],function($){

        let data = [];
        $('.style li').eq(0).addClass('styleClick');
        // 点击款式切换样式
        $('.style li').on('click',function(){
                 
            $(this).siblings().removeClass('styleClick');
            $(this).addClass('styleClick');
        })

        // 根据地址栏信息获取商品id
        let gid = window.location.search;
        gid = gid.slice(1,gid.indexOf('.'))             

        $.get({url:'../api/goodsList.php',data:{'type':'Gid','id':gid},success:function(res){
            // goodsList.php --> 获取到gid与后面四个商品
            data = $.parseJSON(res);

            // 页面中的商品信息 默认为第一个
            updatePage(data[0]);
            // 动态生成放大镜小图
            let smallImgs = $.map(data,function(item){

                // 给商品添加数量属性
                item.qty = 1;
                     

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
                // 点击小图时,获取到小图的图片
                // 将图片设置给大图
                // 再调用放大镜
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
                                 
        if(carList.length==0){
            carList = [];
        }else{
            carList = $.parseJSON(carList);
        }
        // 弹窗时的遮罩
        $('.bigMask').css({
            height:window.innerHeight,
            width:window.innerWidth
        })
        // 添加购物车
        $('.addCar').on('click',function(){ 
                        
            // 判断是否登录
            if(!isLogin){

                //弹出登录窗口
                $('.bigMask').show();
                return;
            }
            // 当前点击的索引 
            let pickNum;
            // 当前商品在购物车列表的索引位置
            let g_index;
            // 点击小图获取当前点击的索引
            $.map($('.smallList li'),function(item,idx){
                // 有高亮的为当前点击索引
                if(item.className == 'pick'){
                    pickNum =  idx;
                }   
            })

            // 判断当前点击的商品是否在购物车列表中
            var has = carList.some(function(goods,idx){
                // 获取到当前商品在购物车列表的索引位置
                g_index = idx;
                // 如果存在 返回false
                return goods.gid == data[pickNum].gid;
            })
            // 存在执行更新
            // 修改数量
            // 将修改的商品传入保存数据库函数,更新数据库中的数据
            if(has){
                let num = carList[g_index].qty;
                num = Number(num)+($('.qty')[0].value*1)
                carList[g_index].qty = num;
                //当前选中的商品
                Savefordb(carList[g_index],"update")
            // 否则执行添加    
            }else{
                // 添加之前判断是否添加的是否同一个商品
                data[pickNum].qty = $('.qty')[0].value*1;
                carList.push(data[pickNum]);
                Savefordb(carList[g_index],"insert")
                     
            }
            // 添加
            document.cookie = 'goodsList='+JSON.stringify(carList)+';path=/';
            
            // 更新侧边栏购物车列表 
            updateCar();
        })


        // 更新商品详情信息
        function updatePage(opt){

            $('.zoomBox').children().attr({'src':opt.imgUrl,'data-big':opt.imgUrl});
            $('.con').text(opt.desc);
            $('.grands').text('品牌:   '+(opt.stores));
            $('.colume').text('销量:   '+opt.volume);
            $('.price').text('￥'+opt.price);
            $('.stage').text('每月'+(opt.price/12).toFixed(0)+'元×12期');
            $('.t_con').find('a').eq(1).text((opt.stores) +'  >');
            $('.t_con').find('a').eq(2).text((opt.desc));
            $('.t_stores').find('a').text((opt.stores));

        }

        // 登录弹窗
        $('.user').focus(function(){
            // 提示词动画
            $('.tip_user').animate({'bottom':30,'font-size':12})
                 
        })

        $('.pass').focus(function(){
            // 提示词动画
            $('.tip_pass').animate({'bottom':30,'font-size':12})
                 
        })
        $('.user').blur(function(){
            if($(this).val().trim() == ''){
                $('.tip_user').animate({'bottom':5,'font-size':16})

            }
            $('.error_tip').hide();
                 
        })

        $('.pass').blur(function(){
            if($(this).val().trim() == ''){
                $('.tip_pass').animate({'bottom':5,'font-size':16})
                $('.error_tip').hide();
            }

        })

        $('.det_close').on('click',function(){
            $('.bigMask').hide();
        })

        $('.det_login').on('click',function(){
            console.log($('.user'))
                 
            // 判断输入是否为空
            if($('.user').val().trim() == '' || $('.pass').val().trim() == ''){
                return;
            }

            // 后台用户名密码判断
            $.get({url:'../api/regist.php',data:{"type":"login","user":$('.user').val(),"pass":$('.pass').val()},success:function(res){
                // 登录成功
                if(res == 'success'){
    
                    // 请求修改登录状态
                    $.get({url:'../api/isLogin.php',data:{"type":"set","status":1,"user":$('.user').val()}})
                    isLogin = true;
                    // 隐藏遮罩
                    $('.bigMask').hide();
                    updateLoginTab();
                    updateCar();
        
                }else{
                    // 登录失败
                         
                    $('.error_tip').show();
                         
                }

            }})
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