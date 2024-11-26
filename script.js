// إعدادات الرسم
const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = 500;

let painting = false;
let brushColor = "#ff69b4";
let brushSize = 10;

// وظائف الرسم
function startPainting(e) {
  painting = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopPainting() {
  painting = false;
  ctx.closePath();
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = brushColor;
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// التحكم بالأدوات
const colorPicker = document.getElementById("color-picker");
const brushSizeInput = document.getElementById("brush-size");
const clearButton = document.getElementById("clear-canvas");
const saveButton = document.getElementById("save-canvas");

colorPicker.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

brushSizeInput.addEventListener("input", (e) => {
  brushSize = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "رسمتي.png";
  link.href = canvas.toDataURL();
  link.click();
});

// أحداث الرسم
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mousemove", draw);
