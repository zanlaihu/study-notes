# JavaScript代码压缩

生产环境中，推荐压缩 JS 从而让网站相应速度更快。

使用 terser 来压缩：

1. cd 到项目目录
2. npm init -y
3. npm install terser

比如压缩 example.js：

npx terser -c -m -o example.min.js -- example.js

名为 example.min.js 的压缩文件会在同一目录下生成。经常使用还可以使用 npm script 给这 command 命名。
