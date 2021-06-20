# 网络请求与远程资源

1. XMLHttpRequest 对象
2. XMLHttpRequest 事件
3. 源域 Ajax 限制
4. Fetch API
5. Streams API

2005 年，Jesse Jasmes Garrett 撰写了《Ajax——A New Approach to Web Applications》，描绘 Ajax(Asynchronous JavaScript + XML),它可以向服务器发送请求且不刷新页面，从而实现更好的用户体验。Ajax 这个名称包含 XML，但 Ajax 通信与数据格式无关，格式不一定是 XML。

在 Ajax 之前存在类似的技术，称为远程脚本。JavaScript 对服务器的请求可以通过中介（Java 小程序或 flash）发送。后来 XHR 对象(XMLHttpRequest 对象)为开发者提供了原生的浏览器通信能力。它的出现将 Ajax 推上了历史的舞台。

微软最早发明了 XHR 对象，而后被其他厂商借鉴。在它出现之前，类似 Ajax 的通信必须使用黑科技，比如隐藏的窗格或内嵌窗格。

XHR 对象为发送服务器请求和获取响应提供接口。这个接口可以实现异步从服务器获取数据。通过 XHR 对象获取数据后，可以使用 DOM 方法把数据插入网页。

但是 XHR 对象的 API 被普遍认为比较难用。Fetch API 问世后成为更好的替代标准，它支持期约（Promise）和服务线程（service worker）。

# XMLHttpRequest 对象

XHR 对象通过 ActiveX 对象实现并包含在 MSXML 库中。所以，XHR 对象的 3 个版本在浏览器中被暴露为 MSXML2.XMLHttp、MSXML2.XMLHttp.3.0
和 MXSML2.XMLHttp.6.0。

所有现代浏览器都通过 XMLHttpRequest 构造函数原生支持 XHR 对象。

```
let xhr = new XMLHttpRequest();
```

# 使用 XHR

使用 XHR 对象要调用 open()方法，它接受 3 个参数：请求类型、请求 url、表示请求是否异步的布尔值。

```js
xhr.open("get", "example.php", false);
xhr.send(null);
```

这个代码向 example.php 发送一个同步的 GET 请求。这里的 URL 相对于代码所在的位置，也可以使用绝对路径。调用 open()不会发送实际请求，只是为发送请求做好准备。

调用 send()方法才将请求发送给服务器，这个方法接收一个参数，作为请求体发送的数据。如果不需要请求体，则必须传 null。

因为这个请求是同步的，所以 JavaScript 代码会等待服务器响应之后再继续执行。收到响应后，XHR 对象的以下属性会被填充上数据：

status：响应的 HTTP 状态。

responseText: 作为响应体返回的文本。

responseXML: 如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的 XML DOM 文档。

statusText：响应的 HTTP 状态描述。

收到响应后，第一步要检查 status 属性以确保响应成功返回，为 2XX 一般表示成功。此时 responseText 或 responseXML 属性在内容类型正确的情况下会有内容。如果状态码是 304，则表示资源未修改，从浏览器缓存直接拿取，这也意味着响应有效。

为确保收到正确的响应，需要检查这些状态：

```js
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
  alert(xhr.responseText);
} else {
  alert("Failed:" + xhr.status);
}
```

但是无论响应是否成功，responseText 或 responseXML 属性始终会尝试保存响应。

前面使用了同步，但是异步是更好的选择，这样可以不阻塞 JavaScript。XHR 对象具有 readyStatus 属性，表示当前处在请求/响应过程的哪个阶段：
| 值 | 阶段 | 意义 |
| --- | ------------- | ---------------------------- |
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

以上代码使用DOM Level0风格为XHR对象添加了事件处理程序，因为并不是所有浏览器都支持DOM Level2风格。与其他事件处理程序不同，onreadystatechange事件不会收到event对象。在事件处理程序中，必须使用XHR对象本身来确定接下来该做什么。

由于onreadystatechange事件处理程序的作用域问题，这个例子使用XHR对象而不是this对象。使用this可能导致功能失败或导致错误，取决于用户的浏览器。保险起见，使用XHR对象更好。

在收到响应之前如果想取消异步请求，可以使用abort()：
```
xhr.abort();
```
调用这个方法后，XHR对象会停止触发事件，并阻止访问这个对象上任何与响应相关的属性。中断请求后，应该取消对XHR对象的引用。由于内存问题，不推荐重用XHR对象。

# HTTP头部

