const url = "www.baidu.com?param1=123&param2=231";

const url2 = "www.baidu.com";

const params = (url.split('?')[1].length > 0 ? url.split('?')[1] : '');

console.log(params);