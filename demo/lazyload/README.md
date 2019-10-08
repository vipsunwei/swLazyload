# swLazyload

## 简介：

网易云课堂-微专业考核练习题：基于jQuery的图片懒加载插件

## 默认参数：

```javascript
let _defaults = {
  // 存放图片src地址的自定义属性
  src: "data-src",
  // 存放图片srcset的自定义属性
  // img的srcset属性方便的解决了页面图片适应不同屏幕密度的情况
  srcset: "data-srcset",   
  // 需要懒加载的img元素的选择器
  selector: ".lazyload",  
  // 所监听对象的具体祖先元素(element)。如果未传入值或值为null，则默认使用顶级文档的视窗。
  root: null,   
  // 计算交叉时添加到根(root)边界盒bounding box的矩形偏移量，
  // 可以有效的缩小或扩大根的判定范围从而满足计算需要。
  // 此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。
  // 所有的偏移量均可用像素(pixel)(px)或百分比(percentage)(%)来表达, 默认值为"0px 0px 0px 0px"。
  rootMargin: "0px",
  // 一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。
  // 当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。如果构造器未传入值, 则默认值为0。
  threshold: 0              
}
```

## 使用方法：

```html
<!DOCTYPE html>
<html lang="en" style="width: 100%">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>图片懒加载示例</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      text-align: center;
    }
    h2 {
      padding: 10px 0;
    }
    .lazy-box {
      background: #f8f8f8;
      width: 90%;
      height: 440px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
    }
    .lazy-img {
      flex-shrink: 0;
      height: 200px;
      border-radius: 10px;
      background-color: #f8f8f8;
      margin-top: 20px; 
    }
    .lazy-img:last-child {
      margin-bottom: 20px;
    }
  </style>
  <script src="../node_modules/jquery/dist/jquery.js"></script>
</head>

<body style="width: 100%">
  <h2>基于jQuery图片懒加载插件示例</h2>
  <div class="lazy-box ">
    <img class="lazy-img" data-srcset="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-srcset="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-src="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
    <img class="lazy-img" data-srcset="https://pbs.twimg.com/media/EEq5f-GUEAozu7c.jpg">
  </div>

  <script src="./../src/lazyload.js"></script>
  <script>
    // 调用插件
    $(".lazy-box").lazyload({
      selector: ".lazy-img" // 选择器
    });
  </script>
</body>

</html>

```

```js
// 如果在img上使用了默认类名.lazyload，直接如下调用即可
$(".lazy-box").lazyload();
```



