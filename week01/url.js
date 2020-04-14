
/*
*Description 解析url中的query
*@name query的key
*@return  返回query中key的值
*/
function getQueryVal(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

/*
*Description 获取query(方法很笨)
*@name query的key
*@return  返回query中key的值
*/
function getQueryString(url) {
    // let exp = /[^.?.]*)\\?/
    let start = url.indexOf("?")>-1?url.indexOf("?"):-1
    if(start==-1) return null
    let end = url.indexOf("#")>-1?url.indexOf("#"):-1
    let query = ""
    if(end==-1) {
        query = url.substring(start+1,url.length)
    }else {
        query =  url.substring(start+1,end)
    }
	return query;
}
/*
*Description 以键值对的形式返回query
*@name url
*@return  返回query的键值对
*/
function getQueryObj(url) {
    let queryStr = getQueryString(url)
    let queryArr = queryStr.split('&'),
        queryArrLength = queryArr.length,
        params = {};
    queryArr.forEach(item=>{
        let keyAndValArr = item.split('=')
        params[keyAndValArr[0]] = keyAndValArr[1]
    })
    return param
}
/*
*Description 返回url中的各个部分
*@name url
*@return  
*/
function parseURL(url) {
//   var a = document.createElement('a');
//   a.href = url;
  var a = new URL(url);
  return {
    source: url,
    protocol: a.protocol.replace(':', ''), 
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function() {
      var params = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          p;
      for (var i = 0; i < len; i++) {
        if (seg[i]) {
           p = seg[i].split('=');
           params[p[0]] = p[1];   
        }
      }
      return params;
   })(),
   hash: a.hash.replace('#', ''),
   path: a.pathname.replace(/^([^\/])/, '/$1')
  };
}