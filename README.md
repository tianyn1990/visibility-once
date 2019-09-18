# visibility-once

Wrapper for the Page Visibility API, and execute callback function once. It's no need to stop/unbind compared with Visibility.js. Otherwise, you can set a number to limit max callback function(use a Queue).

## example

```javascript
import visibility from 'visibility-once';

const { run: runIfVisible } = visibility().max(3);

runIfVisible(() => {
    // run if current page is visible, and store 3 callback functions at most
    // 如果当前页面**是**用户正在浏览的标签页才执行，待执行函数最多保存3个，超过会将最早的去掉
});

const { run: runIfHidden } = visibility(false).max(5);

runIfHidden(() => {
    // run if current page is hidden, and store 5 callback functions at most
    // 如果当前页面**非**用户正在浏览的标签页才执行，待执行函数最多保存5个，超过会将最早的去掉
});
```
