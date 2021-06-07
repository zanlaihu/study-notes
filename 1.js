// 选取所有元素
$("*")

// 选取当前元素
$(this)

// 选取class为intro的<p>元素
$("p.intro")

// 选取第一个<p>元素
$("p:first")

// 选取第一个<ul>元素的第一个<li>元素
$("ul li:first")

// 选取每一个<ul>元素的第一个<li>元素
$("ul li:first-child")

// 选取带有href属性的元素
$("[href]")

// 选取所有target属性为“_blank”的<a>元素
$("a[target='_blank']")

// 选取所有target属性不为“_blank”的<a>元素
$("a[target!='_blank']")

// 选取所有type="button"的<input>元素和<button>元素
$(":button")

// 选取偶数位置的<tr>元素
$("tr:even")

// 选取