(function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",//考虑以及兼容了 屏幕旋转的事件
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth == 375) {
          docEl.style.fontSize = "10px";
        } else {
          docEl.style.fontSize = 10 * (clientWidth / 375) + "px";
        }
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);// 屏幕大小以及旋转变化自适应
    doc.addEventListener("DOMContentLoaded", recalc, false); // 页面初次打开自适应
  })(document, window);