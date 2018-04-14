// 更新购物车列表(删除操作)
var updateCar;
// 登录状态
var isLogin = false;
// 切换顶部登录或不登录时的内容
var updateLoginTab ;
// 保存到数据库的函数
var Savefordb;
// 用户名
var user = '';
jQuery(function($){
    // 阻止默认行为
    $(document).on('mousemove',function(event){
        event.preventDefault();
    })
    
    // header广告 
    $('.header').load('../html/base.html header',function(event){

        // 头部结构加载完成后

        //获取登录状态
        $.get({url:'../api/isLogin.php',data:{"type":"get"},success:function(res){

            // 登录状态
            // 用户判断是否显示与隐藏对应的内容
            isLogin = $.parseJSON(res)[0].isLogin*1;

            // 获取用户名                
            user = $.parseJSON(res)[0].user;

            // 如果是登录状态
            if(isLogin){

                // 根据用户名请求获取当前用户的购物车信息
                $.get({url:'../api/carList.php',data:{"type":"get","user":user},success:function(res){ 
                         
                    //将获取的信息更新cookie                                           
                    document.cookie = 'goodsList='+res+';path=/';
                    // 更新导航栏
                    updateLoginTab();
                     if(updateCar){
                        // 更新购物车
                        updateCar();
                    }
                }})
                
            }
           

        }})
        // 点击登录时,带上当前的页面地址
        // 用户登录后的返回
        $('.loginStatus').parent().attr('href',"../html/login.html?"+window.location.href);
            
         updateLoginTab =  function(){
            $('.loginStatus').text('您好,'+user).parent().attr('href',"#");
            $('.loginStatus').closest('li').next().find('span').text('退出');
            $('.loginStatus').closest('li').next().find('span').parent().attr('href',"#");

            // 退出
            $('.registStatus').on('click',function(){ 

                $.get({url:'../api/isLogin.php',data:{"type":"set","status":0,"user":user}})

                $('.loginStatus').text('登录享优惠').parent().attr('href',"../html/login.html?"+window.location.href);
                $('.registStatus').text('注册').parent();

                setTimeout(function(){
                    // 点击退出,修改注册链接
                    // 延时是避免点击时马上跳转到注册页面
                    $('.registStatus').parent().attr('href',"../html/regist.html");
                },1000)

                // 点击退出刷新当前页面
                window.location.href = window.location.href;
                     

            })
                 
        }

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
    
    //根据传入的商品,与类型
    //插入,删除,更新
    Savefordb = function(goods,type){  

        // console.log(goods,type,user)
        
        $.get({url:'../api/carList.php',data:{
            "type":type,  // 用于在php判断使用什么sql 语句
            // 商品信息
            "gid":goods.gid,
            "imgUrl":goods.imgUrl,
            "desc":goods.desc,
            "price":goods.price,
            "qty":goods.qty,
            "special":goods.special,
            "stores":goods.stores,
            "volume":goods.volume,
            // 用于判断是哪个用户的商品信息
            "user":user
        },success:function(res){
            // console.log(res)
                 

        }})
         
}
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

        // 切换二维码
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
        // 留出100用于摆放'购物车结算框'
        $('.carlist').css('height',window.innerHeight - 100);

        $('.menu').find('.close').click(function(){
                 
            $('.menu').animate({'right':'-260'});
        })

        $('.menu').find('.car').click(function(){

            $('.menu').animate({'right':'0'});
        })

        $('.nowLogin').attr('href',"../html/login.html?"+window.location.href);
        // 动态生成购物车列表
        updateCar = function(){
            let qty = 0;
            let total = 0;
            // 获取cookie
            var carList = Cookie.get('goodsList');
                 
                 
            if(carList.length==0){
                carList = [];
            }else{
                carList = $.parseJSON(carList);
            }
                 
            $('.carlist').html('');
            // 生成侧边栏购物列表
            let res = $.map(carList,function(item){
                // 每一件商品数量
                qty+=item.qty*1;
                // 商品总数
                total += item.price*qty;
                return `
                        <li class="clearfix">
                            <a href="../html/details.html?${item.gid}.html">
                                <img src="${item.imgUrl}"/>
                             </a>
                            <p>${item.desc}</p>
                            <p><span>￥ ${item.price}</span>&times;<i>${item.qty}</i></p>
                            <a class="del">删除</a>
                        </li>
                   `;
            })
            // 根据登录状态显示与隐藏对应模块
            if(isLogin){
                // 如果是登录状态
                // //添加购物车列表至侧边栏
                $('<ul/>').append(res).appendTo('.carlist'); 
                // 购物车图标上的商品数量
                $('.goodsQty').show();
                // 跳转结算界面
                $('.clearing').show();
                // 提示登录
                $('.menu_login').hide();
            }else{
                $('.menu_login').show();
                $('.goodsQty').hide();
                $('.clearing').hide();
            }

            // 更新购物车显示的数量
            $('.goodsQty').text(qty);
            $('.carQty').text(qty+'件商品');
            $('.carTotal').text('￥'+total);


            // 删除购物车商品
            $('li').on('click','.del',function(){

                // 获取要删除的商品的索引
                let start = $(this).parent().index();
                //从数据库中删除
                 Savefordb(carList[start],'del');
                // 从数组中删除    
                carList.splice(start,1);        

                // 删除后更新cookie
                document.cookie = 'goodsList='+JSON.stringify(carList)+';path=/';
                
                // 更新购物车
                updateCar();
            })
        }






        // 侧边栏tab选项卡切换
        $('.menuList li').hover(function(){ 
            // 不显示购物车数量
            $(this).children().not('span').stop().fadeIn(300);
                 
        },function(){
            // 
            $(this).children().not('span').stop().fadeOut(300);
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