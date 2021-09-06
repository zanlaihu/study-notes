---
theme: smartblue
---
# 块级盒子和内联盒子
CSS有两种盒子。

- 块级盒子（Block box）
- 内联盒子（Inline box）

在 CSS 中，所有元素都被盒子包围。它们在页面流（page flow）和元素之间的关系表现不同的行为。

## 块级盒子

1. 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
2. 每个盒子都会换行
3. width 和 height 属性可以发挥作用
4. 内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”

除非特殊指定，诸如标题(\<h1>等)和段落(\<p>)默认情况下都是块级的盒子。

## 内联盒子

1. 盒子不会产生换行。
2. width 和 height 属性将不起作用。
3. 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
4. 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

用做链接的 \<a> 元素、 \<span>、 \<em> 以及 \<strong> 都是默认处于 inline 状态的。

## 介于两者之间的盒子
display:inline-block 

元素可以不换到新行，但又可以设定宽度和高度。

## 外部显示类型和内部显示类型

外部显示类型可以控制盒子是块级盒子还是内联盒子。比如，display:inlien、display:block、display:inline-block 。

内部显示类型可以控制盒子内部元素显示类型。比如，display:flex控制盒子内元素为flex类型。


# 盒模型 The Box Model

完整的盒模型应用于块级盒子，内联盒子只能使用部分内容。

盒模型也有两种：
- 标准盒模型
- 替代盒模型

都有四个属性：margin、border、padding、content。

## 标准盒模型

浏览器默认使用标准盒模型。在标准盒模型中，设置的 width 和 height 作用于 content。再加上 padding、border 一起决定整个盒子的大小。

> margin 不计入实际大小。它影响的是盒子外部的空间。盒子的范围到边框为止。

## 替代（IE）盒模型

如果需要使用替代盒模型，需设置 box-sizing: border-box。

替代盒模型的长宽等于 content+padding+border，所以 content=width/height - padding - border。

如果想要全部使用替代盒模型，可以设置：

```css
html {
  box-sizing: border-box;
}
```

## margin 

外边距会把其他元素从盒子身边推开。外边距也可以设置为负值，这会导致和其他内容重叠。无论是标准还是替代盒模型，外边距总是在计算可见部分后添加。

margin属性：

- margin
- margin-top
- margin-bottom
- margin-right
- margin-left

### 外边距折叠

两个外边距相接的元素，更大的设置会被保留，小的则消失。并不是两个外边距的总和。

## border

如果使用标准盒模型，添加边框将增加整个宽高。

如果使用替代盒模型，添加边框将减少 content。

border 的属性有：

- border

设置宽度、颜色、样式

- border-top
- border-bottom
- border-right
- border-left

设置所有边的宽度、颜色、样式

- border-width
- border-style
- border-color

设置某条边的宽度、颜色、样式可以用特定的

- border-top-witdh
- border-top-style
- border-top-color
- border-right-witdh
- border-right-style
- border-right-color
- border-bottom-witdh
- border-bottom-style
- border-bottom-color
- border-left-witdh
- border-left-style
- border-left-color

## 内边距
内外距不能为负，必须是0或正值。

padding属性有：

- padding
- padding-top
- padding-bottom
- padding-right
- padding-left




# 参考

MDN：https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model

