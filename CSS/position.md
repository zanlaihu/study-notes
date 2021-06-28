Position 属性有五个可选值：static、absolute、fixed、relative、sticky。

- static ：无定位。元素定位的默认情况。在一般情况下，我们不需要特别的去声明它，但有时候遇到继承的情况，我们不愿意见到元素所继承的属性影响本身，从而可以用 position:static 取消继承，即还原元素定位的默认值。

- absolute：相对比父元素的绝对定位

- fixed：相对于窗口的绝对定位

- relative ：相对定位。相对于元素默认的位置的定位，需要设置 top、bottom、left、right 四个数值来明确元素的位置。

- sticky：一开始为 relative 定位，滑动到设定的位置之后变为 fixed 定位。
