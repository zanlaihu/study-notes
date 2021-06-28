\<a>是超链接元素。具有默认的四种情况下的样式。

一般会把它的样式清空：

```css
/* 未被访问前 */
a:link {
  text-decoration: none;
}
/* 悬浮时 */
a:hover {
  text-decoration: none;
}
/* 鼠标按下且未松开前时*/
a:active {
  text-decoration: none;
}
/* 向访问过的链接添加特殊的样式 */
a:visited {
  text-decoration: none;
}
```
