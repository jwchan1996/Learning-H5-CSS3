/*
 * @Author: jwchan1996
 * @Date: 2019-09-03 09:19:32
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-03 11:14:35
 */
window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
    window.setTimeout(t, 1e3 / 60)
  }, window.onresize = function () {
    c.width = cw = c.offsetWidth, c.height = ch = c.offsetHeight, ctx.fillStyle = "rgba(21,21,21,1)", ctx.fillRect(
      0, 0, cw, ch)
  };
let cf = document.createElement("canvas"),
  c = document.getElementById("startrack");
c.width = cf.width = cw = c.offsetWidth, c.height = cf.height = ch = c.offsetHeight;
let longside = Math.max(cw, ch);
cf.width = 2.6 * longside, cf.height = 2.6 * longside;
let ctx = c.getContext("2d"),
  cftx = cf.getContext("2d"),
  centerX = cw,
  centerY = 0,
  stars = [],
  drawTimes = 0;

function rand(t, a) {
  let e = a - t,
    n = Math.random();
  return t + Math.round(n * e)
}

function createStar() {
  stars.push({
    x: rand(-cf.width, cf.width),
    y: rand(-cf.height, cf.height),
    size: 1,
    color: randomColor()
  })
}

function randomColor() {
  return "rgba(" + rand(120, 255) + "," + rand(120, 255) + "," + rand(120, 255) + "," + rand(30, 100) / 100 + ")"
}

function drawStar() {
  for (let t = stars.length; t--;) {
    let a = stars[t];
    cftx.beginPath(), cftx.arc(a.x, a.y, a.size, 0, 2 * Math.PI, !0), cftx.fillStyle = a.color, cftx.closePath(),
      cftx.fill()
  }
}

function drawfromCache() {
  ctx.drawImage(cf, -cf.width / 2, -cf.height / 2)
}

function loop() {
  drawfromCache(), ++drawTimes > 150 && drawTimes % 8 == 0 && (ctx.fillStyle = "rgba(0,0,0,.04)", ctx.fillRect(-3 *
    longside, -3 * longside, 6 * longside, 6 * longside)), rotateCanvas(.025)
}

function rotateCanvas(t) {
  ctx.rotate(t * Math.PI / 180)
}
ctx.fillStyle = "rgba(21,21,21,1)", ctx.fillRect(0, 0, cw, ch), ctx.lineCap = "round";
for (let count = 2e4; count--;) createStar();
drawStar();
let x = centerX,
  y = centerY;

function fireAnimate() {
  requestAnimFrame(fireAnimate), loop()
}

function changeStar() {
  loop = function () {
    drawfromCache(), ++drawTimes > 150 && drawTimes % 8 == 0 && (ctx.fillStyle = "rgba(0,0,0,.04)", ctx.fillRect(
      -3 * longside, -3 * longside, 6 * longside, 6 * longside)), rotateCanvas(random(1, 100))
  }
}

function getMsg() {
  let t = ["你看那个人，Ta好像一条狗啊", "我佛了", "给时光以生命<br>给岁月以文明", "你好，请多指教", "当你在凝视着网页的时候<br>网页也正在凝视着你", "苟……", "ご注文はねこですか？",
      "平凡的日常正奇迹的发生着", "Lata<br>lulila<br>lulula<br>lulalila ♪♫", "ただの人間には<br>興味ありません！", "さあ、ゲームを始めよう",
      "搞事！搞事！搞事！", "敬畏之心！", "赞美之心！", "我很好奇！", "欢迎大家光临星象馆<br>这里有着无论何时永远不会消失<br>美丽的无穷光辉<br>满天的星星等候着大家的到来"
    ],
    a = random(0, t.length - 1);
  document.querySelector(".slogan").innerHTML = t[a]
}

function random(t, a) {
  let e = a - t,
    n = Math.random();
  return t + Math.round(n * e)
}
ctx.translate(x, y), fireAnimate(), window.onload = () => {
  getMsg()
}, window.onscroll = () => {
  //获取滚动高度
  let osTop = document.documentElement.scrollTop || document.body.scrollTop;
  //可视区域高度
  let clientHeight = document.documentElement.clientHeight; 
  let currentClassName = document.querySelector(".background").getAttribute("class")
  if(osTop > .6 * clientHeight){
    if(currentClassName.indexOf("fixed") > -1){
      return
    }
    let newClassName = currentClassName + " fixed"
    document.querySelector(".background").setAttribute("class", newClassName)
  }else{
    let newClassName = currentClassName.replace(" fixed", "")
    document.querySelector(".background").setAttribute("class", newClassName)
  }
}