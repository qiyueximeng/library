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

## 配置参数

- framerate: 截图目标帧率
- verbose: 是否打印执行信息

## 实例方法

- start: 开启捕获器监听
- add: 
  - 添加一张捕获图片
  - 参数:
    - canvas: 需要捕获的 canvas dom 元素
- end:
  - 捕获结束
  - 参数:
    - callback: 捕获结束处理完成后的回调函数
    - imgs: 回调函数接收参数，已捕获图片列表