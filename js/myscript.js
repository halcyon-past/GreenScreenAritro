var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("finput1");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("can1");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("finput2");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("can2");
  bgImage.drawTo(bgCanvas);
}

function createComposite() {
  bgImage.setSize(fgImage.getWidth(),fgImage.getHeight())
  // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
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

function doGreenScreen() {
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
  }
  clearCanvas();
  var finalImage = createComposite();
  finalImage.drawTo(fgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d"); context.clearRect(0,0,canvas.width,canvas.height);
}