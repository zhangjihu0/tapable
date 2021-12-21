//前边一个函数的返回值传递给后一个
class SyncLoopHook { //钩子是同步的
    constructor(args) { //args=>
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {

        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args);
            } while (ret != undefined)

        })

    }
}


let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react', function (name) {
    console.log('react', name)
    return ++total == 3 ? undefined : '继续学'
})
hook.tap('node', function (name) {
    console.log('node', name)
})
hook.call('jw')