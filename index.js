const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const supportCacheStorage = window.Promise && window.fetch && window.Request && window.caches && caches.open && caches.match;
const supportIndexedDB = window.Promise && !!indexedDB;
const match = navigator.userAgent.match(/msie\s+(\d+?).\d/i);
let isOldIE = false;
if (match != null) {
  const version = parseInt(match[1]);
  if (version < 10) {
    isOldIE = true;
  }
}

function getFromCacheStorage(src, loadAsync, callback) {
  const request = new Request(src);
  let response = [];
  return caches
    .match(request)
    .then((resp) => {
      if (resp == null) {
        return fetch(request).then((resp) => {
          response.push(resp);
          return resp.clone();
        });
      } else {
        response.push(resp);
        return resp.clone();
      }
    })
    .then((resp) => {
      response.push(resp);
      return caches.open("__YOTEST_ASSETS__");
    })
    .then((cache) => {
      return cache.put(request, response[0]);
    })
    .then(() => {
      return response[1].text();
    })
    .then((text) => {
      Function(text).call(window);
      callback(YoTest);
    })
    .catch(() => loadAsync());
}

function getFromIndexedDB(src, loadAsync, callback) {
  const openDB = function () {
    return new Promise((resolve, reject) => {
      const open = indexedDB.open("__YOTEST_ASSETS__", 1);
      open.onsuccess = () => resolve(open.result);
      open.onerror = (event) => reject(event);
      open.onupgradeneeded = () => {
        const db = open.result;
        const store = db.createObjectStore("AssetsStore", { keyPath: "id", autoIncrement: true });
        store.createIndex("URLIndex", ["url"]);
      };
    });
  };

  let database = null;
  let transaction = null;
  let store = null;
  let index = null;
  let object = null;
  return openDB()
    .then((db) => {
      database = db;
      transaction = database.transaction("AssetsStore", "readwrite");
      store = transaction.objectStore("AssetsStore");
      index = store.index("URLIndex");
      return new Promise((resolve, reject) => {
        const assets = index.get([src]);
        assets.onsuccess = () => resolve(assets.result);
        assets.onerror = (event) => reject(event);
      });
    })
    .then((data) => {
      object = data;
      if (data == null) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("get", src);
          xhr.onload = () => resolve(xhr.response || xhr.responseText);
          xhr.onerror = () => reject(new Error(xhr.status || xhr.readyState));
          xhr.send(null);
        });
      }
    })
    .then((text) => {
      if (object == null) {
        transaction = database.transaction("AssetsStore", "readwrite");
        store = transaction.objectStore("AssetsStore");
        store.put({ url: src, text });
        return text;
      } else {
        return object.text;
      }
    })
    .then((text) => {
      Function(text).call(window);
      callback(YoTest);
    })
    .catch(() => loadAsync())
    .then(() => database && database.close());
}

function getInitData(callback) {
  const HttpRequest = isOldIE ? XDomainRequest : XMLHttpRequest;
  const xhr = new HttpRequest();
  xhr.open("get", `${location.protocol}//api.fastyotest.com/api/init`);
  xhr.onload = () => {
    let response = xhr.response || xhr.responseText;
    try {
      response = JSON.parse(response);
    } catch {
    } finally {
      if (typeof callback === "function") {
        callback(null, response);
      }
    }
  };

  xhr.onerror = () => {
    callback(xhr.status || xhr.readyState);
  };

  xhr.send(null);
}

function loadScript(src, callback) {
  const loadAsync = () => {
    let script = document.createElement("script");
    script.onload = script.error = () => {
      document.body.removeChild(script);
      script = null;
      callback(YoTest);
    };

    script.src = src;
    document.body.appendChild(script);
  };

  if (supportCacheStorage) {
    getFromCacheStorage(src, loadAsync, callback);
  } else if (supportIndexedDB) {
    getFromIndexedDB(src, loadAsync, callback);
  } else {
    loadAsync();
  }
}

class Captcha {
  constructor({ platform, accessId, product, area, bgColor, enforced = false }) {
    this.captcha = null;
    this.platform = platform;
    this.accessId = accessId;
    this.product = product;
    this.area = area;
    this.bgColor = bgColor;
    this.enforced = enforced;
    this.onready = null;
    this.onsuccess = null;
    this.onerror = null;
    this.onclose = null;

    if (product === "bind") {
      this.appendTo("#" + Date.now());
    }
  }

