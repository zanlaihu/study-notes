http://www.ruanyifeng.com/blog/2016/08/http.html
需继续

# HTTP 协议入门

HTTP 协议是互联网的基础协议。HTTP 是基于 TCP/IP 协议的应用层协议。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的通信格式，默认使用 80 端口。

# HTTP/0.9

1991 年 0.9 版，只有 GET：

```js
GET / index.html;
```

表示 TCP 连接建立后，客户端向服务器请求网页 index.html。

协议规定服务器只能回应 HTML 格式的字符串。比如：

```html
<html>
  <body>
    Hello
  </body>
</html>
```

服务器发送完毕就关闭 TCP 连接。

# HTTP/1.0

1996 年，HTTP/1.0 版本发布。

任何格式的内容都可以发送。图像、视频、二进制文件，从此互联网开始大发展。

引入了 POST 和 HEAD，丰富了浏览器与服务器的互动手段。还有状态码(status code)、多字符集支持、多部分发送（multi-part type）、权限（authorization）、缓存（cache）、内容编码（content encoding）等。

HTTP 请求和回应的格式也变了。除了数据，还需要包含头信息（HTTP header），用来描述元数据。

## 请求格式

```js
GET / HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_S)
Accept: */*
```

第一行是请求命令，尾部必须有协议版本（HTTP/1.0）。后面是多行头信息，描述客户端。

## 回应格式

```
HTTP/1.0 200 OK
Content-Type: text/plain
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84
<html>
  <body>
    Hello World
  </body>
</html>
```

回应的格式是"头信息 + 一个空行（\r\n） + 数据"。其中，第一行是"协议版本 + 状态码（status code） + 状态描述"。

## Content-Type

关于字符的编码，1.0 版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是 Content-Type 字段的作用。

常见的 Content-Type 字段：
text/plain
text/html
text/css
image/jpeg
image/png
image/svg+xml
audio/mp4
video/mp4
application/javascript
application/pdf
application/zip
application/atom+xml
这些数据类型总称为 MIME type，每个值包括一级类型和二级类型，之间用斜杠分隔。
