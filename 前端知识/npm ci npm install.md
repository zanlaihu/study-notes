npm install (简写: npm i)
npm install ，或者 npm i ，通常是用来安装依赖项：

它将会安装 Node.js 项目所有的依赖项；
如果使用 ^ 或 ~ 来匹配依赖项的版本时，则 npm 可能无法安装确切版本；
利用 npm install 安装新依赖项时，会更新 package-lock.json。
. . .

npm ci
使用 npm ci ，会发生：

将会删除项目中的 node_modules 文件夹；
会依照项目中的 package.json 来安装确切版本的依赖项；
不像 npm install ， npm ci 不会修改你的 package-lock.json 。但是它确实期望你的项目中有一个 package-lock.json 文件 - 如果你没有这个文件， npm ci 将不起作用，此时必须使用 npm install 。
如果你使用 npm ci ，你将获得 可靠 的构建。特别是当您在 Jenkins 或 GitLab CI 等 持续集成工具 中运行时，这将非常有用。

本文来源：码农网
本文链接：https://www.codercto.com/a/92251.html
