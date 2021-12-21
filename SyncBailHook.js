class SyncBailHook { //钩子是同步的
    constructor(args) { //args=>
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let ret; //当这个函数的反悔时
        let index = 0; //当前要先执行第一个
        do {
            let ret = this.tasks[index](...args)
        } while (ret === undefined && index < this.tasks.length);
    }
}


let hook = new SyncBailHook(['name']);
hook.tap('react', function (name) {
    console.log('react', name)
    return '停止向下执行'
})
hook.tap('node', function (name) {
    console.log('node', name)
})
hook.call('jw')