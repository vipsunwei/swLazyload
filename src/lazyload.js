
(function ($, window, document, undefined) { // 用一个自调用匿名函数把插架代码包裹起来，防止代码污染
  let root = window;
  let _lazyload = {
    _defaults: {
      src: "data-src",          // 图片地址
      srcset: "data-srcset",    // img的srcset属性方便的解决了页面图片适应不同屏幕密度的情况
      selector: ".lazyload",    // 需要懒加载的img元素的选择器
      root: null,               // 所监听对象的具体祖先元素(element)。如果未传入值或值为null，则默认使用顶级文档的视窗。
      rootMargin: "0px",        // 计算交叉时添加到根(root)边界盒bounding box的矩形偏移量， 可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用像素(pixel)(px)或百分比(percentage)(%)来表达, 默认值为"0px 0px 0px 0px"。
      threshold: 0              // 一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。如果构造器未传入值, 则默认值为0。
    },

    _init: function ($el) {

      // 获取指定区域内的img元素
      this.images = $(this.settings.selector)

      // 如果浏览器不支持这个API
      if (!root.IntersectionObserver) {
        this._loadImages();
        return;
      }

      let self = this;
      let observerConfig = {
        root: $el[0],
        rootMargin: this.settings.rootMargin,
        threshold: [this.settings.threshold]
      };
      // IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。
      // 当一个IntersectionObserver对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦IntersectionObserver被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。
      self.observer = new IntersectionObserver(function (entries) {
        Array.prototype.forEach.call(entries, function (entry) {
          if (entry.isIntersecting) {
            self.observer.unobserve(entry.target); // 取消对当前目标的观察，然后替换图片地址显示图片
            let src = entry.target.getAttribute(self.settings.src);
            let srcset = entry.target.getAttribute(self.settings.srcset);
            if ('img' === entry.target.tagName.toLowerCase()) {
              if (src) {
                entry.target.src = src;
              }
              if (srcset) {
                entry.target.srcset = srcset;
              }
            } else {
              entry.target.style.backgroundImage = `url(${src})`;
            }
          }
        });
      }, observerConfig);

      // 遍历所有需要懒加载的图片元素，开始观察图片元素
      Array.prototype.forEach.call(this.images, function (image) {
        self.observer.observe(image); // 使IntersectionObserver开始监听每个目标元素。
      });
    },
    /**
     * 当浏览器不支持IntersectionObserver时，直接替换图片地址，显示图片
     */
    _loadImages: function () {
      if (!this.settings) { return; }

      let self = this;
      Array.prototype.forEach.call(this.images, function (image) {
        let src = image.getAttribute(self.settings.src);
        let srcset = image.getAttribute(self.settings.srcset);
        if ('img' === image.tagName.toLowerCase()) {
          if (src) {
            image.src = src;
          }
          if (srcset) {
            image.srcset = srcset;
          }
        } else {
          image.style.backgroundImage = `url(${src})`;
        }
      });
    }
  }
  $.fn.lazyload = function (options) {
    // 合并配置参数，用新的空对象做目标，不改变源对象
    _lazyload.settings = $.extend({}, _lazyload._defaults, options || {});    // 将传入参数和默认参数合并
    // 调用初始化，并传递this：jQuery对象就是$('...')的结果
    _lazyload._init(this)
    return this;
  }
})(jQuery, window, document);
