'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _updateCar;
// 登录状态
var isLogin = false;
var updateLoginTab;
var Savefordb;
// 用户名
var user = '';
jQuery(function ($) {
    $(document).on('mousemove', function (event) {
        event.preventDefault();
    });

    // header广告
    $('.header').load('../html/base.html header', function (event) {

        // 获取登录状态
        $.get({ url: '../api/isLogin.php', data: { "type": "get" }, success: function success(res) {

                isLogin = $.parseJSON(res)[0].isLogin * 1;

                // 获取用户名                
                user = $.parseJSON(res)[0].user;
                if (isLogin) {

                    // 根据用户名获取当前用户的购物车信息
                    $.get({ url: '../api/carList.php', data: { "type": "get", "user": user }, success: function success(res) {
                            //更新cookie                                           
                            document.cookie = 'goodsList=' + res + ';path=/';
                            // 更新导航栏
                            updateLoginTab();
                            if (_updateCar) {
                                // 更新购物车
                                _updateCar();
                            }
                        } });
                }
            } });
        $('.loginStatus').parent().attr('href', "../html/login.html?" + window.location.href);

        updateLoginTab = function updateLoginTab() {

            $('.loginStatus').text('您好,' + user).parent().attr('href', "#");
            $('.loginStatus').closest('li').next().find('span').text('退出');
            $('.loginStatus').closest('li').next().find('span').parent().attr('href', "#");

            // 退出
            $('.registStatus').on('click', function () {

                $.get({ url: '../api/isLogin.php', data: { "type": "set", "status": 0, "user": user } });

                $('.loginStatus').text('登录享优惠').parent().attr('href', "../html/login.html?" + window.location.href);
                $('.registStatus').text('注册').parent();

                setTimeout(function () {
                    $('.registStatus').parent().attr('href', "../html/regist.html");
                }, 1000);

                window.location.href = window.location.href;
            });
        };

        $('.ad .container').css('background', "url(../imgs/wb_head_ad.jpg)");
        // 点击关闭广告
        $('.ad span').on('click', function () {

            $('.ad .container').slideUp(500);
        });

        // 鼠标移入万表app
        moveToApp();

        moveToContact();

        SearchEvent();
    });

    Savefordb = function Savefordb(goods, type) {

        console.log(goods, type, user);

        $.get({ url: '../api/carList.php', data: {
                "type": type,
                "gid": goods.gid,
                "imgUrl": goods.imgUrl,
                "desc": goods.desc,
                "price": goods.price,
                "qty": goods.qty,
                "special": goods.special,
                "stores": goods.stores,
                "volume": goods.volume,
                "user": user
            }, success: function success(res) {
                console.log(res);
            } });
    };
    // 顶部万表app动画
    function moveToApp() {

        $('.useropt .wb').hover(function () {

            $('.wb a>span').css({
                border: '1px solid #ccc',
                borderBottom: '1px solid #fff'
            });

            $(this).children('.wbApp').stop().slideDown('fast');
        }, function () {

            $('.wb a>span').css({
                border: '1px solid transparent'
            });
            $(this).children('.wbApp').stop().slideUp('fast');
        });

        // 切换二维码
        $('.wb_bot>span:first-child').on('mouseover', function () {
            $(this).css({
                color: '#000'
            });
            $('.wb img').attr('src', '../imgs/wb_head_app.jpg');
            $(this).siblings('span').css('color', '#9A9791');
        });
        $('.wb_bot>span:last-child').on('mouseover', function () {
            $(this).css({
                color: '#000'
            });
            $('.wb img').attr('src', '../imgs/wb_head_wchat.png');

            $(this).siblings('span').css('color', '#9A9791');
        });
    }
    // 顶部服务专线动画
    function moveToContact() {
        $('.useropt .contact').hover(function () {

            $('.contact a>span').css({
                border: '1px solid #ccc',
                borderBottom: '1px solid #fff'
            });

            $(this).children('.contacts').stop().slideDown('fast');
        }, function () {

            $('.contact a>span').css({
                border: '1px solid transparent'
            });
            $(this).children('.contacts').stop().slideUp('fast');
        });
    }

    // 顶部搜索框
    function SearchEvent() {
        $('.logo .search input').hover(function () {
            $(this).css('borderBottomColor', '#000');
        }, function () {
            $(this).css('borderBottomColor', '#ccc');

            //显示热门推荐
        }).focus(function () {
            $('.search').find('.recommend').stop().show();
        }).blur(function () {
            $('.search').find('.recommend').stop().hide();
        });
    }

    // 侧边栏
    $('.backTop').load('../html/base.html .menu', function () {

        $('.menu').css('height', window.innerHeight);
        $('.carlist').css('height', window.innerHeight - 100);

        $('.menu').find('.close').click(function () {

            $('.menu').animate({ 'right': '-260' });
        });

        $('.menu').find('.car').click(function () {

            $('.menu').animate({ 'right': '0' });
        });

        $('.nowLogin').attr('href', "../html/login.html?" + window.location.href);
        // 动态生成购物车列表
        _updateCar = function updateCar() {
            var qty = 0;
            var total = 0;
            // 获取cookie
            var carList = Cookie.get('goodsList');

            if (carList.length == 0) {
                carList = [];
            } else {
                carList = $.parseJSON(carList);
            }

            $('.carlist').html('');
            var res = $.map(carList, function (item) {
                qty += item.qty * 1;
                total += item.price * qty;
                return '\n                        <li class="clearfix">\n                            <a href="../html/details.html?' + item.gid + '.html">\n                                <img src="' + item.imgUrl + '"/>\n                             </a>\n                            <p>' + item.desc + '</p>\n                            <p><span>\uFFE5 ' + item.price + '</span>&times;<i>' + item.qty + '</i></p>\n                            <a class="del">\u5220\u9664</a>\n                        </li>\n                   ';
            });
            if (isLogin) {
                $('<ul/>').append(res).appendTo('.carlist');
                $('.goodsQty').show();
                $('.clearing').show();
                $('.menu_login').hide();
            } else {
                $('.menu_login').show();
                $('.goodsQty').hide();
                $('.clearing').hide();
            }

            // 更新购物车显示的数量
            $('.goodsQty').text(qty);
            $('.carQty').text(qty + '件商品');
            $('.carTotal').text('￥' + total);

            // 删除购物车商品
            $('li').on('click', '.del', function () {

                // 获取要删除的商品的索引
                var start = $(this).parent().index();
                //从数据库中删除
                Savefordb(carList[start], 'del');
                // 从数组中删除    
                carList.splice(start, 1);

                // 删除后更新cookie
                document.cookie = 'goodsList=' + JSON.stringify(carList) + ';path=/';

                // 更新购物车
                _updateCar();
            });
        };

        // 侧边栏tab选项卡切换
        $('.menuList li').hover(function () {
            // 不显示购物车数量
            $(this).children().not('span').stop().fadeIn(300);
        }, function () {
            // 
            $(this).children().not('span').stop().fadeOut(300);
        });

        // 返回顶部
        $('.toTop').on('click', function () {

            $('body,html').animate({ 'scrollTop': 0 }, 800);
        });

        // 鼠标移入人工服务时的动画
        $('.service').hover(function () {
            $('.serviceCon').show().stop().animate({
                left: -300
            });
        }, function () {
            $('.serviceCon').css({
                left: -290
            }).stop().hide();
        });
    });
    // 底部
    $('.footer').load('../html/base.html footer', function () {
        $('.right .r1').find('li').eq(0).addClass('hover');
        $('.right .r2').find('li').eq(0).addClass('hover');

        // 切换二维码
        $('.right .r1').find('li').eq(0).on('mouseenter', function () {

            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');

            $('.right .r1').find('img').attr('src', '../imgs/wb_fot_wb.png');
        });

        $('.right .r1').find('li').eq(1).on('mouseenter', function () {

            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');

            $('.right .r1').find('img').attr('src', '../imgs/wb_fot_dyh.png');
        });

        $('.right .r2').find('li').eq(0).on('mouseenter', function () {

            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');

            $('.right .r2').find('img').attr('src', '../imgs/wb_fot_wb.png');
        });

        $('.right .r2').find('li').eq(1).on('mouseenter', function () {

            $(this).addClass('hover');
            $(this).siblings().removeClass('hover');

            $('.right .r2').find('img').attr('src', '../imgs/wb_fot_dyh.png');
        });
    });
});
_require(['config'], function () {
    _require(['jquery', 'base', 'common'], function () {

        $('.empty_car').find('a').attr('href', '../html/login.html?' + window.location.href);

        // 获取登录状态
        $.get({ url: '../api/isLogin.php', data: { "type": "get" }, success: function success(res) {

                isLogin = $.parseJSON(res)[0].isLogin * 1;

                // 获取用户名

                user = $.parseJSON(res)[0].user;
                if (isLogin) {
                    // console.log(lis)

                    var updateGoods = function updateGoods() {
                        // 获取cookie
                        carList = Cookie.get('goodsList');

                        lis = [[]];

                        if (carList.length == 0) {
                            carList = [];
                        } else {
                            carList = $.parseJSON(carList);
                        }
                        if (carList.length == 0) {
                            return;
                        }

                        // 商品分类 
                        for (var i = 0; i < carList.length; i++) {

                            for (var j = 0; j < lis.length; j++) {

                                if (lis[0].length == 0) {
                                    lis[0].push(carList[i]);
                                    break;
                                } else {

                                    if (lis[j][0].stores == carList[i].stores) {

                                        lis[j].push(carList[i]);
                                        break;
                                    } else if (j >= lis.length - 1) {

                                        lis.push([carList[i]]);
                                        break;
                                    }
                                }
                            };
                        };
                    };

                    var updateCar = function updateCar() {
                        if (carList.length == 0) {
                            $('.tbodyBox').html('');
                            $('.nogoods').show();
                            $('.tbodyBox').append($('.nogoods'));
                            return;
                        }
                        $('.nogoods').hide();
                        var index = 0;
                        $('.tbodyBox').html('');
                        $.each(lis, function (i, itemArr) {
                            var $box = $('<div/>').addClass('box');
                            var $title = $('<div/>');
                            $title.addClass('title').html('<ul>\n                                                            <li><input class="checkStroes fl" type="checkbox" /><p class="fl">' + itemArr[0].stores + '</p></li>\n                                                        </ul>');

                            var res = $.map(itemArr, function (item, idx) {
                                index++;

                                return '\n                                <div class="tbody clearfix">\n                                    <div class="content clearfix"> \n                                        <dl>\n                                            <dt><input type="checkbox" /></dt>\n                                            <dd><a href="../html/details.html?' + item.gid + '.html"><img src="' + item.imgUrl + '" alt="" /></a></dd>\n                                            <dd><p>' + item.desc + '</p></dd>\n                    \n                                        </dl>\n                                        <ul class="goods" data-idx="' + index + '">\n                                            <li class="price">\n                                                \uFFE5' + item.price + '\n                                            </li>\n                                            <li>\n                                                <a class="less">-</a><input class="qty" type="text" value="' + item.qty + '" /><a class="add">+</a>\n                                            </li>\n                                            <li class="mintotal">\n                                                \uFFE5' + item.price * item.qty + '\n                                            </li>\n                                            <li class="tbody_del">\n                                                <a>\u5220\u9664</a>\n                                            </li>\n                                        </ul>\n                                        \n                                    </div>\n                                </div>\n                            ';
                            });

                            $box.append($title);
                            $box.append(res);
                            $('.tbodyBox').append($box);
                        });
                    };

                    // 更新cookie
                    var updateCookie = function updateCookie(idx, qty) {

                        carList[idx].qty = qty;
                        document.cookie = 'goodsList=' + JSON.stringify(carList) + ';path=/';
                        Savefordb(carList[idx], 'update');
                    };

                    var isCheckAll = function isCheckAll() {

                        // 获取到当前的checkboxs被勾选的个数
                        var $ischecks = $cheboxs.filter(':checked');

                        // 根据个数是否等于总个数来判断是否勾选全部
                        $('.checkAll').prop('checked', $ischecks.length === $cheboxs.length);
                        getTotal();
                    };

                    // 获取总金额
                    var getTotal = function getTotal() {

                        var total = 0;
                        var goodsArr = $('.goods');
                        $.each(goodsArr, function (idx, item) {

                            var ischecked = $(item).closest('.content').find(':checkbox').prop('checked');

                            var subtotal = $(item).find('.mintotal').text().trim().slice(1) * 1;
                            if (ischecked) {
                                total += subtotal;
                            }
                        });
                        $('.total').text('￥' + total);
                    };

                    $('.empty_car').hide();
                    // 生成购物车列表

                    var lis = void 0;
                    var carList;
                    updateGoods();

                    updateCar();


                    var $cheboxs = $('.tbodyBox').find(':checkbox');

                    // 全选
                    $('.checkAll').on('click', function () {
                        $(this).closest('.table').find(':checkbox').prop('checked', this.checked);
                        isCheckAll();
                    });
                    // 选择店铺的全部商品
                    $('.checkStroes').on('click', function () {

                        console.log($(this).closest('.title').next());

                        // $(this).closest('.title').next().find(':checkbox').prop('checked',this.checked);
                        $(this).closest('.box').find(':checkbox').prop('checked', this.checked);
                        isCheckAll();
                    });

                    // 单选一件商品
                    $('.content').find(':checkbox').on('click', function () {
                        getTotal();
                    });

                    // 操作单个商品的数量
                    // 并计算价格
                    // 减少
                    $('.less').on('click', function () {
                        var qty = $(this).next().val() * 1;
                        if (qty == 1) {
                            return;
                        }
                        qty--;
                        var idx = $(this).closest('ul').data('idx') - 1;
                        $(this).next().val(qty);
                        var price = $(this).closest('ul').find('.price').text().trim().slice(1);
                        $(this).closest('ul').find('.mintotal').text('￥' + price * qty);

                        updateCookie(idx, qty);

                        getTotal();
                    });
                    // 增加
                    $('.add').on('click', function () {
                        var qty = $(this).prev().val() * 1;
                        if (qty == 99) {
                            return;
                        }
                        qty++;
                        var idx = $(this).closest('ul').data('idx') - 1;
                        $(this).prev().val(qty);
                        var price = $(this).closest('ul').find('.price').text().trim().slice(1);
                        $(this).closest('ul').find('.mintotal').text('￥' + price * qty);
                        updateCookie(idx, qty);
                        getTotal();
                    });

                    $('.qty').blur(function () {

                        var idx = $(this).closest('ul').data('idx') - 1;

                        var price = $(this).closest('ul').find('.price').text().trim().slice(1);
                        $(this).closest('ul').find('.mintotal').text('￥' + price * $(this).val());
                        updateCookie(idx, $(this).val());
                        getTotal();
                    });

                    // 删除商品

                    $('.tbodyBox').on('click', '.tbody_del', function () {

                        var idx = $(this).closest('ul').data('idx') - 1;

                        //从数据库中删除
                        Savefordb(carList[idx], 'del');
                        // 从数组中删除
                        carList.splice(idx, 1);
                        // 更新cookie
                        document.cookie = 'goodsList=' + JSON.stringify(carList) + ';path=/';
                        updateGoods();
                        updateCar();
                    });
                    getTotal();
                } else {
                    $('.empty_car').show();
                    $('.myCar').hide();
                    $('.nogoods').hide();
                }
            } });
    });
});
/*
	* 封装常用方法
	* 提取公共代码
 */

