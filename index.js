const match = navigator.userAgent.match(/msie\s+(\d+?).\d/i);
let isOldIE = false;
if (match != null) {
  const version = parseInt(match[1]);
  if (version < 10) {
    isOldIE = true;
  }
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
      // nothing to do...
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
  let script = document.createElement("script");
  script.onload = script.error = () => {
    document.body.removeChild(script);
    script = null;
    callback(YoTest);
  };

  script.src = src;
  script.async = "async";
  document.body.appendChild(script);
}

module.export = ({ accessId, platform = "web", product = "float", area, bgColor }, callback) => {
  getInitData((error, response) => {
    if (error == null) {
      const { code, data } = response;
      if (code === 200) {
        loadScript(data.lib, (YoTest) => {
          if (YoTest == null) {
            callback(null);
            return;
          }

          YoTest({
            accessId,
            platform,
            product,
            area,
            bgColor,
          }, data, callback);
        });
      }
    }
  })
};

module.export({
  accessId: "4297f44b13955235245b2497399d7a93",
  product: "float",
}, (captcha) => {
  captcha.appendTo("#captcha");
});