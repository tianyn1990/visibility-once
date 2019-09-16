import Queue from './Queue.js';

// 当前页面是否可见
//  - 如果不兼容visibilitychange事件，则visibilityState永远为true
let visibilityState = true;

// 页面可见，待执行序列 [queue, queue, ...]
// queue = new Queue(x)
let visibleQueueList = [];

// 页面不可见，待执行序列 [queue, queue, ...]
let invisibleQueueList = [];

// 监听页面可见性变化（兼容ie10+ mozilla chrome）
const hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :
            null;
if(hiddenProperty) {
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    const onVisibilityChange = function(){
        // 页面不可见
        if(document[hiddenProperty]) {
            visibilityState = false;
            invisibleQueueList.forEach((queue) => {
                queue.dequeueAll().forEach((fn) => {
                    typeof fn === 'function' && fn();
                });
            });
    
        // 页面可见
        } else {
            visibilityState = true;
            visibleQueueList.forEach((queue) => {
                queue.dequeueAll().forEach((fn) => {
                    typeof fn === 'function' && fn();
                });
            });
        }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}

const run = function(fn) {
    const { visible, queue } = this;
    // 执行时机（可见/不可见）正确，立即执行
    //  - 如果不兼容visibilitychange事件，则visibilityState永远为true
    if(visibilityState === visible) {
        typeof fn === 'function' && fn();

    // 否则放入队列等待
    } else {
        queue.enqueue(fn);
    }
    return this;
};

// 用户当前浏览的标签页 可见/不可见（visible） 才执行
export default (visible = true) => {
    const v = {
        visible, // 执行时机：当页面 可见/不可见 的时候，才执行
        queue: new Queue(), // 待执行函数队列
        max(maxNum) { // 待执行函数最大数量，超过后会将最早添加的函数移除
            this.queue.maxLen = maxNum;
            return this;
        },
    };
    // 立即执行 or 放入队列中等待
    v.run = fn => run.call(v, fn);
    // 将队列添加到待执行列表中
    visible ?
        // 当页面 可见 的时候执行
        visibleQueueList.push(v.queue) :
        // 当页面 不可见 的时候执行
        invisibleQueueList.push(v.queue);
    return v;
};