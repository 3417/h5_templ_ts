
function insertEruda(){
  if (window.eruda) { return };
  let head = document.getElementsByTagName('head')[0];
  let script:any = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
      window.eruda && window.eruda.init();
    }
  };
  script.src = 'https://cdn.qqq1111.top/sc/CDN/eruda.min.js';
  head.appendChild(script);
}

function insertVlog(){
  if (window.VConsole) { return };
  let head = document.getElementsByTagName('head')[0];
  let script:any = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
      window.VConsole && new window.VConsole();
    }
  };
  script.src = 'https://cdn.qqq1111.top/sc/CDN/vconsole.min.js';
  head.appendChild(script);
}

const fixed = {
  mounted() {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText +=
      "position:fixed;overflow:hidden;width:100%;top:-" + scrollTop + "px;";
  },
  unmounted() {
    let body = document.body;
    body.style.position = "";
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = "";
    body.style.overflow = "initial";
  },
}

const eruda = {
  mounted(el:any, binding:any, vnode:any) {
    const setEruda = () => {
      binding.value--;
      if (binding.value === 0) {
        insertEruda();
      }
    }
    el.addEventListener("click", setEruda,false);
  }
}

const clog = {
  mounted(el:any, binding:any, vnode:any) {
    const setConsole = () => {
      binding.value--;
      if (binding.value === 0) {
        insertVlog();
      }
    }
    el.addEventListener("click", setConsole,false);
  }
}
// 使用 ：v-debounce="{fn:()=>{<handFn>},event:'click',delay:200}"
const debounce = {
  mounted(el:any,binding:any){
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
  unmounted(el:any,binding:any){
      if(el.timer){
          clearTimeout(el.timer);
          el.timer = null;
      }
      el.removeEventListener(binding.value.event,el.handler);
  }
}
// 使用 ：v-throttle="{fn:()=>{<handFn>},event:'input',delay:200}"
const throttle = {
  mounted(el:any,binding:any){
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
  unmounted(el:any,binding:any){
      if(el.timer){
          clearTimeout(el.timer)
      }
      el.removeEventListener(binding.value.event,el.handler);
  }
}

// h5下拉选择项 v-clickOutSide
const clickOutSide = {
  mounted(el,binding,vnode){
    console.log(binding);
    // 默认要传递binding.value为isShow
    function clickHandler(e){
      if(el.contains(e.target)){
        return false;
      }else{
        if (binding.value) {
          binding.instance[binding.value] ? binding.instance[binding.value] = false : ''
        } else {
          binding.instance.isShow ? binding.instance.isShow =false :''
        }
      }
    }
    el.__vueClickOutSide = clickHandler;
    document.addEventListener('click',clickHandler);
  },
  unmounted(el,binding){
    document.removeEventListener('click',el.__vueClickOutSide);
    delete el.__vueClickOutSide;
  }
}

// 使用h5-drag 携带:[animation]是否展示动画效果->h5drag:animation
const h5drag = {
  mounted(el,binding,vnode){
    let isDrag = true,tempX = 0,x = 0,tempY = 0,y=0,endX = 0;
    el.style.position = 'absolute';
    el.ontouchstart = e =>{
      isDrag = true;
      tempX = parseInt(el.style.left + 0);
      tempY = parseInt(el.style.top + 0);
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
      el.style.transition = 'none';
    }
    el.ontouchmove = (e)=>{
      if(isDrag){
        let curX,curY;
        curX = e.touches[0].pageX - (el.offsetWidth / 2);
        curY = e.touches[0].pageY - (el.offsetHeight / 2);
        let height = document.documentElement.clientHeight >= document.body.scrollHeight ? document.documentElement.clientHeight : document.body.scrollHeight
        if (binding.value) {
          height = el.parentElement.clientHeight;
        }
        let clientWidth = document.documentElement.clientWidth - el.clientWidth - 2;
        let clientHeight = height - el.clientHeight - 2;
        //边界判断
        curX = curX < 0 ? 0 : curX;
        curY = curY < 0 ? 0 : curY;
        curX = curX < clientWidth ? curX : clientWidth;
        curY = curY < clientHeight ? curY : clientHeight;
        endX = curX;
        // 定位位于左侧移动
        el.style.left = curX + "px";
        el.style.top = curY + "px";
        //阻止浏览器继续处理触摸(和鼠标)事件。
        e.preventDefault();
      }
    }
    el.ontouchend = e => {
      if (binding.arg === 'animation') {
        const { width } = window.screen;
        const { left } = window.getComputedStyle(el);
        let px = left.match(/\d+/)[0];
        let lft = (px < width / 2) ? 0 : left;
        el.style.left = (Math.floor(document.documentElement.clientWidth / 2) > endX + (el.clientWidth / 2)) ? lft : (document.documentElement.clientWidth - el.clientWidth) + 'px'
        el.style.transition = "all .18s linear";
      }
      isDrag = false;
    };
  }
}

// 长按出现调试工具 v-longpress:3000="()=>{}"(eruda调试工具)
const longpress = {
  mounted(el, binding, vnode) {
    const onEruda = () => {
        if (window.eruda) { return };
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            window.eruda && window.eruda.init();
          }
        };
        script.src = '//cdn.jsdelivr.net/npm/eruda';
        head.appendChild(script);
    }
    const handleFn = (e)=>{
      binding.value(e);
    }
    let s = binding.arg * 1 || 3000;
    if(typeof binding.value !== 'function'){
      throw 'callback must be function'
    }
    el._pressTimer = null;
    el.style.userSelect = 'none';
    el._start = (e)=>{
      let flag1 = e.type === 'mousedown' &&e.button && e.button !== 0;
      let flag2 = e.type === 'touchstart'&&e.touches &&e.touches.length > 1;
      if(flag1 || flag2){return}

      if(!el._pressTimer){
        el._pressTimer = setTimeout(() => {
          onEruda();
          handleFn();// 返回一个事件
        }, s);
      }
    }

    el._cancel = (e)=>{
      if(el._pressTimer){
        clearTimeout(el._pressTimer);
        el._pressTimer = null;
      }
    }

    el.addEventListener('mousedown',el._start);
    el.addEventListener('touchstart',el._start);
    el.addEventListener('click',el._cancel);
    el.addEventListener('mouseout',el._cancel);
    el.addEventListener('touchend',el._cancel);
    el.addEventListener('touchcancel',el._cancel);
  },
  unmounted(el, binding) {
    // 移除计时监听
    el.removeEventListener('mousedown', el._start)
    el.removeEventListener('touchstart', el._start)
    // 移除取消监听
    el.removeEventListener('click', el._cancel)
    el.removeEventListener('mouseout', el._cancel)
    el.removeEventListener('touchend', el._cancel)
    el.removeEventListener('touchcancel', el._cancel)
  }
}

