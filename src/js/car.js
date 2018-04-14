require(['config'],function(){
    require(['jquery','base','common'],function(){
        // 购物车为空时,设置点击登录按钮的跳转路径
        $('.empty_car').find('a').attr('href','../html/login.html?'+window.location.href);


        // 从新获取登录状态
        // base 文件请求登录状态时,当前页面加载完成时,base还没拿到值
        $.get({url:'../api/isLogin.php',data:{"type":"get"},success:function(res){

            isLogin = $.parseJSON(res)[0].isLogin*1;

            // 获取用户名
              
            user = $.parseJSON(res)[0].user;
            if(isLogin){
               $('.empty_car').hide();
                // 生成购物车列表
                
                let lis;
                var carList;
                let allQty;
                updateGoods();                     
                // console.log(lis)
                     
                function updateGoods(){

                    // 用于存放分类后的商品信息
                    // [[{天梭},{天梭}][{劳力士},{劳力士}]...]     
                    lis = [[]];
                    // 商品总数   
                    allQty = 0
                    // 获取cookie
                    carList = Cookie.get('goodsList');
                    // 判断cookie是否为空                                            
                    if(carList.length==0){
                        carList = [];
                    }else{
                        carList = $.parseJSON(carList);
                    }
                    if(carList.length==0){
                        return;
                    }
                    
                    // 商品分类 
                    for (var i = 0; i < carList.length; i++) {
                         allQty += carList[i].qty*1;    
                             
                        for (var j = 0; j < lis.length; j++) {                
                             
                            if(lis[0].length == 0){                 
                                lis[0].push(carList[i]);
                                break;
                            }else{ 

                                if(lis[j][0].stores==carList[i].stores){
                                    
                                    lis[j].push(carList[i]);
                                    break;

                                }else if(j>=lis.length -1){   
                                                       
                                    lis.push([carList[i]]);
                                    break;
                                }
                            }
                        };
                    };
                }

                updateCar();
                function updateCar(){
                    // 如果购物车商品疏朗为0
                    // 显示对应的模块
                    // 并且不生成购物车列表
                    if(carList.length == 0){
                        $('.tbodyBox').html('');
                        $('.nogoods').show();
                        $('.tbodyBox').append($('.nogoods'));
                        return;
                    }
                    $('.allgoods').text(allQty);
                    $('.nogoods').hide();
                    let index = 0;
                    $('.tbodyBox').html('');
                    $.each(lis,function(i,itemArr){
                        let $box = $('<div/>').addClass('box');     
                        let $title = $('<div/>');
                        // 先将商品店铺标题生成
                        // 在循环生成商品信息
                        // 因为标题一个就行
                        // 而商品可能有多个
                        $title.addClass('title').html(`<ul>
                                                            <li><input class="checkStroes fl" type="checkbox" /><p class="fl">${itemArr[0].stores}</p></li>
                                                        </ul>`);

                        let res = $.map(itemArr,function(item,idx){ 
                        index++;
                                                                               
                            return`
                                <div class="tbody clearfix">
                                    <div class="content clearfix"> 
                                        <dl>
                                            <dt><input type="checkbox" /></dt>
                                            <dd><a href="../html/details.html?${item.gid}.html"><img src="${item.imgUrl}" alt="" /></a></dd>
                                            <dd><p>${item.desc}</p></dd>
                    
                                        </dl>
                                        <ul class="goods" data-idx="${index}">
                                            <li class="price">
                                                ￥${item.price}
                                            </li>
                                            <li>
                                                <a class="less">-</a><input class="qty" type="text" value="${item.qty}" /><a class="add">+</a>
                                            </li>
                                            <li class="mintotal">
                                                ￥${item.price*item.qty}
                                            </li>
                                            <li class="tbody_del">
                                                <a>删除</a>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            `;
                        })
                        // 先添加标题
                        // 再添加内容
                        $box.append($title);
                        $box.append(res);
                        // box 用于分辨店铺                             
                        $('.tbodyBox').append($box);                             


                    })

                }
                // 获取到全部checkbox
                let $cheboxs = $('.tbodyBox').find(':checkbox');
                

                // 全选
                $('.checkAll').on('click',function(){
                    $(this).closest('.table').find(':checkbox').prop('checked',this.checked);
                    isCheckAll();
                })
                // 选择店铺的全部商品
                $('.checkStroes').on('click',function(){

                         
                    // console.log($(this).closest('.title').next())
                         
                    // $(this).closest('.title').next().find(':checkbox').prop('checked',this.checked);
                    $(this).closest('.box').find(':checkbox').prop('checked',this.checked)
                    isCheckAll();
                })

                // 单选一件商品
                $('.content').find(':checkbox').on('click',function(){
                    getTotal();
                })

                // 操作单个商品的数量
                // 并计算价格
                // 减少
                $('.tbodyBox').on('click','.less',function(){

                    let qty = ($(this).next().val())*1;
                    if(qty == 1){
                        return;
                    }

                    qty--;
                    // 获取到当前商品在购物车中的索引
                    // 
                    let idx = $(this).closest('ul').data('idx')-1;
                    // 获取到输入框中的内容    
                    $(this).next().val(qty);
                    // 获取到商品单价 ￥2564
                    let price = $(this).closest('ul').find('.price').text().trim().slice(1);
                    // 修改小计
                    $(this).closest('ul').find('.mintotal').text('￥'+price*qty);

                    // 跟新cookie
                    updateCookie(idx,qty);
                    // 跟新总数
                    allQty++;
                    // 跟新总价钱
                    getTotal();


                })
                // 增加
                $('.tbodyBox').on('click','.add',function(){
                    let qty = ($(this).prev().val())*1;
                    if(qty == 99){
                        return;
                    }
                    qty++;
                    let idx = $(this).closest('ul').data('idx')-1;
                    $(this).prev().val(qty);
                    let price = $(this).closest('ul').find('.price').text().trim().slice(1);
                    // 修改小计
                    $(this).closest('ul').find('.mintotal').text('￥'+price*qty);
                    updateCookie(idx,qty);
                    allQty++;
                    getTotal();
                })

                // 商品总数 (总标题)
                $('.tbodyBox').on('focus','.qty',function(){
                    allQty -= $(this).val();
                         
                })

                // 输入框改变内容且失去焦点时
                $('.tbodyBox').on('change','.qty',function(){
                    
                    // 拿到商品在购物车中的索引位置
                    let idx = $(this).closest('ul').data('idx')-1;
                         

                    let price = $(this).closest('ul').find('.price').text().trim().slice(1);
                    // 修改小计
                    $(this).closest('ul').find('.mintotal').text('￥'+price*$(this).val());
                    updateCookie(idx,$(this).val());
                    allQty += $(this).val()*1;
                    getTotal();
                })

                // 删除商品
                
                $('.tbodyBox').on('click','.tbody_del',function(){   
                         
                    let idx = $(this).closest('ul').data('idx')-1;


                    //从数据库中删除
                    Savefordb(carList[idx],'del');
                    // 从数组中删除
                    carList.splice(idx,1);
                    // 更新cookie
                    document.cookie = 'goodsList='+JSON.stringify(carList)+';path=/';
                    // 删除时,更新分类列表
                    updateGoods();
                    // 跟新购物车商品列表
                    updateCar();

                })

                // 更新cookie
                function updateCookie(idx,qty){

                    carList[idx].qty = qty;
                    document.cookie = 'goodsList='+JSON.stringify(carList)+';path=/';
                    Savefordb(carList[idx],'update');

                }
                
                // 是否全选
                function isCheckAll(){

                    // 获取到当前的checkboxs被勾选的个数
                    let $ischecks = $cheboxs.filter(':checked');
                         
                    // 根据个数是否等于总个数来判断是否勾选全部
                    $('.checkAll').prop('checked',$ischecks.length === $cheboxs.length);
                    getTotal();
                }
                getTotal();

                // 获取总金额
                function getTotal(){

                    let total = 0;
                    let goodsArr = $('.goods');
                    $.each(goodsArr,function(idx,item){

                             
                        let ischecked = $(item).closest('.content').find(':checkbox').prop('checked');
                             
                        let subtotal = $(item).find('.mintotal').text().trim().slice(1)*1;
                        if(ischecked){
                            total += subtotal;
                        } 
                    })
                    $('.total').text('￥'+ total);
                    $('.allgoods').text(allQty);
                } 
                
            }else{
                // 显示与隐藏对应的状态
                // 购物车为空时的模块
                $('.empty_car').show();
                // 隐藏购物车列表
                $('.myCar').hide();
                // 购物车为空提示
                $('.nogoods').hide();
            }

        }})
   
    })
})