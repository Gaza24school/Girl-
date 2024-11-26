// إعدادات الرسم
const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let painting = false;
let brushColor = "#ff69b4";
let brushSize = 5;

// بدء الرسم
function startPosition(e) {
  painting = true;
  draw(e);
}

// إيقاف الرسم
function endPosition() {
  painting = false;
  ctx.beginPath();
}

// الرسم
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

// أدوات التحكم
const colorPicker = document.getElementById("color-picker");
const brushSizeInput = document.getElementById("brush-size");
const clearButton = document.getElementById("clear-canvas");

colorPicker.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

brushSizeInput.addEventListener("input", (e) => {
  brushSize = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// أحداث الرسم
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);