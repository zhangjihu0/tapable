class AsyncSeries { //异步串行钩子
    constructor(args) { //args=>['name']
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) { //
        let finalCallback = args.pop();
        let index = 0;
        let next = () => { //执行完react 执行 node 
            if (this.tasks.length === index) return finalCallback();
            let task = this.tasks[index++];
            task(...args, next);
        }
        next()

    }

}

let hook = new AsyncSeries(['mame']);
let total = 0;
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log('react', name);
        cb()
    }, 1000)
});

hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log(node)
        cb()
    }, 1000)
})