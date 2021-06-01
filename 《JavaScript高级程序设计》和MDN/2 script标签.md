---
theme: smartblue
---
# \<script>

\<script>元素由网景公司创造，用来将 JavaScript 引入 HTML。它也被纳入 HTML 规范。

## \<script>元素有 8 个属性：

- src：可选。填入 URL 来引入外部文件中的 JavaScript。
- defer：可选。延迟运行JavaScript， 可以延迟到整个页面被解析和显示之后再运行。只对外部 JavaScript 文件有效。
- async：可选。异步执行，表示立刻开始下载 JavaScript，但不必等 JavaScript 下载和执行完再加载页面。只对外部 JavaScript 文件有效。
- language：废弃。大多数浏览器都会忽略。
- type：可选。替代 language，表示代码块中 JavaScript 语言的内容类型（也叫 MINE 类型）。按照惯例，始终是“text/javascript”（尽管“text/javascript”和“text/ecmascript”已经被废弃）。JavaScript 文件的 MINE 类型通常是“application/x-javascript”，不过这个值有可能导致 JavaScript 被忽略。在非 IE 的浏览器中有效的 MINE 值还有“application/javascript”和“application/ecmascript”。如果这个值是 module，则代码会被当成 ES6 模块，代码中运行使用 import 和 export 关键字。
- integrity：可选。允许比对接收到的资源的签名与指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果不匹配则页面报错，JavaScript 不执行。这个属性可以确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
- charset：可选。使用 src 属性指定的代码字符集。大多数浏览器不在乎它的值，所以很少被使用。
- crossorigin：可选。配置相关请求的 CORS（跨源资源共享）设置。默认不使用 CORS。crossorigin="use-credentials"意思是设置凭据标志，这样出站请求会包含凭据。crossorigin="anonymous"意思是配置文件请求不必设置凭据标志。

# 如何使用\<script>

1.直接在网页中嵌入：

```html
<script>
  function sayHi() {
    console.log("我最棒！");
  }
</script>
```

包含在\<script>内的代码会被从上到下解释。上面的代码解释了一个函数定义，这个函数会被保存在解释器环境中。在\<script>内的代码被计算完成前，页面其余内容不会被加载或显示。

#### 使用行内 JavaScript 时，代码中不能出现\</script>。
比如，在 console.log 里加入字符串都会报错。

```html
<script>
  function sayHi(){
    console.log('</script>');
  }
</script>
```

这是因为浏览器在解析行内 JavaScript 的时候，如果看到\</script>就会把它识别成结束的\</script>。解决办法是加一个转义符\。

```html
<script>
  function sayHi(){
    console.log('\</script>');
  }
</script>
```

#### 引入外部 JavaScript。添加 src 再加上文件 url。

```html
<script src="example.js"></script>
```

与解释行内 JavaScript 一样，解释外部 JavaScript 也会让页面阻塞。阻塞也包含下载文件的时间。

使用外部文件以后就不应该再添加行内 JavaScript，即使加了也不会被执行。外部文件优先。

\<script>的 src 可以引用来自外部域的文件。比如

```html
<script src="https://www.somewhere.com/afile.js"></script>
```

如果是不同域，浏览器就会向这个路径发送 GET 请求。这个请求不受浏览器同源策略限制，但返回并被执行的 JavaScript 则受限制。这个请求受父页面 HTTP/HTTPS 协议的限制。

来自外部域的代码会成为页面的一部分来加载和解释。所以我们可以通过不同域分发 JavaScript。但是引用外部域的 JavaScript 文件也要小心别有用心的程序员可能替换这个文件。这个时候就需要 Integrity 属性来确保该域是一个可信的来源，但这个属性也不是所有浏览器都支持。
## Integrity
提供hash值，来验证览器获得的资源（例如从 CDN 获得的）是否被篡改。
首先需要服务器开启内容安全策略，即 通过 HTTP 头信息的Content-Security-Policy的字段
```
Content-Security-Policy: require-sri-for script;
//加载script时需要进行校验
```

第二步，加入integrity值
```javascript
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js" 
   integrity="sha384-9u9lzb/hr8e14GLHe5TEOrTiH3Qtw5DX2Zw9X/g7cqj81W2McEMx5CKOszxdb8jg" crossorigin="anonymous"></script>
```
integrity的值为src文件进行base64编码的值，可通过SRI在线生成工具生成。如果integrity和src文件的hash值不匹配，则浏览器会报错。

