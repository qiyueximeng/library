# canvas 动画捕获库

实现 `canvas` 动画逐帧捕获并生成 `base64` 图片功能；


## 使用

**html:**

```html
<script src="capture.js"></script>
```

**js:**

```
const capturer = new Capture({
  framerate: 30,
  verbose: true
});
```

## 参数

### `framerate`

指定截图帧率

### `verbose`

是否打印执行信息


## 方法

### `capture.start()`

开启捕获器监听

### `capture.add(canvas)`
- `canvas` Element - 需要捕获的 canvas dom 元素

添加一张捕获图片

### `capture.end(callback)`
- `callback` Function - 捕获结束处理完成后的回调函数
  - `imgs` string[] - 已捕获图片列表

结束捕获