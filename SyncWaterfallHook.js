//前边一个函数的返回值传递给后一个
class SyncWaterHook { //钩子是同步的
    constructor(args) { //args=>
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let [first, ...others] = this.tasks;
        let ret = first(...args);
        others.reduce((a, b) => {
            return b(a)
        }, ret)

    }
}


let hook = new SyncWaterHook(['name']);
hook.tap('react', function (name) {
    console.log('react', name)
    return '停止向下执行'
})
hook.tap('node', function (name) {
    console.log('node', name)
})
hook.call('jw')