除了对script进行校验外，同样还可对style进行校验
```javascript
Content-Security-Policy: require-sri-for style;
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" 
  integrity="sha384-xyZLiqnBEFn1hDkS8VeG/YHoqOjS/ucimT8TI6GDr9+ZP1UNbZr6d/q0ldMi/xvL" crossorigin="anonymous">
浏览器支持： 只有chrome，firfox实现，safari，IE都未实现。

>关于Content-Security-Policy更多信息，可访问阮一峰对CSP的讲解：
>http://www.ruanyifeng.com/blog/2016/09/csp.html

# 一些优化方案

## 标签在文件中的位置

曾经，所有\<script>标签都被放在\<head>里。从而将外部的 CSS 和 JavaScript 集中引入。但是放在\<head>就意味需要所有 JavaScript 代码都被下载、解析和解释完成后，才开始页面的渲染。（浏览器在解析到\<body>时才开始渲染页面）。为了不让页面渲染速度太慢，JavaScript 现在流行放在\<body>元素里的末尾。比如

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <!-- 一些页面内容 -->
    <script src="example.js"></script>
  </body>
</html>
```

只是改变了一下顺序，但是浏览器显示空白的时间变短，会让用户觉得加载更快。

## 推迟执行脚本

\<script>加入 defer 后，JavaScript 会立刻下载，但会等到整个页面解析完毕后再运行。也就是在浏览器解析到</html>时，才运行该脚本。

如果出现了两段被推迟的代码。

```html
<script defer src="example1.js"></script>
<script defer src="example2.js"></script>
```

HTML5 规范要求脚本应该按照出现顺序执行，因此第二个推迟的脚本会按顺序在第一个执行之后再执行，两者都会在 DOMContwntloaded 事件之前执行。不过实际中，推迟执行的脚本不一定总会按顺序执行或者在 DOMContwntloaded 事件之前执行，因此最好只包含一个这样的脚本。

## 异步执行脚本

\<script>另一个属性async和defer类似，但是包含async的脚本并不保证按出现顺序执行。defer也会告诉浏览器立刻下载脚本。
```html
<script defer src="example1.js"></script>
<script defer src="example2.js"></script>
```
defer也会告诉浏览器立刻下载脚本。但是浏览器不必等脚本下载和执行完再加载页面，同样也不必等其他异步脚本下载和执行再执行本异步脚本。所以，异步脚本不应该在加载期间修改DOM。

## 动态加载脚本

JavaScript通过使用DOM API，可以向DOM中动态添加script元素，从而加载脚本。通过下面的代码
```JavaScript
let script = document.createElement('script');
script.src = 'gibberish.js';
document.head.appendChiled(script);
```
在把HTMLElement元素添加到DOM且执行这段代码之后，请求才被发送。

这种方式创建的脚本默认是异步加载。但有些浏览器不支持async。所以可以按下面这样明确其为同步加载
```javascript
let script = document.createElement('script');
script.src = 'gibberish.js';
script.async = false;
document.head.appendChild(script);
```
以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响他们在资源获取队列中的优先级，从而影响性能。可以在文档头部显式声明来让预加载器知道这些动态请求文件的存在。
```html
<link rel="preload" href="gibberish.js">
```

# 行内代码与外部文件，选择哪个?

虽然可以直接在页面嵌入JavaScript，但通常认为最佳体验是用外部引入的方式。理由如下：
1. 可维护性。用一个目录保存所有JavaScript文件，更容易维护。HTML与JavaScript也可以分开来独立开发。
2. 缓存。浏览器会根据特定的设置缓存所有外部链接的JavaScript文件，这意味着如果两个页面都用到同一个文件，则该文件只需下载一次。

# \<noscript>

针对早期浏览器不支持JavaScript的情况，发明了一个\<noscript>。它可以包含任何可以出现在\<body>中的HTML元素。并且只有在浏览器不支持脚本或浏览器对脚本的支持被关闭的时候，它的内容才会被渲染。否则就会直接略过。

所以它可能会这样用：
```html
<noscript>
  <p>This page requires a JavaScript-enabled browser.</p>
</noscript>
```