  appendTo(id) {
    if (this.product !== "bind") {
      this.attachLoading(id);
    }

    getInitData((error, response) => {
      if (error == null) {
        const { code, data } = response;
        if (code === 200) {
          loadScript(data.lib, (YoTest) => {
            if (YoTest != null) {
              YoTest(
                {
                  accessId: this.accessId,
                  platform: this.platform || "web",
                  product: this.product,
                  area: this.area,
                  bgColor: this.bgColor,
                  enforced: this.enforced,
                },
                data,
                (captcha) => {
                  this.captcha = captcha;
                  this.captcha.onReady(this.onready);
                  this.captcha.onSuccess(this.onsuccess);
                  this.captcha.onError(this.onerror);
                  this.captcha.onClose(this.onclose);
                  this.captcha.appendTo(id);
                }
              );
            }
          });
        }
      }
    });

    return this;
  }

  getValidate() {
    if (this.captcha) {
      return this.captcha.getValidate();
    }
    return this;
  }

  reset() {
    if (this.captcha) {
      this.captcha.reset();
    }
    return this;
  }

  verify() {
    if (this.captcha) {
      this.captcha.verify();
    }
    return this;
  }

  onReady(callback) {
    this.onready = callback;
    if (this.captcha) {
      this.captcha.onReady(callback);
    }
    return this;
  }

  onSuccess(callback) {
    this.onsuccess = callback;
    if (this.captcha) {
      this.captcha.onSuccess(callback);
    }
    return this;
  }

  onError(callback) {
    this.onerror = callback;
    if (this.captcha) {
      this.captcha.onError(callback);
    }
    return this;
  }

  onClose(callback) {
    this.onclose = callback;
    if (this.captcha) {
      this.captcha.onClose(callback);
    }
    return this;
  }

  destroy() {
    if (this.captcha) {
      this.captcha.destroy();
    }
    return this;
  }

  attachLoading(id) {
    const $container = document.querySelector(id);
    if ($container == null) {
      throw new Error(`can't find element with ${id}`);
    }

    const bounding = $container.getBoundingClientRect();
    const em = (bounding.width / 300) * 16;

    const $wrapper = document.createElement("div");
    $wrapper.style.width = "100%";
    $wrapper.style.height = "100%";
    $wrapper.style.cursor = "default";
    $wrapper.style.position = "relative";
    $wrapper.style.webkitTextSizeAdjust = "none";
    $wrapper.style.webkitFontSmoothing = "antialiased";
    $wrapper.style.fontFamily = "-apple-system, BlinkMacSystemFont, Droid Sans, PingFang SC, Helvetica, sans-serif";
    if (em < 12) {
      $wrapper.style.webkitTransform = "scale(" + em / 12 + ")";
      $wrapper.style.msTransform = "scale(" + em / 12 + ")";
      $wrapper.style.mozTransform = "scale(" + em / 12 + ")";
      $wrapper.style.transform = "scale(" + em / 12 + ")";
    }

    const $init = document.createElement("div");
    $init.style.width = 18.625 * em + "px";
    $init.style.height = 2.375 * em + "px";
    $init.style.position = "absolute";
    $init.style.top = "50%";
    $init.style.left = "50%";
    $init.style.webkitTransform = "translate(-50%, -50%)";
    $init.style.mozTransform = "translate(-50%, -50%)";
    $init.style.msTransform = "translate(-50%, -50%)";
    $init.style.transform = "translate(-50%, -50%)";
    $init.style.background = "white";
    $init.style.backgroundImage = "linear-gradient(to bottom, #ffffff, #f2f2f2)";
    $init.style.borderTop = "1px solid #eff0f3";
    $init.style.borderLeft = "1px solid #eaebf0";
    $init.style.borderBottom = "1px solid #d8d9de";
    $init.style.borderRight = "1px solid #d1d2d7";
    $init.style.borderRadius = "4px";
    $init.style.boxSizing = "border-box";
    $init.style.display = "flex";
    $init.style.justifyContent = "center";
    $init.style.alignItems = "center";

    const $text = document.createElement("p");
    $text.style.width = "100%";
    $text.style.height = "100%";
    $text.style.lineHeight = $init.style.height;
    $text.style.padding = 0;
    $text.style.margin = 0;
    $text.style.textAlign = "center";
    $text.style.color = "#828386";
    $text.style.fontSize = "16px";
    $text.style.display = "flex";
    $text.style.justifyContent = "center";
    $text.style.alignItems = "center";
    $text.innerHTML = "友验组件初始化中";

    $container.innerHTML = "";
    $init.appendChild($text);
    $wrapper.appendChild($init);
    $container.appendChild($wrapper);
  }
}

export default ({ platform = "web", accessId, product = "float", area, bgColor, enforced }, callback) => {
  const captcha = new Captcha({ platform, accessId, product, area, bgColor, enforced });
  if (typeof callback === "function") {
    callback(captcha);
  }
  return captcha;
};
