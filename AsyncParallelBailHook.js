//异步的钩子(串行) 并行 需要等待所有并发的异步事件执行后在执行回调发方法
//同时发送多个请求
// 注册方法 分别为 tap注册(同步) tapAsync（异步

//前边一个函数的返回值传递给后一个
class AsyncParallelBailHook { //钩子是同步的
    constructor(args) { //args=>
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let tasks = this.tasks.map(task => task(...args));
        return Promise.all(tasks)

    }
}


let hook = new AsyncParallelBailHook(['name']);
let total = 0;
hook.tapPromise('react', function (name, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name)
            resolve()
        }, 1000)
    }, 1000)
})
hook.tapPromise('node', function (name, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve()
        }, 1000)
    }, 1000)
})
hook.promise('jw').then(function () {

})