# 弹性容器

## display

display:flex 或 display:inline-flex

## flex-direction

row：横向从左到右排列（左对齐），默认的排列方式。

row-reverse：反转横向排列（从右到左）。

column：纵向排列。

column-reverse：反转纵向排列，从后往前排，最后一项排在最上面。

## justify-content

flex-start：左边紧挨着。

flex-end：右边紧挨着。

center：中间紧挨着。

space-between：紧靠两边，中间均匀分布。

space-around：两边的间距是中间间距的一半。

## align-items

flex-start：贴着纵轴起始位置，一般是顶端。

flex-end：贴着纵轴结束位置，一般是底端。

center：纵轴中心位置。

baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与
'flex-start'等效。其它情况下，该值将参与基线对齐。

stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。

## flex-wrap

nowrap - 默认， 弹性容器为单行。该情况下弹性子项可能会溢出容器。

wrap - 弹性容器为多行。该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行

wrap-reverse -反转 wrap 排列。

## align-content

# 弹性子元素

##
