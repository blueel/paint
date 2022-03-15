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
  //图片数据
  window.historyImageData = [] 
  //记录最开始画布状态
  historyImageData.push(ctx.getImageData(0, 0, 700, 500))
  //记录回退的步数
  window.backCount = 0
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
    historyImageData.push(ctx.getImageData(0, 0, 700, 500))
    // backCount++    添加时这样会出bug，当回退一步后再写两画以上再回退时会直接退两步。
    backCount = historyImageData.length - 1    //解决办法
    console.log(backCount);
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

const bindEventClearAll = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let clearClassName = "button-clear";
    if (target.classList.contains(clearClassName)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      historyImageData = []
    }
  });
};

const bindEventCover = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let overClassName = 'pick-cover'
    if(target.classList.contains(overClassName)) {
      penColor = 'white'
      updateCanvasOption();
    }
  });
}

const bindEventDownload = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let downloadClassName = 'pick-download'
    if(target.classList.contains(downloadClassName)){
      const image = canvas.toDataURL("image/png"); 
      const link = document.createElement("a");
      console.log('image',image);
      link.href = image; //href 属性必须在 <a> 标签中指定
      link.download = "PaintJS"; //download为a标签h5新增属性，可以指定下载文件的名称。
      link.click();
    }
  });
}

const bindEventBack = () => {
  let goBack = e('.goBack')
  bindEvent(goBack,'click',() => {
    if(backCount>0) {
      // historyImageData.pop()
      backCount--
    }
    console.log('backCount',backCount);
    ctx.putImageData(historyImageData[backCount], 0, 0)
  })
}

const bindEventForward = () => {
  let goForward = e('.goForward')
  bindEvent(goForward,'click',() => {
    //如果步数==当前图片数据个数就直接结束函数
    if(backCount==historyImageData.length-1) {
      return
    }
    backCount++
    ctx.putImageData(historyImageData[backCount], 0, 0)
  })
}

const bindEvents = () => {
  bindEventMove();
  bindEventDown();
  bindEventUp();
  bindEventLeave();
  bindEventPenColor();
  bindEventPenThickness();
  bindEventClearAll();
  bindEventCover();
  bindEventDownload();
  bindEventBack();
  bindEventForward();
};

const __main = () => {
  // 初始化数据
  init();
  // 绑定事件
  bindEvents();
};

__main();
