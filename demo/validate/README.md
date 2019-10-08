# swValidator

## 简介：

网易云课堂-微专业考核练习题：基于jQuery的表单验证插件

## 默认参数：

```javascript
let defaults = {
  // 错误提示tag标签
  errorElement: 'span',
  // 错误提示类选择器
  errorClass: 'error',
  // 验证规则
  rules: {},
  // 错误提示语
  messages: {},
  // 触发验证的事件
  defaultEvent: 'input'
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
    <title>基于jQuery的微型表单验证插件示例</title>
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
    div {
      margin-top: 20px;
    }
    .error {
      color: #f40;
      margin-left: 10px;
      margin-top: 8px;
      font-size: 12px;
      display: block;
    }
  </style>
    <script src="../../node_modules/jquery/dist/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="./validator.js" type="text/javascript" charset="utf-8"></script>
  </head>

  <body style="width: 100%">
    <h2>基于jQuery的微型表单验证插件示例</h2>
    <form id="myForm" action="" method="post" class="mui-input-group">
      <div class="mui-input-row">
        <label> 用户名: </label>
        <input type="text" name="userName" placeholder="请输入用户名" />
      </div>
      <div class="mui-input-row">
        <label> 身份证号: </label>
        <input type="text" name="idcard" placeholder="身份证号码" />
      </div>
      <div class="mui-input-row">
        <label> 手机号码: </label>
        <input type="text" name="mobile" value="" placeholder="手机号码" />
      </div>
      <div class="mui-input-row">
        <label> 电子邮件: </label>
        <input type="text" name="email" value="" placeholder="电子邮件" />
      </div>
    </form>
    <script>
      // 调用插件
      $("#myForm").validate({
        // 默认触发验证事件 input，
        // 支持的事件有`['input', 'change', 'blur', 'keyup', 'focusout']` 
        // 如果不使用自定义事件，请不要在参数中传递defaultEvent属性。
  			// defaultEvent: '',
        defaultEvent: "keyup", // 自定义校验触发事件
        // 规则暂时支持`required`, `minlength`, `maxlength`, `email`, `mobile`, `IDCard` 校验
        rules: {
          userName: {
            maxlength: 12,
            required: true,
            minlength: 6
          },
          mobile: {
            mobile: true,
            required: true
          },
          idcard: {
            IDCard: true
          },
          email: {
            email: true,
            // required: true
          }
        },
        messages: {
          userName: {
            // required: '必填字段',
            maxlength: "最多可以输入 {0} 个字符", // {0} 会被替换成rules中传递的 12
            minlength: "最少要输入 {0} 个字符"    // {0} 会被替换成rules中传递的 6
          },
          mobile: {
            mobile: "请输入有效的手机号码"
          },
          idcard: {
            IDCard: "请输入有效的身份证号码"
          },
          email: {
            email: "请输入有效的电子邮件地址"
          }
        }
      });
    </script>
  </body>

</html>


```





