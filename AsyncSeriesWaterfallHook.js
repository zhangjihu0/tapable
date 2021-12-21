//异步串行瀑布函数
//前边一个函数的返回值传递给后一个
class AsyncSeriesWaterfallHook { //钩子是同步的
    constructor(args) { //args=>
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index]
            if (!task) {
                return finalCallback()
            }
            if (index === 0) { //执行的是第一个
                task(...args, next)
            } else {
                task(data, next);
            }
            index++;
        }
        next();
    }
}


let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react', function (data, cb) {
    setTimeout(() => {
        console.log('react', name)
        cb(null, 'result')
    }, 1000)
})
hook.tapAsync('node', function (data, cb) {
    setTimeout(() => {
        console.log('node', name)
        cb(null, 'node')
    }, 1000)
})
hook.callAsync('jw')