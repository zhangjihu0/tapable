//异步的钩子(串行) 并行 需要等待所有并发的异步事件执行后在执行回调发方法
//同时发送多个请求
// 注册方法 分别为 tap注册(同步) tapAsync（异步

//前边一个函数的返回值传递给后一个
class AsyncParallelHook { //钩子是同步的
    constructor(args) { //args=>
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop(); //拿出最终的函数
        let index = 0;
        function done() {//Promise.all
            index++
            if (index == this.task.length) {
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })

    }
}


let hook = new SyncWaterHook(['name']);
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log('react', name)
        cb()
    }, 1000)
})
hook.tapAsync('node', function (name) {
    setTimeout(() => {
        console.log('react', name)
        cb()
    }, 1000)
})
hook.callAsync('jw')