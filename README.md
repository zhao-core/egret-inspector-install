## Egret 白鹭开发Chrome插件（修复版）
控制台偶尔会报错 Uncaught TypeError: this.addChild is not a function 。
这插件依赖页面中的 Egret 引擎，当它在加载时，游戏页面中的 Egret 引擎可能还未完全加载，所以调用 this.addChild 方法导致报错。

![inspector error](https://github.com/jsl6/EgretInspector-install/blob/master/docs/inspector-error.jpg?raw=true)

 ### 解决 this.addChild is not a function 报错

  EgretInspector-install 目录中的 contentScripts.min.js 文件，将压缩后的代码进行格式化还原。再将还原后的 313 - 320 行代码进行替换，原代码：
  ```javascript

  if (EGRETRELEASE) {
    n = ["injectScripts.min.js"];
  }
  e.addScript(n);
  window.setTimeout(function() {
    t.startInspectIfDevToolOpen();
  }, 200);
```

修改为：
```javascript
   if (EGRETRELEASE) {
      n = ["injectScripts.min.js"];
    }
    
  window.setTimeout(function() {
    e.addScript(n);
    t.startInspectIfDevToolOpen();
  }, 200);
```

### 使用
```shell
git clone https://github.com/jsl6/EgretInspector-install.git
```

打开chrome 扩展程序，开发模式下，加载已解压的扩展程序
![extend](https://github.com/jsl6/EgretInspector-install/blob/master/docs/extend.jpg?raw=true)

选择前面EgretInspector-install即可。
这时打开Egret运行页面，插件不会报错。
![EgretInspector](https://github.com/jsl6/EgretInspector-install/blob/master/docs/egret-inspector.jpg?raw=true)

亲测Chrome 79.0.3945.88（正式版本）有效。  
修改基于：EgretInspector-v2.5.5。