/**
 * [生成一个范围内的随机整数]
 * @param  {Number} min [范围最小值]
 * @param  {Number} max [范围内最大值]
 * @return {Number}     [返回随机整数]
 */
function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
}

// randomNumber(10,20);
/**
 * [生成4位随机数字验证码]
 * @return {String} [返回随机4位数字的字符串]
 */
function vCode() {
    var res = '';
    for (var i = 0; i < 6; i++) {
        res += parseInt(Math.random() * 10); //'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
    }

    return res;
}

/**
 * [生成随机颜色]
 * @return {String} [返回rgb颜色字符串]
 */
function randomColor() {
    // 随机r,g,b
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function getVcode() {
    // 用于存放结果
    var res = '';

    var str = '0123456789abcdefhijklmnopqrstuvwxyz';

    for (var i = 0; i < 4; i++) {
        var idx = parseInt(Math.random() * str.length);
        res += str.charAt(idx);
    }

    return res;
}

var Cookie = {
    /**
     * [写入修改cookie]
     * @param {String} name   [cookie名]
     * @param {String} val    [cookie值]
     * @param {[Object]} params [cookie参数]
     	* expires {Date} 
     	* path    {String}
     	* domain  {String}
     	* secure  {Boolean}
     */
    set: function set(name, val, params) {
        // params={expires,path,domain,secure}

        // cookie名与cookie值
        var cookieStr = name + '=' + val;

        params = params || {};

        // 有效期
        if (params.expires) {
            cookieStr += ';expires=' + params.expires.toUTCString();
        }

        // 路径
        if (params.path) {
            cookieStr += ';path=' + params.path;
        }

        // 域名
        if (params.domain) {
            cookieStr += ';domain=' + params.domain;
        }

        // 安全性
        if (params.secure) {
            cookieStr += ';secure';
        }

        document.cookie = cookieStr;
    },
    /**
     * [获取cookie]
     * @param  {String} name [description]
     * @return {[type]}      [description]
     */
    get: function get(name) {
        var cookies = document.cookie;

        // 如果cookie不存在，直接返回空字符串
        if (cookies.length === 0) {
            return '';
        }

        var res = '';

        cookies = cookies.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var arr = cookies[i].split('=');
            if (arr[0] === name) {
                res = arr[1];
                break;
            }
        }

        return res;
    },
    /**
     * [删除cookie]
     * @param  {String} name [删除cookie]
     */
    remove: function remove(name) {
        var now = new Date();
        now.setDate(now.getDate() - 10);

        // document.cookie = name + '=x;expires=' + now.toUTCString(); 
        this.set(name, 'x', { expires: now });
    }

    /**
     * [数据类型判断]
     * @param  {All} data [数据类型]
     * @return {String}      [返回数据类型字符串]
     */
};function type(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

// 配置参数
_require.config({
    // baseUrl:'lib',

    // 配置别名（虚拟路径）
    paths: {
        // 格式：别名:真实路径（基于baseUrl）
        jquery: '../lib/jquery-3.2.1',
        carousel: '../lib/jquery-Carousel_cc/jquery.carousel_cc',
        zoom: '../lib/jquery-zoom_cc/jquery.zoom_c',
        list: 'list',
        base: 'base',
        common: 'common'
    },

    // 配置依赖
    shim: {
        base: ['jquery'],
        carousel: ['jquery'],
        zoom: ['jquery']

    }
});

_require(['config'], function () {

    _require(['jquery', 'base', 'zoom', 'common'], function ($) {
        var _this = this;

        var data = [];
        $('.style li').eq(0).addClass('styleClick');
        // 点击款式切换样式
        $('.style li').on('click', function () {

            $(this).siblings().removeClass('styleClick');
            $(this).addClass('styleClick');
        });

        // 根据id获取数据
        var gid = window.location.search;
        gid = gid.slice(1, gid.indexOf('.'));

        $.get({ url: '../api/goodsList.php', data: { 'type': 'Gid', 'id': gid }, success: function success(res) {
                data = $.parseJSON(res);

                updatePage(data[0]);
                // 动态生成放大镜小图
                var smallImgs = $.map(data, function (item) {

                    // 给商品添加数量属性
                    item.qty = 1;

                    return '<li>\n                            <img src="' + item.imgUrl + '" data-big="' + item.imgUrl + '"/>\n                        </li>';
                });
                $('<ul/>').append(smallImgs).appendTo('.smallList');
                // 添加高亮样式
                $('.smallList li').eq(0).addClass('pick');

                // 放大镜, 默认放大第一个
                $('.zoomBox').cZoom({
                    ratio: 2
                });

                // 点击其他小图调用放大镜的方法
                $('.smallList li').on('click', function () {

                    // 添加/去除高亮样式
                    $(this).siblings().removeClass('pick');
                    $(this).addClass('pick');

                    // 更新对应的商品信息
                    updatePage(data[$(this).index()]);

                    $('.zoomBox').children().remove();
                    var $img = $(this).children('img').clone();

                    $img.appendTo($('.zoomBox'));

                    $('.zoomBox').cZoom({
                        // 放大两倍
                        ratio: 2
                    });
                });
            } });

        // 修改商品数量
        // 增加
        $('.add').on('click', function () {
            var qty = $('.qty')[0].value * 1;

            qty += 1;
            if (qty >= 99) {
                qty = 99;
            }
            $('.qty')[0].value = qty;
        });
        // 减少
        $('.less').on('click', function () {
            var qty = $('.qty')[0].value * 1;

            qty -= 1;
            if (qty <= 1) {
                qty = 1;
            }
            $('.qty')[0].value = qty;
        });

        // 获取cookie
        var carList = Cookie.get('goodsList');

        if (carList.length == 0) {
            carList = [];
        } else {
            carList = $.parseJSON(carList);
        }
        $('.bigMask').css({
            height: window.innerHeight,
            width: window.innerWidth
        });
        // 添加购物车
        $('.addCar').on('click', function () {
            // console.log(isLogin)

            if (!isLogin) {

                //弹出登录窗口
                $('.bigMask').show();
                return;
            }

            var pickNum = void 0;
            var g_index = void 0;
            $.map($('.smallList li'), function (item, idx) {
                if (item.className == 'pick') {
                    pickNum = idx;
                }
            });

            var has = carList.some(function (goods, idx) {
                g_index = idx;
                return goods.gid == data[pickNum].gid;
            });
            if (has) {
                var num = carList[g_index].qty;
                num = Number(num) + $('.qty')[0].value * 1;
                carList[g_index].qty = num;
                Savefordb(data[pickNum], "update");
            } else {
                // 添加之前判断是否添加的是否同一个商品
                data[pickNum].qty = $('.qty')[0].value * 1;
                carList.push(data[pickNum]);
                Savefordb(data[pickNum], "insert");
            }
            // 添加
            document.cookie = 'goodsList=' + JSON.stringify(carList) + ';path=/';

            _updateCar();
        });

        // 更新商品详情信息
        function updatePage(opt) {

            $('.zoomBox').children().attr({ 'src': opt.imgUrl, 'data-big': opt.imgUrl });
            $('.con').text(opt.desc);
            $('.grands').text('品牌:   ' + opt.stores);
            $('.colume').text('销量:   ' + opt.volume);
            $('.price').text('￥' + opt.price);
            $('.stage').text('每月' + (opt.price / 12).toFixed(0) + '元×12期');
            $('.t_con').find('a').eq(1).text(opt.stores + '  >');
            $('.t_con').find('a').eq(2).text(opt.desc);
            $('.t_stores').find('a').text(opt.stores);
        }

        // 登录弹窗
        $('.user').focus(function () {
            // 提示词动画
            $('.tip_user').animate({ 'bottom': 30, 'font-size': 12 });
        });

        $('.pass').focus(function () {
            // 提示词动画
            $('.tip_pass').animate({ 'bottom': 30, 'font-size': 12 });
        });
        $('.user').blur(function () {
            if ($(this).val().trim() == '') {
                $('.tip_user').animate({ 'bottom': 5, 'font-size': 16 });
            }
            $('.error_tip').hide();
        });

        $('.pass').blur(function () {
            if ($(this).val().trim() == '') {
                $('.tip_pass').animate({ 'bottom': 5, 'font-size': 16 });
                $('.error_tip').hide();
            }
        });

        $('.det_close').on('click', function () {
            $('.bigMask').hide();
        });

        $('.det_login').on('click', function () {
            console.log($('.user'));

            // 判断输入是否为空
            if ($('.user').val().trim() == '' || $('.pass').val().trim() == '') {
                return;
            }

            // 后台用户名密码判断
            $.get({ url: '../api/regist.php', data: { "type": "login", "user": $('.user').val(), "pass": $('.pass').val() }, success: function success(res) {
                    // 登录成功
                    if (res == 'success') {

                        // 请求修改登录状态
                        $.get({ url: '../api/isLogin.php', data: { "type": "set", "status": 1, "user": $('.user').val() } });
                        isLogin = true;
                        $('.bigMask').hide();
                        updateLoginTab();
                        _updateCar();
                    } else {
                        // 登录失败

                        $('.error_tip').show();
                    }
                } });
        });

        // 默认隐藏导航菜单
        this.timer = setInterval(function () {

            if ($('.tab1>li')[0]) {
                $('.tab1>li').children('ul').hide();

                $('.tab1').hover(function () {
                    $('.tab1>li').children('ul').stop().slideDown();
                }, function () {
                    $('.tab1>li').children('ul').stop().slideUp();
                });
                clearInterval(_this.timer);
            }
        }, 60);
    });
});

_require(['config'], function () {

    _require(['jquery', 'base', 'carousel', 'common'], function ($) {

        $('.nav .container').carousel_c({
            "width": 1200,
            "height": 430,
            "index": 0,
            "type": 'fade',
            "touch": true,
            "className": ['page', 'active'],
            "imgs": ['../imgs/wb_carousel1.jpg', '../../imgs/wb_carousel2.jpg', '../imgs/wb_carousel3.jpg', '../imgs/wb_carousel4.jpg', '../imgs/wb_carousel5.jpg', '../imgs/wb_carousel6.jpg', '../imgs/wb_carousel7.jpg'],
            "btnImg": ['../imgs/wb_l1.png', '../imgs/wb_r1.png']
        });

        var $hot = $('.hot .container');
        var $brands = $('.brands .container');
        var $recommends = $('.recommend .container');
        var $popularity = $('.popularity .container');
        var $special = $('.special .container');
        var $bigImg = $('.bigImg .container');
        var $share = $('.share .container');
        var status = [200, 304];
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {

            if (status.includes(xhr.status)) {

                var res = $.parseJSON(xhr.responseText);

                // 热门榜单
                var hotItem = res.slice(0, 4);

                // 品牌
                var brands = res.slice(4, 9);

                // 热门推荐
                var recommends = res.slice(9, 15);

                // 品牌logo
                var brands_logos = res.slice(15, 21);

                // 人气店铺
                var popularity = res.slice(21, 25);

                // logo
                var brands2 = res.slice(25, 31);

                // bigImg
                var bigImg = res.slice(31, 32);

                // 限量特别版
                var special = res.slice(32, 36);

                var share = res.slice(36, 40);

                // 生成热门榜单内容
                var _hot = $.map(hotItem, function (item) {
                    return '<li>\n                                <a href="../html/list.html">\n                                    <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var hotCon = $('<ul/>');
                hotCon.append(_hot).appendTo($hot);

                // 生成品牌内容
                var _brands = $.map(brands, function (item) {

                    return '<li>\n                                <h4>\n                                    <a href="../html/list.html">' + item.title + '</a>\n                                </h4>\n                                <p>\n                                    <a href="../html/list.html">' + item.content + '</a>\n                                </p>\n                                <a href="../html/list.html">\n                                    <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var brandsCon = $('<ul/>');

                brandsCon.append(_brands).appendTo($brands);

                // 生成品牌logo
                var _logos = $.map(brands_logos, function (item) {

                    return '<li>\n                                <a href="../html/list.html">\n                                    <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var logoCon = $('<ul/>');

                logoCon.append(_logos).appendTo($brands);

                // 生成热门推荐

                var _recommend = $.map(recommends, function (item) {

                    return '<li>\n                                <a href="../html/list.html">\n                                    <div class="bot">\n                                        <h4>' + item.title + '</h4>\n                                        <p>' + item.content + '</p>\n                                     </div> \n                                     <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var recommendCon = $('<ul/>');

                recommendCon.append(_recommend).appendTo($recommends);

                // 生成人气店铺

                var _popularity = $.map(popularity, function (item) {

                    return '<li>\n                                <a href="../html/list.html">\n                                    <div class="bot">\n                                        <h4>' + item.title + '</h4>\n                                     </div> \n                                     <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var popularityCon = $('<ul/>');
                popularityCon.addClass('u1 clearfix');
                popularityCon.append(_popularity).appendTo($popularity);

                // logo
                var _brands2 = $.map(brands2, function (item) {

                    return '<li>\n                                <a href="../html/list.html">\n                                    <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var _brands2Con = $('<ul/>');
                _brands2Con.addClass('u2');
                _brands2Con.append(_brands2).appendTo($popularity);

                // 大图
                $('<img/>').attr('src', bigImg[0].imgUrl).appendTo($bigImg);

                // 限量特别版
                var _special = $.map(special, function (item) {

                    return '<li>\n                                <a href="#">\n                                    <div class="bot">\n                                        <h4>' + item.title + '</h4>\n                                        <p>' + item.content + '</p>\n                                     </div> \n                                     <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var specialCon = $('<ul/>');

                specialCon.append(_special).appendTo($special);

                // 晒单分享
                var _share = $.map(share, function (item) {

                    return '<li>\n                                <a href="../html/list.html">\n                                    <div class="bot">\n                                        <p>' + item.content + '</p>\n                                     </div> \n                                     <img src="' + item.imgUrl + '"/>\n                                </a>\n                            </li>';
                });
                var shareCon = $('<ul/>');

                shareCon.append(_share).appendTo($share);
            }
        };
        xhr.open('get', '../api/index.php', true);
        xhr.send();
    });
});

_require(['config'], function () {

    _require(['jquery', 'base', 'carousel', 'common'], function ($) {
        var _this2 = this;

        // 轮播图
        $('.mainLeft .banner').carousel_c({
            "width": 210,
            "height": 400,
            "index": 0,
            "type": 'horizontal',
            "touch": false,
            "button": false,
            "className": ['page2', 'active2'],
            "imgs": ['../imgs/wb_lis_ban1.jpg', '../imgs/wb_lis_ban2.jpg', '../imgs/wb_lis_ban3.jpg', '../imgs/wb_lis_ban4.jpg']
        });

        // 关键字搜索模块
        var $kwBrands = $('.kwBrands');
        var $kwkwType = $('.kwType');
        var brandsKW = '浪琴 爱宝时 天梭 迪沃斯 欧米茄 劳力士 赫柏林 CK 百达翡丽 菲拉格慕 艾美达 诺美纳 帝舵 积家 阿玛尼 万国 宝玑 宝珀 美度 库尔沃 莫勒 柏高 荣汉斯 卡西欧'.split(' ');

        var typeKW = '机械 自动机械 手动机械 石英 光能 智能 电波 人动电能 陀飞轮 电子 其它'.split(' ');
        createKeyWord($kwBrands, brandsKW);
        createKeyWord($kwkwType, typeKW);
        function createKeyWord(container, kwArr) {
            container.append($.map(kwArr, function (item) {
                return '<li><a>' + item + '</a></li>';
            }));
        }

        // 生成商品列表
        var $goodsList = $('.goodsList');

        var status = [200, 304];

        var g_xhr = new XMLHttpRequest();

        g_xhr.onload = function () {

            if (status.includes(g_xhr.status)) {
                var g_res = $.parseJSON(g_xhr.responseText);
                $goodsList.html('');
                $goodsList.removeClass('nogoods');
                if (g_res.length == 0) {
                    $goodsList.addClass('nogoods').html('没有找到相关的商品哟~~~');
                    return;
                }
                var g_arr = $.map(g_res, function (goods) {

                    return '\n                            <li>\n                                <a href="details.html?' + goods.gid + '.html"><img src="' + goods.imgUrl + '"/></a>\n\n                                <div class="con">\n                                    <p class="clearfix">\n                                        <span class="g_price">&yen;' + goods.price + '</span>\n                                        <span class="g_volume">\u9500\u91CF' + goods.volume + '</span>\n                                    </p>\n\n                                    <p class="g_des">' + goods.desc + '</p>\n                                    <span class="g_special">' + (goods.special == null ? '' : goods.special) + '</span>\n                                    <h4 class="g_stores">' + goods.stores + '</h4>\n                                    <span class="g_Self-support">\u81EA\u8425</span>\n\n                                    <div class="botHide">\n                                        <span class="addToLove">\u52A0\u5165\u6536\u85CF</span>\n                                        <span class="addToCar">\u52A0\u5165\u8D2D\u7269\u8F66</span>\n                                    </div>\n                                </div>\n                            </li> ';
                });
                // 添加到页面中
                $('<ul/>').append(g_arr).appendTo($goodsList);
            }
        };

        g_xhr.open('get', '../api/goodsList.php', true);

        g_xhr.send();

        var $sort = $('.Sort');

        $sort.find('a').eq(0).addClass('sortActive');

        // 排序
        $sort.on('click', 'li', function (e) {

            $(this).siblings().children().removeClass('sortActive');
            $(this).children().addClass('sortActive');

            var sortType = $(this).data('sorttype');

            g_xhr.open('get', '../api/goodsList.php?type=' + sortType, true);

            g_xhr.send();
        });

        //  按价格搜索
        var $priceKW = $('.priceKW');
        $priceKW.on('click', 'a', function () {

            $(this).closest('li').siblings().children('a').removeClass('kwActive');
            $(this).addClass('kwActive');

            priceSearch($(this).text());
        });

        // 手动输入搜索
        $('#comfirm').on('click', function () {

            if (($('#pLt').val() + '-' + $('#pGt').val()).trim() == '-') {
                return;
            }

            // 获取输入价格范围
            priceSearch($('#pLt').val() + '-' + $('#pGt').val());
        });

        // 根据价格范围搜索相应的商品
        function priceSearch(priceAround) {

            // 单项处理
            if (priceAround.indexOf('以下') >= 0) {

                priceAround = ('0-' + priceAround).replace('以下', '');
            } else if (priceAround.indexOf('以上') >= 0) {

                priceAround = (priceAround + '-0').replace('以上', '');
            }

            var arr = priceAround.split('-');

            arr = arr.map(function (item) {

                return item.replace(/,/g, '') * 1;
            });

            g_xhr.open('get', '../api/goodsList.php?type=priceSearch&aroundLt=' + arr[0] + '&aroundGt=' + arr[1], true);

            g_xhr.send();
        }

        // 根据品牌搜索相应的数据

        $('.kwBrands').on('click', 'li', function () {

            $(this).siblings().children().removeClass('kwActive');
            $(this).children().addClass('kwActive');

            g_xhr.open('get', '../api/goodsList.php?type=Brands&brand=' + $(this).text(), true);

            g_xhr.send();
        });

        // 
        $('.btn_search').on('click', function () {

            console.log(999);

            g_xhr.open('get', '../api/goodsList.php?type=Brands&brand=' + $('.searchVal').text(), true);

            g_xhr.send();
        });

        $.ajax({ url: "../api/history.php", success: function success(res) {

                var data = $.map($.parseJSON(res), function (item) {

                    return '\n                    <li>\n                        <a href="#"><img src="' + item.imgUrl + '" /></a>\n                        <div class="bot">\n                            <p class="price">&yen;' + item.price + '</p>\n                            <p class="content">' + item.desc + '</p>\n                        </div>\n\n                    </li>';
                });
                $('<ul/>').append(data).appendTo('.history');
            } });

        // 动态生成热门品牌
        var hotBrands = '百达翡丽 江诗丹顿 宝珀 宝玑 欧米茄 万国 古驰 积家 劳力士 迪沃斯 卡地亚 天梭 浪琴 赫柏林 美度 阿玛尼 CK DW 精工 卡西欧'.split(' ');

        var _hotBrands = $.map(hotBrands, function (item, idx) {

            return '<li><a href="#"><span>' + (idx + 1) + '</span><span>' + item + '</span></a></li>';
        });
        // 动态生成热门词
        var hotWord = 'rolex 卡地亚手表 手表app 手表品牌大全 手表品牌 dw手表 积家 iwc CK手表 沛纳海 卡地亚手表 万国手表 浪琴表价格 欧米茄报价 江诗丹顿手表 世界十大名表 十大名表 卡地亚蓝气球 seiko手表是什么牌子 muehle手表 diesel官网 小红书 依百克'.split(' ');

        var _hotword = $.map(hotWord, function (item) {
            return '<li><a href="#">' + item + '</a></li>';
        });

        $('<ul/>').append(_hotBrands).appendTo('.hotBrands');
        $('<ul/>').append(_hotword).appendTo('.hotBrands');
        // 侧边栏鼠标移入切换内容
        $('.mainLeft').find('h2').hover(function () {

            if ($(this).index() == 0) {
                if ($(this).next('h2')[0] == undefined) {
                    return;
                }
                $(this).css('color', '#000');
                $(this).siblings('h2').css('color', '#999');
                $(this).closest('div').next().show();
                $(this).closest('div').next().next().hide();
            } else {

                $(this).css('color', '#000');
                $(this).siblings('h2').css('color', '#999');
                $(this).closest('div').next().next().show();
                $(this).closest('div').next().hide();
            }
        });

        // 默认隐藏导航菜单
        this.timer = setInterval(function () {

            if ($('.tab1>li')[0]) {
                $('.tab1>li').children('ul').hide();

                $('.tab1').hover(function () {
                    $('.tab1>li').children('ul').stop().slideDown();
                }, function () {
                    $('.tab1>li').children('ul').stop().slideUp();
                });
                clearInterval(_this2.timer);
            }
        }, 60);
    });
});
_require(['config'], function () {
    _require(['jquery', 'base'], function ($) {

        $('.login').on('click', function () {

            $.get({ url: '../api/regist.php', data: { "type": "login", "user": $('.user').val(), "pass": $('.pass').val() }, success: function success(res) {
                    if (res == 'success') {
                        $('.user').next('p').remove();
                        $('.tipWindow').fadeIn(500, function () {

                            $(this).fadeOut(500, function () {
                                // 请求修改登录状态
                                $.get({ url: '../api/isLogin.php', data: { "type": "set", "status": 1, "user": $('.user').val() } });
                                if (window.location.search.length < 4) {
                                    window.location.href = '../index.html';
                                } else {
                                    window.location.href = window.location.search.slice(1);
                                }
                            });
                        });

                        // 获取当前用户的购物车信息
                        $.get({ url: '../api/carList.php', data: { "type": "get", "user": $('.user').val() }, success: function success(res) {
                                // alert(JSON.stringify(res))

                                document.cookie = 'goodsList=' + res + ';path=/';
                            } });
                    } else {
                        $('.user').next('p').remove();
                        $('.user').after(createTip('会员不存在或密码不正确'));
                    }
                } });
        });

        $('input').change(function () {

            $(this).siblings('p').remove();
        });
    });
    // 提示消息
    function createTip(val) {

        var $tip = $('<p/>').addClass('error');
        $tip.text(val);

        return $tip;
    }
});
_require(['config'], function () {
    _require(['jquery', 'common'], function ($) {

        // 用于储存每一个输入内容的验证状态
        var isRegist = [];

        // 点击注册
        $('.regist').on('click', function () {

            if (isRegist.length == 0) {
                return false;
            } else {

                var isOk = isRegist.every(function (item, idx) {

                    return item;
                });

                if (isOk) {

                    $.get({ url: '../api/regist.php', data: { "type": "add", "user": $('.phoneNum').val(), "pass": $('.pass').val() }, success: function success(res) {
                            //验证手机号码是否已经注册
                            console.log(res);
                            if (res == 'success') {

                                // 注册成功

                                $('.tipWindow').fadeIn(500, function () {
                                    $(this).fadeOut(500, function () {

                                        window.location.href = '../html/login.html';
                                    });
                                });
                            }
                        } });
                }
            }
        });

        // 生成随机验证码
        var vCode_show = getVcode();
        // 生成手机短信验证码
        var vCode_phone = vCode();
        console.log(vCode_phone);

        // 设置验证码
        $('.VCode_show').text(vCode_show);

        // 验证再一次输入密码

        $('.rePass').blur(function () {

            isRegist[4] = $('.pass').val() == $(this).val();

            if (!isRegist[4]) {

                $('.rePass').next('p').remove();
                $('.rePass').after(createTip('两次密码不一致'));
            } else {
                $('.rePass').next('p').remove();
            }
        });

        // 验证密码
        $('.pass').blur(function () {

            if ($(this).val().length < 6) {
                isRegist[3] = false;
                $('.pass').next('p').remove();
                $('.pass').after(createTip('密码不能少于6位'));
            } else {
                isRegist[3] = true;
                $('.pass').next('p').remove();
            }
        });

        // 验证短信验证码 
        $('.vCode_phone').blur(function () {

            isRegist[2] = vCode_phone == $(this).val();

            if (!isRegist[2]) {
                $('.vCode_phone').next('p').remove();
                $('.vCode_phone').after(createTip('输入错误也没关系哟!'));
                isRegist[2] = true;
            } else {
                $('.vCode_phone').next('p').remove();
            }
        });

        // 验证输入的验证码
        $('.vCode_in').blur(function () {

            isRegist[1] = vCode_show == $(this).val();

            if (!isRegist[1]) {
                $('.yzm').next('p').remove();
                $('.yzm').after(createTip('请输入正确的验证码'));
            } else {
                $('.yzm').next('p').remove();
            }
        });

        // 验证输入的手机号码
        $('.phoneNum').blur(function () {

            var phone = $(this).val();

            var _reg = /^[1][356489][\d]{9}$/;

            if (phone.trim() == '') {
                $('.phoneNum').next('p').remove();
                $('.phoneNum').after(createTip('请输入手机号'));
                isRegist[0] = false;
                return;
            } else if (!_reg.test(phone)) {
                $('.phoneNum').next('p').remove();
                $('.phoneNum').after(createTip('请输入正确的手机号码'));
                isRegist[0] = false;
                return;
            } else {
                isRegist[0] = true;
                $('.phoneNum').next('p').remove();
            }

            $.get({ url: '../api/regist.php', data: { "type": "check", "phone": phone }, success: function success(res) {
                    //验证手机号码是否已经注册
                    if (res == 'fail') {

                        $('.phoneNum').next('p').remove();
                        $('.phoneNum').after(createTip('该用户已经被注册'));
                        isRegist[0] = false;
                    }
                } });
        });

        // 提示消息
        function createTip(val) {

            var $tip = $('<p/>').addClass('error');
            $tip.text(val);

            return $tip;
        }
    });
});
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.5 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, _require, define;
(function (global, setTimeout) {
    var req,
        s,
        head,
        baseElement,
        dataMain,
        src,
        interactiveScript,
        currentlyAddingScript,
        mainScript,
        subPath,
        version = '2.3.5',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',

    //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',

    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof _require !== 'undefined' && !isFunction(_require)) {
        //assume it is a config object.
        cfg = _require;
        _require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded,
            Module,
            context,
            handlers,
            checkLoadedTimeoutId,
            _config = {
            //Defaults. Do not set a default for map
            //config to speed up normalize(), which
            //will run faster if there is no default.
            waitSeconds: 7,
            baseUrl: './',
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
            registry = {},

        //registry of just enabled modules, to speed
        //cycle breaking code when lots of modules
        //are registered, but not activated.
        enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            _defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain,
                mapValue,
                nameParts,
                i,
                j,
                nameSegment,
                lastIndex,
                foundMap,
                foundI,
                foundStarMap,
                starI,
                normalizedBaseParts,
                baseParts = baseName && baseName.split('/'),
                map = _config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (_config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(_config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name && scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(_config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url,
                pluginModule,
                suffix,
                nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(_defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ? normalize(name, parentName, applyMap) : name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ? '_unnormalized' + (unnormalizedCounter += 1) : '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + '!' + normalizedName : normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(_defined, id) && (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(_defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function (queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function require(mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return mod.require = context.makeRequire(mod.map);
                }
            },
            'exports': function exports(mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return _defined[mod.map.id] = mod.exports;
                    } else {
                        return mod.exports = _defined[mod.map.id] = {};
                    }
                }
            },
            'module': function module(mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function config() {
                            return getOwn(_config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    };
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, _defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err,
                usingPathFallback,
                waitInterval = _config.waitSeconds * 1000,

            //It is possible to disable the wait interval by using waitSeconds of 0.
            expired = waitInterval && context.startTime + waitInterval < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return needCycleCheck = false;
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function Module(map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(_config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function init(depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function defineDep(i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function fetch() {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = new Date().getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function load() {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function check() {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err,
                    cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError(this.error = err);
                            }
                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            _defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }
                }
            },

            callPlugin: function callPlugin() {
                var map = this.map,
                    id = map.id,

                //Map already normalized the prefix.
                pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load,
                        normalizedMap,
                        normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                        enableBuildCallback: true
                    });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name, this.map.parentMap, true);
                        on(normalizedMap, 'defined', bind(this, function (value) {
                            this.map.normalizedMap = normalizedMap;
                            this.init([], function () {
                                return value;
                            }, null, {
                                enabled: true,
                                ignore: true
                            });
                        }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () {
                            return value;
                        }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(_config.config, id)) {
                            _config.config[moduleName] = _config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval', 'fromText eval for ' + id + ' failed: ' + e, e, [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, _config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function enable() {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function (err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function on(name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function emit(name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(_defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: _config,
            contextName: contextName,
            registry: registry,
            defined: _defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function configure(cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function (id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = _config.shim,
                    objs = {
                    paths: true,
                    bundles: true,
                    config: true,
                    map: true
                };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!_config[prop]) {
                            _config[prop] = {};
                        }
                        mixin(_config[prop], value, true, true);
                    } else {
                        _config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    _config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            _config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        _config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function makeShimExports(value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || value.exports && getGlobal(value.exports);
                }
                return fn;
            },

            makeRequire: function makeRequire(relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(_defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? '' : '. Use require([])')));
                        }
                        return _defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function toUrl(moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                    },

                    defined: function defined(id) {
                        return hasProp(_defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function specified(id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(_defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete _defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function (args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function enable(depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function completeLoad(moduleName) {
                var found,
                    args,
                    mod,
                    shim = getOwn(_config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(_defined, moduleName) && mod && !mod.inited) {
                    if (_config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine', 'No define call for ' + moduleName, null, [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, shim.deps || [], shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function nameToUrl(moduleName, ext, skipExt) {
                var paths,
                    syms,
                    i,
                    parentModule,
                    url,
                    parentPath,
                    bundleId,
                    pkgMain = getOwn(_config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = _config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js');
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : _config.baseUrl) + url;
                }

                return _config.urlArgs && !/^blob\:/.test(url) ? url + _config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function load(id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function execCb(name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function onScriptLoad(evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function onScriptError(evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function (value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function (depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id + (parents.length ? '", needed by: ' + parents.join(', ') : '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function requirejs(deps, callback, errback, optional) {

        //Find the right context, use default
        var context,
            config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) {
        fn();
    };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!_require) {
        _require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each(['toUrl', 'undef', 'defined', 'specified'], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = context && context.config || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
            //Check if node.attachEvent is artificially added by custom script or
            //natively supported by browser
            //read https://github.com/requirejs/requirejs/issues/187
            //if we can NOT find [native code] then it must NOT natively supported.
            //in IE8, node.attachEvent does not have toString()
            //Note the test for "[native code" with no closing brace, see:
            //https://github.com/requirejs/requirejs/issues/273
            !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function () {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts', 'importScripts failed for ' + moduleName + ' at ' + url, e, [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return interactiveScript = script;
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/') + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function define(name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (match, dep) {
                    deps.push(dep);
                });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
})(undefined, typeof setTimeout === 'undefined' ? undefined : setTimeout);