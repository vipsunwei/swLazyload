
(function($, window, document) {
  $.extend($.fn, {
    validate: function(options) {
      if (!this.length) {
        return;
      }
      let validator = $.data(this[0], 'validator')
      if (validator) {
        return validator
      }
      validator = new $.validator(options, this[0])
      $.data(this[0], 'validator', validator)
      return validator
    }
  });
  $.validator = function(options, form) {
    this.settings = $.extend(true, {}, $.validator.defaults, options)
    this.curForm = form
    this.init()
  }
  $.extend($.validator, {
    defaultMessages: {
      required: '必填字段',
      mobile: '请输入有效的手机号码',
      email: '请输入有效的电子邮箱',
      idCard: '请输入有效的身份证号',
      maxlength: '输入内容超长',
      minlength: '输入内容太短'
    },
    defaults: {
      errorElement: 'labal',
      errorClass: 'error',
      ignore: ':hidden',
      rules: {},
      messages: {},
      defaultEvent: 'input',
      oninput: function(element, event) {
        this.check(element, event)
      },
      onchange: function(element, event) {
        this.check(element, event)
      },
      onblur: function(element, event) {
        this.check(element, event)
      },
      onkeyup: function(element, event) {
        const excludedKeys = [
          16, 17, 18, 20, 35, 36, 37,
          38, 39, 40, 45, 144, 225
        ]
        let val = $(element).val().replace(/\r/g, '')
        // 键码9 => Tab键
        if (event.which === 9 && val === '' || $.inArray(event.keyCode, excludedKeys) !== -1) {
          return
        }
        this.check(element, event)
      }
    },
    methods: {
      required: function(value, element, param) {
        return value !== undefined && value !== null && value.length > 0
      },
      minlength: function(value, element, param) {
        return value.length >= param
      },
      maxlength: function(value, element, param) {
        return value.length <= param
      }
    },
    prototype: {
      init: function() {
        this.errorMap = {}
        let curForm = this.curForm
  
        function proxyFn(e) {
          // 如果不是当前表单触发的事件，则不做响应处理
          if (curForm !== this.form) {
            return
          }
          let validator = $.data(this.form, 'validator')
          let eventType = 'on' + e.type
          let settings = validator.settings
          if (settings[eventType] && !$(this).is(settings.ignore)) {
            settings[eventType].call(validator, this, event)
          }
        }
        let eventType = this.settings.defaultEvent
        let events = ['input', 'change', 'blur', 'keyup']
        if (!eventType || $.inArray(eventType, events) === -1) {
          throw new Error('您没有指定defaultEvent或者您指定的defaultEvent不在本插件支持的事件范围内')
        }
        // 绑定事件
        $(this.curForm).on(eventType, ':text', proxyFn)
      },
      check: function(element, event) {
        // 获取规则， 当前元素value值
        let rules = this.settings.rules[element.name]
        // 如果有必填，确保必填是第一个
        if (rules.required) {
          let param = rules.required;
          delete rules.required;
          rules = $.extend({
            required: param
          }, rules);
        }
        let val = $(element).val().replace(/\r/g, '')
        let result;
        let method;
        let rule;
        for (method in rules) {
          rule = {
            method: method,
            parameters: rules[method]
          };
          try {
            result = $.validator.methods[method].call(this, val, element, rule.parameters);
            if (!result) {
              // 验证不通过
              this.showTip(element, rule)
              return false;
            }
          } catch (e) {
            throw e;
          }
        }
        // 验证通过
        this.hideTip(element)
        return true;
      },
      showTip: function(element, rule) {
        if (this.errorMap[element.name]) {
          return
        }
        // 根据rule获取提示语
        let message = this.getMessage(element, rule)
        // 创建错误提示元素
        error = $("<" + this.settings.errorElement + ">")
          .attr("id", element.name + "-error")
          .addClass(this.settings.errorClass)
          .html(message || "");
        error.insertAfter(element);
        this.errorMap[element.name] = error
      },
      
      hideTip: function(element) {
        if (!this.errorMap[element.name]) {
          return
        }
        this.errorMap[element.name].html('').hide()
        delete this.errorMap[element.name]
      },
      getMessage: function(element, rule) {
        let theregex = /\$?\{(\d+)\}/g
        let mObj = this.settings.messages[element.name]
        let message = mObj[rule.method]
        let regRes = theregex.test(message)
        if (regRes) {
          message = message.replace(theregex, rule.parameters)
        }
        return message
      }
    }
  });
})(jQuery, window, document)
