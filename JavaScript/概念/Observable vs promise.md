1.observables 是lazy evaluation。

比如下面的代码片段，对于promise，无论是否调用then，promise都会被立即执行；而observables却只是被创建，并不会执行，而只有在真正需要结果的时候，如这里的foreach，才会被执行。

2.observables可以被cancel。

observable能够在执行前或者执行过程中被cancel，或者叫做dispose。

3.observable可以retry，或者多次调用。

上面的代码，可以拿到promise和observable的变量。对于promise，不论在后面怎么调用then，实际上的异步操作只会被执行一次，多次调用没有效果；但是对于observable，多次调用forEach或者使用retry方法，能够触发多次异步操作。

4.observable可以进行组合变换。

observable可以看做列表，可以进行各种组合变换，即LINQ操作，比如merge，zip，map，sum等等。这是observable相对于promise的一大优势。



# 参考
原文链接：https://blog.csdn.net/napolunyishi/article/details/51339006