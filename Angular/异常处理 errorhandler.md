Angular6 提供了 ErrorHandler 来统一处理异常（ionic4 为 IonicErrorHandler）。

它的好处是：

1. 可以统一化处理，而不用在每个异步函数后面传入 err 参数来处理。
2. 可以捕获不易复现的异常，尤其是客户端不易复现的问题。通过统一处理将异常信息输入到日志中，可以快速定位问题。
3. 可以显示统一友好的异常信息提示。甚至可以引导用户行为去消除这个异常。比如用户余额不足，可以提示用户去哪里充值。

但是默认的 ErrorHandler 处理是将其输出在 console 上，这显然不能满足需求，现在就自己实现一个 GlobalErrorHandler。

## 具体实现

### 创建 ErrorService 和 LoggingService 用于获取异常信息和记录异常日志

ErrorService: 获取客户端的异常信息、栈堆/服务端的异常信息、状态码。

```ts
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ErrorService {
  getClientMessage(error: Error): string {
    if (!navigate.onLine) {
      return "暂无网络，请检查网络";
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  getServerStatus(error: HttpErrorResponse): number {
    return error.status;
  }
}
```
