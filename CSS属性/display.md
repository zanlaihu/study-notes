# display 属性规定元素应该生成的框的类型

| 默认值 | 继承 | 版本 | JavaScript 语法               |
| ------ | ---- | ---- | ----------------------------- |
| inline | no   | CSS1 | object.style.display="inline" |

常用值：

| 值           | 描述                                     |
| ------------ | ---------------------------------------- |
| none         | 元素不显示                               |
| block        | 此元素将显示为块级元素，前后会带有换行符 |
| inline       | 默认。显示为内联元素，前后没有换行符     |
| inline-block | 行内块元素（CSS2.1 新增）                |
| inherit      | 从父元素继承 display 的值                |

```css
.exmaple {
  display: none;
}
```
