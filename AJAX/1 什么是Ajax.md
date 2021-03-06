# AJAX

AJAX = Asynchromous JavaScript and XML

AJAX 是一个使用现有标准的新方法，它通过在后台与服务器进行少量数据交换，使网页实现异步更新，所以可以在不刷新页面的情况下，与服务器交换数据并更新部分网页内容。

不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行。

一个简单例子：
https://www.runoob.com/try/try.php?filename=tryajax_first

1. 在页面加载后从服务器请求数据。
2. 在页面加载后从服务器接收数据。
3. 在后台向服务器发送数据。

AJAX 组合了：

1. 浏览器内建的 XMLHttpRequest 对象（从 web 服务器请求数据）。
2. JavaScript 和 HTML DOM（显示或使用数据）。

Ajax 是一个令人误导的名称。Ajax 应用程序可能使用 XML 来传输数据，但将数据作为纯文本或 JSON 文本传输也同样常见。

# XMLHttpRequest 对象

所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）。

# 创建 XMLHttpRequest 对象

如果浏览器不支持 XMLHttpRequest 对象，可以使用 ActiveX 对象：

```js
let xhttp;

if (window.XMLHttpRequest) {
  xhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
```

# 向服务器发送请求


# 跨域访问

出于安全原因，现代浏览器不允许跨域访问。
这意味着尝试加载的网页和 XML 文件都必须位于相同服务器上。
W3School 上的实例都会打开位于 W3School 域上的 XML 文件。
如果您希望在自己的页面上使用以上实例，那么您所加载的 XML 文件必须位于您自己的服务器上。

## XMLHttpRequest 对象方法：

方法 描述
new XMLHttpRequest() 创建新的 XMLHttpRequest 对象
abort() 取消当前请求
getAllResponseHeaders() 返回头部信息
getResponseHeader() 返回特定的头部信息
open(method, url, async, user, psw) 规定请求
method：请求类型 GET 或 POST
url：文件位置
async：true（异步）或 false（同步）
user：可选的用户名称
psw：可选的密码
send() 将请求发送到服务器，用于 GET 请求
send(string) 将请求发送到服务器，用于 POST 请求
setRequestHeader() 向要发送的报头添加标签/值对

## XMLHttpRequest 对象属性：

onreadystatechange 定义当 readyState 属性发生变化时被调用的函数
readyState 保存 XMLHttpRequest 的状态。
0：请求未初始化
1：服务器连接已建立
2：请求已收到
3：正在处理请求
4：请求已完成且响应已就绪
responseText 以字符串返回响应数据
responseXML 以 XML 数据返回响应数据
status 返回请求的状态号
200: "OK"
403: "Forbidden"
404: "Not Found"
statusText 返回状态文本（比如 "OK" 或 "Not Found"）

# AJAX 向服务器发送请求

请在以下情况始终使用 POST：
缓存文件不是选项（更新服务器上的文件或数据库）
向服务器发送大量数据（POST 无大小限制）
发送用户输入（可包含未知字符），POST 比 GET 更强大更安全

如需像 HTML 表单那样 POST 数据，请通过 setRequestHeader() 添加一个 HTTP 头部。请在 send() 方法中规定您需要发送的数据：

```js
xhttp.open("POST", "ajax_test.asp", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("fname=Bill&&lname=Gates");
```

同步请求
由于代码将等待服务器完成，所以不需要 onreadystatechange 函数

```js
xhttp.open("GET", "ajax_info.txt", false);
xhttp.send();
document.getElementById("demo").innerHTML = xhttp.responseText;
```

# 服务器响应
