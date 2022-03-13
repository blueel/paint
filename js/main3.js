// 更新配置数据
const updateCanvasOption = () => {
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penThickness;
};

const templateColors = () => {
  let r = "";
  for (let i = 0; i < colors.length; i++) {
    let t = colors[i];
    let className = i === currentColor ? "active" : "";
    r += `<div class="color ${className}" data-color="${t}"></div>`;
  }
  return r;
};

const insertOptionColor = () => {
  const t = templateColors();
  appendHtml(e(".color-bar"), t);
};

const templateThicknessArr = () => {
  let r = "";
  for (let i = 0; i < thicknessList.length; i++) {
    let t = thicknessList[i];
    let className = "";
    if (i == currentThickness) {
      className = "active";
    }
    r += `<div class="thickness ${className}" data-thickness="${t}"></div>`;
  }
  return r;
};

const insertOptionThickness = () => {
  const t = templateThicknessArr();
  appendHtml(e(".thickness-bar"), t);
};

const insertOption = () => {
  insertOptionColor();
  insertOptionThickness();
};

const init = () => {
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

  window.colors = ["#9b59b6", "#3498db", "black", "red", "pink"];
  window.currentColor = 0;

  window.thicknessList = [4, 8, 18, 24];
  window.currentThickness = 0;

  insertOption();
  updateCanvasOption();
};

const bindEventMove = () => {
  bindEvent(canvas, "mousemove", (event) => {
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

const bindEventPen = () => {
  bindAll(es(".bar"), "click", (event) => {
    let target = event.target;
    let bar = target.closest(".bar");
    let type = bar.dataset.type;
    let active = "active";
    if (target.classList.contains(type)) {
      // 删除旧的
      let sel = `.${active}`;
      let activeEle = bar.querySelector(sel);
      activeEle.classList.toggle(active);
      // 添加新的
      target.classList.toggle(active);
      let value = target.dataset[type];
      log("value", value);
      if (type === "thickness") {
        penThickness = int(value);
      } else {
        penColor = value;
      }
      updateCanvasOption();
    }
  });
};

const bindEventClear = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let className = "button-clear";
    if (target.classList.contains(className)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
};

const bindEvents = () => {
  bindEventMove();
  bindEventDown();
  bindEventUp();
  bindEventLeave();
  bindEventPen();
  bindEventClear();
};

const __main = () => {
  // 初始化数据
  init();
  // 绑定事件
  bindEvents();
};

__main();