// 倒计时 v-countdown:[30]="{fn:<fn>,msg}",组件中的fn方法需要使用promise返回值(fn 需要使用节流防抖)
const countdown = {
  mounted(el, binding, vnode) {
    console.log(el, binding, vnode);
    let flag = false, that = vnode.context;  //that为当前组件的this
    el.onclick = async function () {
      let getMsg = await binding.value.fn();
      console.log(getMsg, flag)
      if (!getMsg || flag) { return };
      flag = true;
      let i = binding.arg || 60;  //获取倒计时 时间
      el.innerHTML = i + 's';
      vnode.el.style = 'filter:grayscale(1);pointer-events:none';
      let t = setInterval(() => {
        if (i < 1) {
          clearInterval(t);
          flag = false;
          el.innerHTML = binding.value.msg;
          vnode.el.style = 'filter:grayscale(0);pointer-events:auto';
          return;
        };
        i--;
        el.innerHTML = i + 's';
      }, 1000)
    }
  }
}

// 监听用户在页面上进行的手势
const useHandLog = {
  mounted(el, binding, vnode){
    let isDrawing = false;
    let startPoint, endPoint;
    let targetRadius = 50; //设置特定的半径值
    let tolerance = 80; //设置的容差范围
    let clickCount = 0;
    // 监听鼠标/触摸事件开始
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    document.addEventListener(isTouchDevice ? 'touchstart' : 'mousedown', startDrawing);
    function startDrawing(e) {
      e.preventDefault();
      clickCount++;
      isDrawing = true;
      let x = e.clientX || e.touches[0].clientX; // 获取触摸点的 X 坐标
      let y = e.clientY || e.touches[0].clientY; // 获取触摸点的 Y 坐标
      startPoint = {x, y};
    }
    // 监听鼠标/触摸移动事件
    document.addEventListener(isTouchDevice ? 'touchmove':'mousemove', draw);
    function draw(e) {
      e.preventDefault();
      if (isDrawing) {
        let x = e.clientX || e.touches[0].clientX; // 获取触摸点的 X 坐标
        let y = e.clientY || e.touches[0].clientY; // 获取触摸点的 Y 坐标
        endPoint = {x, y};
      }
    }
    // 监听鼠标/触摸结束事件
    document.addEventListener('touchend', endDrawing);
    function endDrawing() {
      isDrawing = false;
      // 控制连续点5次或者连续画5个圈
      if(clickCount <= 2) return;
      // 在这里可以编写判断用户绘制的图形是否符合圆的逻辑
      if(!endPoint || !startPoint) return;
      let radius = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
      if (Math.abs(radius-targetRadius) <= tolerance) {
        insertEruda();
        clickCount = 0;
      }
    }
  }
}

const Plugin:any = {
  fixed,
  eruda,
  clog,
  debounce,
  throttle,
  clickOutSide,
  h5drag,
  countdown,
  longpress,
  useHandLog
}

export default (app:any) => {
  Object.keys(Plugin).forEach(item => {
    app.directive(item, Plugin[item]);
  })
}
