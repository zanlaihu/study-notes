# HTML 属性

class\id\style\title

# HTML 样式

弃用的标签和属性：

```html
<center>
  <font>
    <basefont>
      <s>
        <strike> <u> align bgcolor color</u></strike></s
      >
    </basefont></font
  >
</center>
```

用样式来代替上面。

# HTML 引用

```html
<q></q>
```

用于短的引用。浏览器通常为 q 元素包围引号。

```html
<blockquote></blockquote>
```

用于长引用。浏览器通常对 blockquote 进行缩进处理。

```html
<p><abbr title="World Health Organization">WHO</abbr> 成立于 1948 年。</p>
```

用于缩略词。对缩写进行标记能够为浏览器、翻译系统以及搜索引擎提供有用的信息

```html
<!-- 1. 如果设置了 <dfn> 元素的 title 属性，则定义项目： -->
<p><dfn title="World Health Organization">WHO</dfn> 成立于 1948 年。</p>
<!-- 2. 如果 <dfn> 元素包含具有标题的 <abbr> 元素，则 title 定义项目： -->
<p>
  <dfn><abbr title="World Health Organization">WHO</abbr></dfn> 成立于 1948 年。
</p>
<!-- 3. 否则，<dfn> 文本内容即是项目，并且父元素包含定义。 -->
<p><dfn>WHO</dfn> World Health Organization 成立于 1948 年。</p>
```

用于定义的。

HTML address 元素定义文档或文章的联系信息（作者/拥有者）。

此元素通常以斜体显示。大多数浏览器会在此元素前后添加折行。

```html
<address>
  Written by Donald Duck.<br />
  Visit us at:<br />
  Example.com<br />
  Box 564, Disneyland<br />
  USA
</address>
```

用于联系信息的。

用于著作标题的 cite

```html
<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
```

用于双向重写的 HTML <bdo>
HTML <bdo> 元素定义双流向覆盖（bi-directional override）。

<bdo> 元素用于覆盖当前文本方向：

```html
<bdo dir="rtl">This text will be written from right to left</bdo>
```

# HTML 计算机代码

# 链接

```html
<a href="" target="_blank"></a>
```

target="\_blank"定义链接在新窗口显示。

```html
<a id=""></a>
```

用 id 来制作书签

# HTML 头部

<head> 元素包含了所有的头部标签元素。在 <head>元素中你可以插入脚本（scripts）, 样式文件（CSS），及各种meta信息。

可以添加在头部区域的元素标签为 <style>, <meta>, <link>, <script>, <noscript>。

```html
<title></title>
```

title 在 HTML/XHTML 文档中是必须的，定义了浏览器工具栏的标题
