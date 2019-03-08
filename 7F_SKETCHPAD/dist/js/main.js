;(function() {
  //工具列隱藏
  let arrowUp = document.querySelector('.arrowUp')
  let topBar = document.querySelector('.topBar')
  let arrowDown_arrow = document.querySelector('.arrowDown__arrow')
  let arrowDown_Brush = document.querySelector('.arrowDown__brush')
  let bottomBar = document.querySelector('.bottomBar')
  arrowUp.addEventListener('click', function() {
    arrowUp.classList.toggle('active')
    topBar.classList.toggle('active')
  })
  arrowDown_arrow.addEventListener('click', function() {
    arrowDown_arrow.classList.add('active')
    arrowDown_Brush.classList.add('active')
    bottomBar.classList.add('active')
  })
  arrowDown_Brush.addEventListener('click', function() {
    arrowDown_arrow.classList.remove('active')
    arrowDown_Brush.classList.remove('active')
    bottomBar.classList.remove('active')
  })

  // 步驟記錄
  let iStep
  let stepArray
  function step() {
    stepArray.splice(iStep + 1, stepArray.length - iStep - 1)
    iStep++
    stepArray.push(canvas.toDataURL())
  }

  //canvas init
  let canvas = document.querySelector('#sketchpad')
  let ctx = canvas.getContext('2d')
  let ww, wh
  function canvasResize() {
    ww = canvas.width = window.innerWidth
    wh = canvas.height = window.innerHeight
  }
  function canvasInit() {
    ctx.fillStyle = '#E8E8E8'
    ctx.fillRect(0, 0, ww, wh)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = size
    ctx.strokeStyle = color

    iStep = -1
    stepArray = new Array()
    step()
  }
  //size
  let sizeDom = document.querySelector('.bottomBar__size__number')
  let size = sizeDom.value
  sizeDom.addEventListener('change', function() {
    size = sizeDom.value
    ctx.lineWidth = size
  })

  //color
  let color = '#fff'
  let colorUL = document.querySelector('.bottomBar__color > ul')
  colorUL.addEventListener('click', function(e) {
    const target = e.target
    if (target.nodeName !== 'LI') return false

    const child = colorUL.childNodes
    child.forEach(item => {
      if (item.tagName === 'LI') item.classList.remove('active')
    })

    target.classList.add('active')
    color = target.dataset.color
    ctx.strokeStyle = color
  })

  // 畫圖方法
  let isDrawing = false
  let lastX = 0
  let lastY = 0
  function draw(e) {
    if (!isDrawing) return false
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    lastX = e.offsetX
    lastY = e.offsetY
    ctx.closePath()
  }
  // 上一部方法
  function undoHandler() {
    if (iStep <= 0) return false
    iStep--
    let canvasPic = new Image()
    canvasPic.src = stepArray[iStep]
    canvasPic.onload = () => ctx.drawImage(canvasPic, 0, 0)
  }
  // 下一部方法
  function redoHandler() {
    if (iStep >= stepArray.length - 1) return false
    iStep++
    let canvasPic = new Image()
    canvasPic.src = stepArray[iStep]
    canvasPic.onload = () => ctx.drawImage(canvasPic, 0, 0)
  }
  // 存檔方法
  function saveHandler() {
    this.href = canvas.toDataURL('image/png')
  }

  // 滑鼠結束方法
  function mouseStop() {
    if (!isDrawing) return false
    isDrawing = false
    step()
  }
  // 滑鼠事件
  canvas.addEventListener('mousedown', function(e) {
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
  })
  canvas.addEventListener('mouseup', mouseStop)
  canvas.addEventListener('mouseleave', mouseStop)
  canvas.addEventListener('mousemove', draw)

  //resize
  window.addEventListener('resize', canvasResize)

  const undoDOM = document.querySelector('.topBar__undo')
  const redoDOM = document.querySelector('.topBar__redo')
  const clearDOM = document.querySelector('.topBar__clearAll')
  const saveDOM = document.querySelector('.topBar__save')
  //toolBar
  undoDOM.addEventListener('click', undoHandler)
  redoDOM.addEventListener('click', redoHandler)
  clearDOM.addEventListener('click', canvasInit)
  saveDOM.addEventListener('click', saveHandler)

  canvasResize()
  canvasInit()
})()
