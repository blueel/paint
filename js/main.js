// 更新配置数据
const updateCanvasOption = () => {
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penThickness;
};

const init = () => {
  // mdn canvas
  window.canvas = e("#canvas");
  window.ctx = canvas.getContext("2d");
  // 设置画布宽高
  canvas.width = 700;
  canvas.height = 500;
  // 画笔颜色
  window.penColor = "#1abc9c";
  // 画笔大小
  window.penThickness = 4;
  // 是否画
  window.painting = false;
  updateCanvasOption();
};

const bindEventMove = () => {
  bindEvent(canvas, "mousemove", (event) => {
    // log('event', event)
    const x = event.offsetX;
    const y = event.offsetY;
    if (painting) {
      // 移动并且画
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // 移动不画
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  });
};

const bindEventDown = () => {
  bindEvent(canvas, "mousedown", (event) => {
    painting = true;
  });
};

const bindEventUp = () => {
  bindEvent(canvas, "mouseup", (event) => {
    painting = false;
  });
};

const bindEventLeave = () => {
  bindEvent(canvas, "mouseleave", (event) => {
    painting = false;
  });
};

const bindEventPenThickness = () => {
  const bar = e(".thickness-bar");
  bindEvent(bar, "click", (event) => {
    let target = event.target;
    let className = "thickness";
    let active = "active";
    if (target.classList.contains(className)) {
      // 删除旧的
      let sel = `.${active}`;
      let activeEle = bar.querySelector(sel);
      activeEle.classList.toggle(active);
      // 添加新的
      target.classList.toggle(active);
      let thickness = target.dataset.thickness;
      log('thickness', typeof thickness, thickness)
      penThickness = int(thickness);
      updateCanvasOption();
    }
  });
};

const bindEventPenColor = () => {
  const bar = e(".color-bar");
  bindEvent(bar, "click", (event) => {
    let target = event.target;
    let className = "color";
    let active = "active";
    if (target.classList.contains(className)) {
      // 删除旧的
      let sel = `.${active}`;
      let activeEle = bar.querySelector(sel);
      activeEle.classList.toggle(active);
      // 添加新的
      target.classList.toggle(active);
      let color = target.dataset.color;
      penColor = color;
      updateCanvasOption();
    }
  });
};

const bindEventRightSide = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let clearClassName = "button-clear";
    let overClassName = 'pick-cover'
    let downloadClassName = 'pick-download'
    if (target.classList.contains(clearClassName)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }else if(target.classList.contains(overClassName)) {
      penColor = 'white'
      updateCanvasOption();
    }else if(target.classList.contains(downloadClassName)){
      const image = canvas.toDataURL("image/png"); 
      const link = document.createElement("a");
      console.log('image',image);
      link.href = image; //href 属性必须在 <a> 标签中指定
      link.download = "PaintJS"; //download为a标签h5新增属性，可以指定下载文件的名称。
      link.click();
    }
  });
};

const bindEvents = () => {
  bindEventMove();
  bindEventDown();
  bindEventUp();
  bindEventLeave();
  bindEventPenColor();
  bindEventPenThickness();
  bindEventRightSide();
};

const __main = () => {
  // 初始化数据
  init();
  // 绑定事件
  bindEvents();
};

__main();
