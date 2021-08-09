# 弹性容器

display:flex 或 display:inline-flex

flex-direction: row | row-reverse | column | column-reverse

justify-content: flex-start | flex-end | center | space-between | space-around

flex-wrap: nowrap|wrap|wrap-reverse|initial|inherit;

## align-items

- flex-start：贴着纵轴起始位置，一般是顶端。
- flex-end：贴着纵轴结束位置，一般是底端。
- center：纵轴中心位置。
- baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
- stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。

## align-content

align-content 属性用于修改 flex-wrap 属性的行为。类似于 align-items, 但它不是设置弹性子元素的对齐，而是设置各个行的对齐。

- stretch - 默认。各行将会伸展以占用剩余的空间。
- flex-start - 各行向弹性盒容器的起始位置堆叠。
- flex-end - 各行向弹性盒容器的结束位置堆叠。
- center -各行向弹性盒容器的中间位置堆叠。
- space-between -各行在弹性盒容器中平均分布。
- space-around - 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。

# 弹性子元素

flex: auto | initial | none | inherit | [ flex-grow ] || [ flex-shrink ] || [ flex-basis ] 放入数字，根据总和比例分配空间。

# 参考

https://www.runoob.com/css3/css3-flexbox.html
