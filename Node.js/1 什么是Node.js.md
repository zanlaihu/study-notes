Node.js 是一个开源且跨平台的 JavaScript 运行环境。

Node.js APP 在一个单进程中执行，无需为每个请求创建一个新线程。Node.js 在其标准库中提供了一组异步 I/O，以防止 JavaScript 代码阻塞。通常，Node.js 中的库使用非阻塞范式编写，使得阻塞行为成为例外而不是常态。

当 Node.js 执行异步操作时，比如网路读取、访问数据库或文件系统，它不会阻塞线程和浪费 CPU 周期等待，它会在相应返回时恢复操作。

这让 Node.js 可以处理来自单个服务器的数千个并发连接，且没有管理线程并发的负担。

在 Node.js 中可以随意使用不同版本的 ECMAScript，因为开发者可以通过自行修改项目 Node.js 版本来决定用哪个 ECMAScript 版本。所以可以使用最新标准，尝试实验性功能。

npm 以简单的结构帮助 Node.js 生态蓬勃发展。

# Node.js 例子

```js
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

这个应用使用了 http module。

http 中的 createServer()方法创建并返回一个新的 HTTP 服务器。

服务器设置为监听指定的端口和主机名。当服务器准备好时，回调函数被调用，在这种情况下通知我们服务器正在运行。

每当接收到新请求时，都会调用 request 事件，提供两个对象：请求（http.IncomingMessage 对象）和响应（http.ServerResponse 对象）。

这两个对象对于处理 HTTP 调用至关重要。

请求（http.IncomingMessage 对象）提供请求详细信息。这个例子中没有使用它。

响应（http.ServerResponse 对象）用于向调用者返回数据。上面的例子将 statusCode 属性设置为 200，以指示成功响应。设置 Content-Type 标头。然后关闭响应，将内容"Hello World"作为参数添加到 end()：
