require(['config'],function(){
    require(['jquery','common'],function($){

        // 用于储存每一个输入内容的验证状态
        let isRegist = [];

        // 点击注册
        $('.regist').on('click',function(){
             
            if(isRegist.length == 0){
                return false;
            }else{

                let isOk = isRegist.every(function(item,idx){

                    return item;     
                })

                if(isOk){
                         
                    $.get({url:'../api/regist.php',data:{"type":"add","user":$('.phoneNum').val(),"pass":$('.pass').val()},success:function(res){
                        //验证手机号码是否已经注册
                            console.log(res)
                        if(res == 'success'){
                                 
                            // 注册成功
                            
                            $('.tipWindow').fadeIn(500,function(){
                                $(this).fadeOut(500,function(){

                                    window.location.href = '../html/login.html';
                                });
                            })
                        }
   
                    }});
                }
            }
        })

        // 生成随机验证码
        let vCode_show = getVcode();
        // 生成手机短信验证码
        let vCode_phone = vCode();
        console.log(vCode_phone)
             
             
        // 设置验证码
        $('.VCode_show').text(vCode_show);

        // 验证再一次输入密码
        
        $('.rePass').blur(function(){

            isRegist[4] = $('.pass').val() == $(this).val();

            if(!isRegist[4]){

                $('.rePass').next('p').remove();
                $('.rePass').after(createTip('两次密码不一致')) 
            }else{
                $('.rePass').next('p').remove();

            }
        })

        // 验证密码
        $('.pass').blur(function(){


            if($(this).val().length<6){
                isRegist[3] = false;
                $('.pass').next('p').remove();
                $('.pass').after(createTip('密码不能少于6位'))    
            }else{
                isRegist[3] = true;
                $('.pass').next('p').remove();
            }

        })


        // 验证短信验证码 
        $('.vCode_phone').blur(function(){

            isRegist[2] = vCode_phone == $(this).val();

            if(!isRegist[2]){
                $('.vCode_phone').next('p').remove();
                $('.vCode_phone').after(createTip('输入错误也没关系哟!'))
                isRegist[2] = true;
            }else{
                $('.vCode_phone').next('p').remove();
            }
        })



        // 验证输入的验证码
        $('.vCode_in').blur(function(){                 

            isRegist[1] = vCode_show == $(this).val();

            if(!isRegist[1]){
                $('.yzm').next('p').remove();
                $('.yzm').after(createTip('请输入正确的验证码'))
            }else{
                $('.yzm').next('p').remove();
            }
        })

        // 验证输入的手机号码
        $('.phoneNum').blur(function(){

            let phone = $(this).val();

            let _reg = /^[1][356489][\d]{9}$/;

            if(phone.trim() == ''){
                $('.phoneNum').next('p').remove();
                $('.phoneNum').after(createTip('请输入手机号'))
                isRegist[0] = false;
                return;
                     
            }else if(!_reg.test(phone)){
                $('.phoneNum').next('p').remove();
                $('.phoneNum').after(createTip('请输入正确的手机号码'))
                isRegist[0] = false;
                return;   
            }else{
                isRegist[0] = true;
                $('.phoneNum').next('p').remove();
            }
               
            $.get({url:'../api/regist.php',data:{"type":"check","phone":phone},success:function(res){
                //验证手机号码是否已经注册
                if(res == 'fail'){

                    $('.phoneNum').next('p').remove();
                    $('.phoneNum').after(createTip('该用户已经被注册'))
                    isRegist[0] = false;

                }

                     
                 
            }});

        }) 

        // 提示消息
        function createTip(val){

            let $tip = $('<p/>').addClass('error');
            $tip.text(val);

            return $tip;
        }

             
    })
})