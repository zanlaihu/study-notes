---
theme: smartblue
highlight: null
---

# JavaScript 的诞生

JavaScript 问世之初的主要功能是代替 perl 等服务端语言。在那个年代，输入框内容是否正确都需要与服务器进行一次往返通信。在拨号上网 28KB/s 的网速下，一次次刷新页面让人无法忍受。因此，网景将 JavaScript 加入到 navigator 浏览器中，从而在客户端就可以进行验证。在那个年代，这是令人兴奋的功能。

而现在，JavaScript 已经是公认的主流编程语言。它的应用也不再只是单纯的验证，而是可以实现复杂的计算与交互、闭包、匿名函数，甚至元编程等特性。几乎所有的软件和硬件设备都可以支持它。

网景码农 Brendan Eric 一开始将这门语言命名为 LiveScript，在正式发布前才被公司更改为 JavaScript，以便蹭一下 Java 的热度。JS 发布后收到了很多很好的评价，于是微软也将 JS 纳入了自家浏览器。

但两家的 JS 标准不同，于是欧洲计算机制造商协会 Ecma 针对其制定了名为 ECMA-262 这个脚本语言标准，而 JavaScript 也有了另一个名字 ECMAScript（发音为 ek-ma-script）。

次年（1998），国际标准化组织 ISO 和国际电工委员会 IEC 也将 ECMAScript 采纳为标准 ISO/IEC-16262。至此，各家浏览器均以其为实现 JavaScript 的标准，虽然具体实现仍有不同。

所以，虽然一般将 JavaScript 等同为 ECMAScript。但 JavaScript 其实是包含了 ECMAScript 在内。

JavaScript 的结构是：</br>
核心 ECMAScript</br>
文档对象模型 DOM（Document object model）</br>
浏览器对象模型 BOM（Browser object model）

# ECMAScript、DOM、BOM

## ECMAScript

ECMAScript 并不局限于 web 浏览器，web 浏览器只是 ECMAScript 的一种宿主环境（host environment）。宿主环境提供 ECMAScript 的基准实现和与环境交互必需的扩展。DOM 就是一个扩展，它使用 ECMAScript 核心类型和语法，提供特定于环境的额外功能。

> 其它宿主环境还有 Node.js 和 Adobe Flash。

ECMA-262 将 ECMAScript 作为一个基准来定义，以便在它之上构建更稳健的脚本语言。它没有输入和输出的方法。

不涉及浏览器的情况下，ECMAScript 定义了：
语法、类型、语句、关键字、保留字、操作符、全局对象。

实现了这个规范的所有方面的一类语言都可以称为 ECMAScript。Javascript 实现了 ECMAScript，Adobe ActionScript 也实现了 ECMAScript。

## DOM document object model 文档对象模型

文档对象模型是一个应用编程接口（API），用于在 HTML 中使用扩展的 XML。

DOM 将整个页面抽象成一个分层节点，创建表示文档的树。

### DOM 规范

因为不同浏览器厂商开发的 DHTML 不同，这导致开发者写的同一个 HTML 不能在任何浏览器上都运行得很好。所以 W3C 制定了 DOM 标准。

DOM 规范最初（最初的 DOM Level 1）由两个模块组成：DOM Core 和 DOM HTML。

DOM Core：提供了一种映射 XML 文档，用于访问和操作文档内的任意部分。

DOM HTML：基于 DOM Core，增加了特定于 HTML 的对象和方法。

> DOM 并不是只能通过 JavaScript 访问。但是对于浏览器来说，DOM 就是使用 ECMAScript 实现的。DOM 是 JavaScript 的一大组成部分。

对于浏览器厂商来说，重中之重就是支持 DOM。

## BOM

BOM 是浏览器对象模型（Browser object model）API。BOM 一直没有标准。所以每个浏览器拥有自己定义的属性和方法。

> HTML5 尽可能多地去正式规范了 BOM。

一般来说，BOM 针对浏览器窗口和子窗口，并且特定于浏览器的扩展也被归于 BOM。开发者通过它操控浏览器显示页面之外的部分。
比如：

1. 弹出新浏览器窗口。
2. 移动、缩放和关闭浏览器窗口。
3. navigator
4. location
5. screen
6. 其他自定义对象，如 XMLHttpRequest 和 IE 的 ActiveXObject。

# 小结

JavaScript 是一门用来与网页交互的脚本语言。

 ECMAScript:由 ECMA-262 定义并提供核心功能。

 文档对象模型(DOM):提供与网页内容交互的方法和接口。

 浏览器对象模型(BOM):提供与浏览器交互的方法和接口。
