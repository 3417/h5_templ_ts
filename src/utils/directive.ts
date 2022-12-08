const fixed = {
  inserted() {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText +=
      "position:fixed;overflow:hidden;width:100%;top:-" + scrollTop + "px;";
  },
  unbind() {
    let body = document.body;
    body.style.position = "";
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = "";
    body.style.overflow = "initial";
  },
}

const eruda = {
  inserted(el:any, binding:any, vnode:any) {
    const setEruda = () => {
      binding.value--;
      if (window.eruda) { return };
      if (binding.value === 0) {
        let head = document.getElementsByTagName('head')[0];
        let script:any = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            window.eruda && window.eruda.init();
          }
        };
        script.src = '//cdn.jsdelivr.net/npm/eruda';
        head.appendChild(script);
      }
    }
    el.addEventListener("click", setEruda,false);
  }
}

const clog = {
  inserted(el:any, binding:any, vnode:any) {
    const setConsole = () => {
      binding.value--;
      if (window.VConsole) { return };
      if (binding.value === 0) {
        let head = document.getElementsByTagName('head')[0];
        let script:any = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            window.VConsole && new window.VConsole();
          }
        };
        script.src = '//unpkg.com/vconsole@latest/dist/vconsole.min.js';
        head.appendChild(script);
      }
    }
    el.addEventListener("click", setConsole,false);
  }
}
// 使用 ：v-debounce="{fn:<handFn>,event:'click',delay:200}"
const debounce = {
  inserted(el:any,binding:any){
      if(typeof binding.value.fn !== 'function' || !binding.value.event) return
      let delay = 200;
      el.timer = null;
      el.handler = function(){
          if(el.timer){
              clearTimeout(el.timer);
              el.timer = null;
          }
          el.timer = setTimeout(() => {
              binding.value.fn.apply(this,arguments);
              el.timer = null;
          }, binding.value.delay || delay);
      }
      el.addEventListener(binding.value.event,el.handler)
  },
  // 元素卸载的时候清理定时器移除监听事件
  unbind(el:any,binding:any){
      if(el.timer){
          clearTimeout(el.timer);
          el.timer = null;
      }
      el.removeEventListener(binding.value.event,el.handler);
  }
}
// 使用 ：v-throttle="{fn:<handFn>,event:'input',delay:200}"
const throttle = {
  inserted(el:any,binding:any){
      if(typeof binding.value.fn !== 'function' || !binding.value.event) return;
      let delay = 200;
      el.timer = null;
      el.handler = function(){
          if(el.timer) return;
          el.timer = setTimeout(()=>{
              if(el.timer) return;
              binding.value.fn.apply(this,arguments);
              el.timer = null;
          },binding.value.delay || delay);
      }
      el.addEventListener(binding.value.event,el.handler);
  },
  unbind(el:any,binding:any){
      if(el.timer){
          clearTimeout(el.timer)
      }
      el.removeEventListener(binding.value.event,el.handler);
  }
}

const Plugin:any = {
  fixed,
  eruda,
  clog,
  debounce,
  throttle
}

export default (app:any) => {
  Object.keys(Plugin).forEach(item => {
    app.directive(item, Plugin[item]);
  })
}
