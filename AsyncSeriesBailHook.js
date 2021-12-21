class AsyncSeriesBail { //异步串行钩子
    constructor(args) { //args=>['name']
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) { //
        let [first, ...others] = this.tasks;
        return others.reduce((p, n) => {   //redux 源码
            return p.then(() => { return n() })
        }, first(...args))


    }

}

let hook = new AsyncSeriesBail(['mame']);
let total = 0;
hook.tapPromise('react', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve()
        }, 1000)
    })

});

hook.tapPromise('node', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve()
        }, 1000)
    })
})

