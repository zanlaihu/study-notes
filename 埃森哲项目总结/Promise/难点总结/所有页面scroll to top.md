# 背景

在 A 页面填写完表单，点击提交到达 B 画面后，在 B 画面点击返回键返回到 A 画面时，会发现浏览器滚动条依旧保持在最后提交时的状态。

# 需求

返回前画面时，滚动条回到顶端。

# 解决方法

Angular 项目有一个元页面 app.component.ts，是项目启动后进入的第一个画面。
在这里开启了一个监听，每当使用 router 方法进行跳转进入页面后，都会执行 scroll to top 方法。

```js
this.router.events.subscribe(() => {
  setTimeOut(() => {
      this.scrollToTop();
  },200);
});

private scrollToTop():void {
    if (this.getContent("ion-content")) {
      this.getContent("ion-content").scrollToTop();
    }
}

private getContent(tagName: string):HTMLIonContentElement{
    let pageId = this.router.url.split('?')[0];
    pageId = pageId.substring(pageId.lastIndexOf('/') + 1);
    if(document.querySelector(pageId)){
        return document.querySelector(pageId).querySelector(tagName);
    } else {
        return undefined;
    };
}
```
