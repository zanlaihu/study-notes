在 CSS 布局中，所有元素都被盒子包围。

# 块级盒子（Block box） 和 内联盒子（Inline box）

CSS 中有两种盒子。它们在页面流（page flow）和元素之间的关系表现不同的行为。

## 块级盒子

1. 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
2. 每个盒子都会换行
3. width 和 height 属性可以发挥作用
4. 内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”

除非特殊指定，诸如标题(<h1>等)和段落(<p>)默认情况下都是块级的盒子。

## 内联盒子

1. 盒子不会产生换行。
2. width 和 height 属性将不起作用。
3. 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
4. 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

用做链接的 <a> 元素、 <span>、 <em> 以及 <strong> 都是默认处于 inline 状态的。

我们通过对盒子 display 属性的设置，比如 inline 或者 block ，来控制盒子的外部显示类型。

# 内部和外部显示类型

## 外部显示类型

CSS 的盒子模型有一个外部显示类型，来决定盒子是块级还是内联。

## 内部显示类型

盒子包模型还有内部显示类型，来决定盒子内部元素如何布局。默认按照正常文档流布局，也就是上面说的那样。

但是，也可以使用 flex 的 display 属性来更改内部显示类型。比如设置一个外部显示类型为 block 的元素 display:flex，那么它的内部显示类型就是 flex，该盒子内的所有直接子元素成为 flex 元素，按照弹性盒子规则布局。

# CSS 盒模型

完整的盒模型应用于块级盒子，内联盒子只能使用部分内容。

盒模型定义了四个属性：margin、border、padding、content。

- margin：盒子和其他元素的空白区域。通过 margin 相关属性设置。
- border：盒边框。通过 border 相关属性设置。
- padding：在盒子内但在内容区域外的空白区域。通过 padding 相关属性设置。
- content：内容区域。通过 width、height 设置。

## 标准盒模型

## 替代（IE）盒模型

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model
