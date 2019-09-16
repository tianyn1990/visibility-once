const queue = Symbol('queue');

/**
 * 队列
 *     ------------
 *  <-- x x x x x x <--
 *     ------------
 */
class Queue {
    constructor(maxLen) {
        // 最大长度（公有属性）
        //  - 设置队列最大长度，超过后会将最早添加的移除
        this.maxLen = maxLen;
        // 队列列表（私有属性）
        this[queue] = [];
    }
    // 查看队首元素
    get front() {
        return this[queue][0];
    }
    // 查看队尾元素
    get back() {
        const list = this[queue];
        return list[list.length - 1];
    }
    // 获取队列所有元素
    get getQueue() {
        return this[queue];
    }
    // 清空当前队列
    clear() {
        this[queue] = [];
    }
    // 入队
    enqueue(item) {
        // 添加到队尾
        this[queue].push(item);
        // 长度超过maxLen，移除队首
        if(this.maxLen && this[queue].length > this.maxLen) {
            this.dequeue();
        }
        return item;
    }
    // 出队
    dequeue() {
        // 从队首取值
        return this[queue].shift();
    }
    // 全部出队
    dequeueAll() {
        const tmp = this[queue];
        this.clear();
        return tmp;
    }
}

module.exports = Queue;