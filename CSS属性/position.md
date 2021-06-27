CSS 中 Position 属性有四个可选值，它们分别是：static、absolute、fixed、relative。

◆position:static 　无定位

该属性值是所有元素定位的默认情况，在一般情况下，我们不需要特别的去声明它，但有时候遇到继承的情况，我们不愿意见到元素所继承的属性影响本身，从而可以用 position:static 取消继承，即还原元素定位的默认值。

◆position:absolute 　绝对定位

使用 position:absolute，能够很准确的将元素移动到你想要的位置，

◆position:fixed 　相对于窗口的固定定位

这个定位属性值是什么意思呢？元素的定位方式同 absolute 类似，但它的包含块是视区本身。在屏幕媒体如 WEB 浏览器中，元素在文档滚动时不会在浏览器视察中移动。例如，它允许框架样式布局。在页式媒体如打印输出中，一个固定元素会出现于第一页的相同位置。这一点可用于生成流动标题或脚注。我们也见过相似的效果，但大都数效果不是通过 CSS 来实现了，而是应用了 JS 脚本。
请特别注意，IE6 不支持 CSS 中的 position:fixed 属性。真的非常遗憾，要不然我们就可以试试这种酷酷的效果了。

◆position:relative 　相对定位

所谓相对定位到底是什么意思呢，是基于哪里的相对呢？我们需要明确一个概念，相对定位是相对于元素默认的位置的定位。既然是相对的，我们就需要设置不同的值来声明定位在哪里，top、bottom、left、right 四个数值配合，来明确元素的位置。

# position 的 fixed 和 sticky 的区别

https://blog.csdn.net/x_i_a_o_b_a_i/article/details/104382951
