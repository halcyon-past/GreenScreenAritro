
// Initializing Variables
var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;
var r = document.querySelector('.buttondwn');
r.disabled = true;


//Loading Foreground Image
function loadForegroundImage() {
  var file = document.getElementById("finput1");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("can1");
  fgImage.drawTo(fgCanvas);
}

//Loading Background Image
function loadBackgroundImage() {
  var file = document.getElementById("finput2");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("can2");
  bgImage.drawTo(bgCanvas);
}

//Creating Final Image
function createComposite() {
  bgImage.setSize(fgImage.getWidth(),fgImage.getHeight())
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > pixel.getRed()+pixel.getBlue()) {
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

//Drawing the final image to the canvas
function doGreenScreen() {
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
  }
  clearCanvas();
  var finalImage = createComposite();
  console.log("drawing to canvas");
  finalImage.drawTo(fgCanvas);
  console.log("drawn to canvas");
  r.disabled = false;
  r.style.setProperty('--color', '#6eff3e');
  r.style.setProperty('cursor', 'pointer');
}

//Clearing both canvas
function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

//Clearing the canvas
function doClear(canvas) {
  var context = canvas.getContext("2d"); context.clearRect(0,0,canvas.width,canvas.height);
}

function download(){
  var canvas = document.getElementById("can1");
  image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "merged-image.png";
  link.href = image;
  link.click();
}