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
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min
}


// randomNumber(10,20);
/**
 * [生成4位随机数字验证码]
 * @return {String} [返回随机4位数字的字符串]
 */
function vCode(){
	var res = '';
	for(var i=0;i<6;i++){
		res += parseInt(Math.random()*10);//'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
	}

	return res;
}


/**
 * [生成随机颜色]
 * @return {String} [返回rgb颜色字符串]
 */
function randomColor(){
	// 随机r,g,b
	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);


	return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function getVcode(){
	// 用于存放结果
	var res = '';

	var str = '0123456789abcdefhijklmnopqrstuvwxyz';

	for(var i=0;i<4;i++){
		var idx = parseInt(Math.random()*str.length);
		res += str.charAt(idx);
	}

	return res
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
	set:function(name,val,params){
		// params={expires,path,domain,secure}

		// cookie名与cookie值
		var cookieStr = name +'=' + val;

		params = params || {};

		// 有效期
		if(params.expires){
			cookieStr += ';expires=' + params.expires.toUTCString();
		}

		// 路径
		if(params.path){
			cookieStr += ';path=' + params.path;
		}

		// 域名
		if(params.domain){
			cookieStr += ';domain=' + params.domain;
		}


		// 安全性
		if(params.secure){
			cookieStr += ';secure';
		}


		document.cookie = cookieStr;
	},
	/**
	 * [获取cookie]
	 * @param  {String} name [description]
	 * @return {[type]}      [description]
	 */
	get:function(name){
		var cookies = document.cookie;

		// 如果cookie不存在，直接返回空字符串
		if(cookies.length===0){
			return '';
		}

		var res = '';

		cookies = cookies.split('; ');
		for(var i=0;i<cookies.length;i++){
			var arr = cookies[i].split('=');
			if(arr[0] === name){
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
	remove:function(name){
		var now = new Date();
		now.setDate(now.getDate()-10);

		// document.cookie = name + '=x;expires=' + now.toUTCString(); 
		this.set(name,'x',{expires:now});
	}
}


/**
 * [数据类型判断]
 * @param  {All} data [数据类型]
 * @return {String}      [返回数据类型字符串]
 */
function type(data){
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

