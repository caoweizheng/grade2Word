// 配置参数
require.config({
    // baseUrl:'lib',

    // 配置别名（虚拟路径）
    paths:{
        // 格式：别名:真实路径（基于baseUrl）
        jquery:'../lib/jquery-3.2.1',
        carousel:'../lib/jquery-Carousel_cc/jquery.carousel_cc',
        zoom:'../lib/jquery-zoom_cc/jquery.zoom_c',
        list:'list',
        base:'base',
        common:'common'
    },

    // 配置依赖
    shim:{
        base:['jquery'],
        carousel:['jquery'],
        zoom:['jquery']
        
    }
})
