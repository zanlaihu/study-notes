---
theme: smartblue
---

# 基础样式

编写 CSS 应该先给网站一组基础样式。这样不仅描述了文档的结构，也为继续装扮提供了底层框架：

- h1、h2
- p、ul、ol、dl
- strong 和 em
- blockquote 和 cite
- pre 和 code
- time、figcaption 和 caption

还有表单、表格及相关元素的基础样式：

- fieldset、legend 和 label
- caption、thead、tbody、tfoot

设立这么一套基础样式的价值非常大。即使很多会被继承和覆盖，但有了它，将来的工作就会有条不紊。

多个选择符可以用逗号分隔，给与相同的属性：

```css
p,
li {
  color: green;
}
```

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps/Getting_started



# 结构化元素

HTML5 引入了新的结构化元素

- section
- header (特定区块的头部)
- footer
- nav (导航组件)
- article (用于包含独立内容)
- aside
- main (高亮页面中包含主要内容的区域，在一个文档中不能多次出现)

上述元素除了 main 以外，都可以在文档中多次出现。关于上述元素的详细介绍，建议参考:
http://html5doctor.com

在出现新元素之前，一篇博客文章代码可能是下面这样：

```html
<div class="article">
  <div class="header">
    <h1>How to become a specialist</h1>
  </div>
</div>
```

div 元素对文档而言没有语义价值。只有 h1 和 p 具有含义。有了新元素就可以进化成下面这样：

```html
<article>
  <header>
    <h1>How to become a specialist</h1>
  </header>
</article>
```

但这样也会产生副作用。对于这段代码的 css 只能是：

```css
article {
}
article header {
}
```

这两个元素的样式会在页面内全通用，可能不符合我们对样式的期待。所以更灵活的做法是进化成下面这样：

```html
<article class="post">
  <header class="post-header">
    <h1>How to become a specialist</h1>
  </header>
</article>
```

于是，就可以使用类名来写样式了，像下面这样。

```css
.post {
}
.post-header {
}
```

这样子很好，即使出于一些原因导致 article 等不能被识别而必须使用 div 时，样式也不需要再修改。

# \<div> 和 \<span>

在没有合适语义元素的情况下，div 依旧是一个很好的选择。单纯需要一个无语义元素来添加样式时，也可以选择它。

span 也和 div 的规则一样。只不过它是文本级元素，用于在文本流中建立结构。

但是该用有语义元素时，也不要偷懒用 div 和 span 来代替。

# 重新定义的 \<i> 和 \<b>

\<i>和\<b>一开始的作用是将文本标记成斜体 italic 和粗体 bold。HTML5 没有删除他们，但是改变了它们的意义。

\<i>用来标识与周围不一样的内容，一般在排版上显示为斜体。

\<b>含义和\<i>几乎一样，只是针对习惯上标记为粗体的内容。

多数情况应该选择\<em>斜体和\<strong>加粗。他们的区别在于\<em>和\<strong>强调内容语义，而前两个老元素没有任何强调自己所包含的内容。

# 验证器

现实中大部分 HTML 并不是真正有效的，这叫未遵行（nonconformant）。就是，可能存在注入元素嵌套不对、包含未经编码的&、缺少必要的属性。

但是浏览器常常并不会报错。并且 HTML 规范中也包含了处理无效 HTML 的规定，以确保浏览器厂商用一致的方式对应错误。
所以，有时找不到样式无法渲染的问题，可能是 HTML 的问题。可以使用 W ３ C 的 HTML 验证器（http://validator.w3.org）
或其他插件去验证。
CSS 也有验证器（http://jigsaw.w3.org/css-validator/）
。

当然验证器不该被奉为圣旨，它也会出错误。用它来帮我们发现一些低级问题就可以了。
