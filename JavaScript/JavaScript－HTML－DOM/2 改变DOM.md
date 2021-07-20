# 改变 HTML 输出流

document.write()可用于直接向 HTML 输出流写内容。

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      document.write(Date());
    </script>
  </body>
</html>
```

所以绝对不要在文档(DOM)加载完成之后使用 document.write()。这会覆盖该文档。

# 改变 HTML 内容

document.getElementById(id).innerHTML=新的 HTML

# 改变 HTML 属性

document.getElementById(id).属性名=新属性值

```html
<!DOCTYPE html>
<html>
  <body>
    <img id="image" src="smiley.gif" />

    <script>
      document.getElementById("image").src = "landscape.jpg";
    </script>
  </body>
</html>
```
