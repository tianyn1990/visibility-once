import visibility from '../';

const { run: runIfVisible } = visibility().max(3);

runIfVisible(() => {
    // 如果当前页面**是**用户正在浏览的标签页才执行
    // 待执行函数最多保存3个，超过会将最早的去掉
});

const { run: runIfHidden } = visibility(false).max(5);

runIfHidden(() => {
    // 如果当前页面**非**用户正在浏览的标签页才执行
    // 待执行函数最多保存5个，超过会将最早的去掉
});