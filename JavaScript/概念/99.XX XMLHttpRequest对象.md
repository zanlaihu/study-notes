# AJAX

2005 年，Jesse Jasmes Garrett 撰写的《Ajax——A New Approach to Web Applications》描绘了 Ajax，它可以向服务器发送请求且不刷新页面。

Ajax 的名称包含 XML，但 Ajax 通信与数据格式格式不一定是 XML。

在 Ajax 之前也存在类似的技术，称为远程脚本。JavaScript 对服务器的请求可以通过中介（Java 小程序或 flash）发送。后来 XHR 对象(XMLHttpRequest 对象)为开发者提供了原生的浏览器通信能力。它的出现将 Ajax 推上了历史的舞台。

微软最早发明了 XHR 对象，而后被其他厂商借鉴。在它出现之前，类似 Ajax 的通信必须使用黑科技，比如隐藏的窗格或内嵌窗格。

XHR 对象为发送服务器请求和获取响应提供接口。这个接口可以实现异步从服务器获取数据。通过 XHR 对象获取数据后，可以使用 DOM 方法把数据插入网页。

但是 XHR 对象的 API 被普遍认为比较难用。Fetch API 问世后成为更好的替代标准，它支持期约（Promise）和服务线程（service worker）。

# XMLHttpRequest 对象

XHR 对象通过 ActiveX 对象实现并包含在 MSXML 库中。所以，XHR 对象的 3 个版本在浏览器中被暴露为 MSXML2.XMLHttp、MSXML2.XMLHttp.3.0
和 MXSML2.XMLHttp.6.0。

所有现代浏览器都通过 XMLHttpRequest 构造函数原生支持 XHR 对象。

使用 XHR 对象要调用 open()方法，有 3 个入参：请求类型、请求 url、请求是否异步的布尔值。

```js
let xhr = new XMLHttpRequest();
xhr.open("get", "example.php", false);
xhr.send(null);
```

这个代码向 example.php 发送一个同步的 GET 请求。这里的 URL 相对于代码所在的位置，也可以使用绝对路径。只能访问同源 URL，否则抛出安全错误。调用 open()不会发送实际请求，只是为发送请求做好准备。

调用 send()方法才将请求发送给服务器，这个方法接收一个参数，作为请求体发送的数据。如果不需要请求体，则必须传 null。

因为这个请求是同步的，所以 JavaScript 代码会等待服务器响应之后再继续执行。收到响应后，XHR 对象的以下属性会被填充上数据：

status：响应的 HTTP 状态。

responseText: 作为响应体返回的文本。

responseXML: 如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的 XML DOM 文档。

statusText：响应的 HTTP 状态描述。

收到响应后，第一步要检查 status 属性以确保响应成功返回，为 2XX 一般表示成功。此时 responseText 或 responseXML 属性在内容类型正确的情况下会有内容。如果状态码是 304，则表示资源未修改，从浏览器缓存直接拿取，这也意味着响应有效。为确保收到正确的响应，需要检查这些状态：

但是无论响应是否成功，responseText 或 responseXML 属性始终会尝试保存响应。

前面使用了同步，但是异步是更好的选择，这样可以不阻塞 JavaScript。XHR 对象具有 readyStatus 属性，表示当前处在请求/响应过程的哪个阶段：
| 值 | 阶段 | 意义 |
| --| ------------- | -- |
| 0 | Uninitialized | 未调用 open()方法 |
| 1 | Open | 已调用 open()，未调用 send() |
| 2 | Sent | 已调用 send()，未收到响应 |
| 3 | Receiving | 已经收到部分响应 |
| 4 | Complete | 已经收到全部响应，可以使用 |

readyStatus 值每次更改，都会触发 readystatechange 事件。一般关心这个值是否为 4。

为保证跨浏览器兼容，onreadystatechange 事件处理程序应该在调用 open()之前赋值：

```js
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Failed:" + xhr.status);
    }
  }
};

xhr.open("get", "example.txt", true);
xhr.send(null);
```

以上代码使用 DOM Level0 风格为 XHR 对象添加了事件处理程序，因为并不是所有浏览器都支持 DOM Level2 风格。与其他事件处理程序不同，onreadystatechange 事件不会收到 event 对象。在事件处理程序中，必须使用 XHR 对象本身来确定接下来该做什么。

由于 onreadystatechange 事件处理程序的作用域问题，这个例子使用 XHR 对象而不是 this 对象。使用 this 可能导致功能失败或导致错误，取决于用户的浏览器。保险起见，使用 XHR 对象更好。

在收到响应之前如果想取消异步请求，可以使用 abort()：

```js
xhr.abort();
```

调用这个方法后，XHR 对象会停止触发事件，并阻止访问这个对象上任何与响应相关的属性。中断请求后，应该取消对 XHR 对象的引用。由于内存问题，不推荐重用 XHR 对象。

# HTTP 头部

每个 HTTP 请求和响应都会携带头部字段：

- Accept：浏览器可以处理的内容类型。
- Accept-Charset：浏览器可以显示的字符集。
- Accept-Encoding：浏览器可以处理的压缩编码类型。
- Accept-Language：浏览器使用的语言。
- Connection：浏览器与服务器的连接类型。
- Cookie：页面中设置的 Cookie。
- Host：发送请求的页面所在的域。
- Referer：发送请求的页面的 URL。这个字段在 HTTP 规范中就拼错了，所以考虑到兼容就一错再错。
- User-Agent：浏览器的用户代理字符串。

如果需要发送额外的请求头部，可以使用 setRequestHeader()方法。 它接受两个参数：头部字段的名称和值。为保证请求头部被发送，必须在 open()之后、send()之前调用：

```js
// 省略上面步骤。。。
xhr.open("get", "example.php", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```

浏览器通过读取自定义头部可以确定适当的操作。自定义头部一定要区别于浏览器正常发送的头部，否则可能影响浏览器正常响应。

getResponseHeader()方法可以从 XHR 对象获取响应头部。
getAllResponseHeaders()方法可以获取所有响应头部，返回包含所有响应头部的字符串。

```js
let myHeader = xhr.getResponseHeader("MyHeader");
let allHeader = xhr.getAllResponseHeaders();
```

服务器可以使用头部向浏览器传递额外的结构化数据。getAllResponseHeaders()通常返回如下字符串：

```js
Date: Sun, 14 Nov 2004 18:04:03 GMT
Server: Apache/1.3.29 (Unix)
Vary: Accept
X-Powered-By: PHP/4.3.8
Connection: close
Content-Type: text/html; charset=iso-8859-1
```

# GET

GET 请求用于向服务器查询信息。必要时需要在请求的 URL 后添加查询字符串参数。

查询字符串格式必须使用 encodeURLComponent()编码，所以名/值对必须以&分隔:

```js
xhr.open("get", "example.php?name1=value1&name2=value2", true);
```

可使用这个函数将查询字符串参数添加到 URL 末尾。使用了 encodeURLComponent()对参数进行编码来确保格式正确。

```js
function addURLParam(url, name, value) {
  url = url + (url.indexOf("?") == -1 ? "?" : "&");
  url = url + encodeURLComponent(name) + "=" + encodeURLComponent(value);
  return url;
}

let url = "exmaple.php";
url = addURLParam(url, "name", "Klaus");

xhr.open("get", url, false);
```

# POST
