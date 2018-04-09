jQuery(($)=>{
    // 轮播图
    $('.nav .container').carousel_c({
        "width":1200,
        "height":430,
        "index":0,
        "type":'fade',
        "touch":true,
        "className":['page','active'],
        "imgs":['../imgs/wb_carousel1.jpg','../../imgs/wb_carousel2.jpg','../imgs/wb_carousel3.jpg','../imgs/wb_carousel4.jpg','../imgs/wb_carousel5.jpg','../imgs/wb_carousel6.jpg','../imgs/wb_carousel7.jpg'],
        "btnImg":['../imgs/wb_l1.png','../imgs/wb_r1.png']
    });

    let $hot = $('.hot .container');
    let $brands = $('.brands .container');
    let $recommends = $('.recommend .container');
    let $popularity = $('.popularity .container');
    let $special = $('.special .container');
    let $bigImg = $('.bigImg .container');
    let $share = $('.share .container');
    let status = [200,304];
    let xhr = new XMLHttpRequest();
    xhr.onload = ()=>{

        if(status.includes(xhr.status)){

            let res =  $.parseJSON(xhr.responseText);

            // 热门榜单
            let hotItem = res.slice(0,4);

            // 品牌
            let brands = res.slice(4,9);

            // 热门推荐
            let recommends = res.slice(9,15);

            // 品牌logo
            let brands_logos = res.slice(15,21);

            // 人气店铺
            let popularity = res.slice(21,25);

            // logo
            let brands2 = res.slice(25,31);

            // bigImg
            let bigImg = res.slice(31,32);

            // 限量特别版
            let special = res.slice(32,36);

            let share = res.slice(36,40);

            // 生成热门榜单内容
            let _hot = $.map(hotItem,item=>{
                return `<li>
                            <a href="../html/list.html">
                                <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;   
            })
            let hotCon = $('<ul/>');
            hotCon.append(_hot).appendTo($hot);

            // 生成品牌内容
            let _brands = $.map(brands,item=>{

                return `<li>
                            <h4>
                                <a href="../html/list.html">${item.title}</a>
                            </h4>
                            <p>
                                <a href="../html/list.html">${item.content}</a>
                            </p>
                            <a href="../html/list.html">
                                <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let brandsCon = $('<ul/>');

            brandsCon.append(_brands).appendTo($brands);


            // 生成品牌logo
            let _logos = $.map(brands_logos,item=>{

                return `<li>
                            <a href="../html/list.html">
                                <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let logoCon = $('<ul/>');

            logoCon.append(_logos).appendTo($brands);            

            // 生成热门推荐
                 
            let _recommend = $.map(recommends,item=>{

                return `<li>
                            <a href="../html/list.html">
                                <div class="bot">
                                    <h4>${item.title}</h4>
                                    <p>${item.content}</p>
                                 </div> 
                                 <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let recommendCon = $('<ul/>');

            recommendCon.append(_recommend).appendTo($recommends);            

            // 生成人气店铺
                 
            let _popularity = $.map(popularity,item=>{

                return `<li>
                            <a href="../html/list.html">
                                <div class="bot">
                                    <h4>${item.title}</h4>
                                 </div> 
                                 <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let popularityCon = $('<ul/>');
            popularityCon.addClass('u1 clearfix');            
            popularityCon.append(_popularity).appendTo($popularity);                          

            // logo
            let _brands2 = $.map(brands2,item=>{

                return `<li>
                            <a href="../html/list.html">
                                <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let _brands2Con = $('<ul/>');
            _brands2Con.addClass('u2');
            _brands2Con.append(_brands2).appendTo($popularity);   


            
            // 大图
            $('<img/>').attr('src',bigImg[0].imgUrl).appendTo($bigImg);


            // 限量特别版
            let _special = $.map(special,item=>{

                return `<li>
                            <a href="#">
                                <div class="bot">
                                    <h4>${item.title}</h4>
                                    <p>${item.content}</p>
                                 </div> 
                                 <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let specialCon = $('<ul/>');

            specialCon.append(_special).appendTo($special);            

            // 晒单分享
            let _share = $.map(share,item=>{

                return `<li>
                            <a href="../html/list.html">
                                <div class="bot">
                                    <p>${item.content}</p>
                                 </div> 
                                 <img src="${item.imgUrl}"/>
                            </a>
                        </li>`;
            })
            let shareCon = $('<ul/>');

            shareCon.append(_share).appendTo($share);
                 
        }

    }
    xhr.open('get','../api/index.php',true);
    xhr.send();
})












