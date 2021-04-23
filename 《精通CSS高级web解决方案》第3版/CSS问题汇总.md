```html
<style>
  #nav > li {
    font-size: x-large;
  }
</style>

<!-- 一般来说子选择符只选择子代，不选择孙代及以后。 -->
<ul id="nav">
  <li><a>Home</a></li>
  <li>
    <a>Services</a>
    <ul>
      <li>a</li>
      <li>b</li>
    </ul>
  </li>
  <li>Contact</li>
</ul>
```
