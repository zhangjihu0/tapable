let { SyncBailHook, SyncHook } = require('tapable');

//tapable 中有三种 注册方式 tap 同步注册 tapAsync(cb) tapPromise(注册是promise)

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name']),
        }
    }
    tap() { //注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name)
        })
    }
    start() {
        this.hooks.arch.call('jw')
    }
}

let l = new Lesson();
l.tap(); //注册这两个事件
l.start();//启动钩子