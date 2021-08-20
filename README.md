YoTest-Web-SDK 文档
----
<a href="https://www.npmjs.com/package/yotest-web-sdk"><img src="https://img.shields.io/npm/v/yotest-web-sdk.svg?sanitize=true" alt="Version"></a>


* [兼容性](https://github.com/YoTest-team/YoTest-Web-SDK#1-%E5%85%BC%E5%AE%B9%E6%80%A7)
* [安装](https://github.com/YoTest-team/YoTest-Web-SDK#2-%E5%AE%89%E8%A3%85)
* [快速开始](https://github.com/YoTest-team/YoTest-Web-SDK#3-%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
* [API](https://github.com/YoTest-team/YoTest-Web-SDK#4-api)

### 兼容性
* IE9+
* Chrome 4+
* Safari 4+
* Firefox 3.6+
* Edge 12+
* Android 3+
* iOS Safari 3.2+
* iOS WebView 3.2+

### 安装

> npm install yotest-web-sdk --save

或者你可以在HTML文件中引用CDN路径

```html
<script src="https://cdn.jsdelivr.net/npm/yotest-web-sdk@1.0.0/dist/index.js"></script>
```
### 快速开始

当你使用npm进行安装后，你可以通过import直接引入

```javascript
import initYoTest from "yotest-web-sdk";

initYoTest({
  accessId: "当前项目所属的accessId，可以在后台中进行获取及查看",
}, (captcha)=>{
  if(captcha != null){
    captcha.appendTo("#captcha");
  }
});
```

如果你是通过CDN路径引入，那么你也可以轻松的使用此SDK

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>YoTest Web SDK Demo</title>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
      }

      #captcha {
        width: 300px;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <div id="captcha"></div>
    <script>
      initYoTest({
        accessId: "当前项目所属的accessId，可以在后台中进行获取及查看",
      }, (captcha) => {
        if(captcha != null) {
          captcha.appendTo("#captcha");
        }
      });
    </script>
  </body>
</html>
```

### API

初始化函数

* [initYoTest(option, callback)](https://github.com/YoTest-team/YoTest-Web-SDK#inityotestoption-callback)

Captcha实例方法

* [appendTo(selector)](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypeappendto)

* [getValidate()](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypegetvalidate)

* [reset()](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypereset)

* [verify()](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypeverify)

* [onReady(callback)](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypeonreadycallback)

* [onSuccess(callback)](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypeonsuccesscallback)

* [onError(callback)](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypeonerrorcallback)

* [onClose(callback)](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypeonclosecallback)

* [destroy()](https://github.com/YoTest-team/YoTest-Web-SDK#captchaprototypedestroycallback)

#### initYoTest(option, callback)
  - `option` \<Object\>
    - **accessId** \<String\> **必填**，当前项目所属的accessId，可以在优验后台中进行相关获取及查看
    - **product** \<String\> **选填**，默认值float，设置验证码的展现形式，其值包括浮动式（float）、弹出式（popup）、绑定式（bind）、自定义式（custom）四种，具体形式可自行通过 [在线体验]() 页面进行选择。需要注意的是，移动端由于屏幕展现原因，是无法展现浮动式（float）的
    - **area** \<String\> **选填**，仅当 product: "custom" 生效，其作用为设置验证区域。需要注意的是，请确保对应的DOM元素存在，且符合CSS Selector的规范（例如：#id、.class、tagName及其组合均为合法）
    - **bgColor** \<String\> **选填**，仅当 product: "custom" 生效，其设置对应验证区域的背景，支持HEX、RGB及RGBA的颜色格式
  - `callback` \<Function\>
    - **captcha**: \<Captcha\> 加载成功且初始化完成则返回 Captcha 实例，其具有的方法请参考下方文档说明，若加载失败，其返回为 null，请做好错误处理
  - `return:` undefined

初始化 `YoTest` ，传入相关的 `option` 参数，在 `callback` 中将会得到 `YoTest` 的对应实例。

```javascript
initYoTest({
  accessId: "<your project accessId>",
  product: "custom",
  area: "#container",
  bgColor: "#ff0000",
}, function(captcha) {
  if(captcha != null){
    captcha.appendTo("#captcha");
  }
});
```

#### Captcha.prototype.appendTo(selector)

#### Captcha.prototype.getValidate()

#### Captcha.prototype.reset()

#### Captcha.prototype.verify()

#### Captcha.prototype.onReady(callback)

#### Captcha.prototype.onSuccess(callback)

#### Captcha.prototype.onError(callback)

#### Captcha.prototype.onClose(callback)

#### Captcha.prototype.destroy(callback)
