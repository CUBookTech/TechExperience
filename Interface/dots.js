function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

function fillSpace(hi) {
    if (hi.length == 1) {
        return "0"+hi;
    }
    return hi;
}


function clrToHex(r, g, b) {
    var str = "";
    var rstr = Math.floor(r).toString(16);
    var gstr = Math.floor(g).toString(16);
    var bstr = Math.floor(b).toString(16);
    
    str = rstr + gstr + bstr;

    return "#"+str;   
}


class dotGrid {
  constructor(container = "sketch") {
    this.canvasElement = document.getElementById(container);

    // Get the device pixel ratio, falling back to 1.
    this.dpr = window.devicePixelRatio || 1;

    this.drawable = this.canvasElement.getBoundingClientRect();

    this.canvasWidth = this.drawable.width * this.dpr;
    this.canvasHeight = this.drawable.height * this.dpr;

    this.canvasElement.width = this.canvasWidth;
    this.canvasElement.height = this.canvasHeight;

    this.mouseX = 0;
    this.mouseY = 0;

    // Setup Canvas
    this.canvas = this.canvasElement.getContext("2d");
    this.canvas.scale(this.dpr, this.dpr);
  }

  onMouseUpdate(e) {
    this.mouseX = e.pageX - this.drawable.left;
    this.mouseY = e.pageY - this.drawable.top;

    window.requestAnimationFrame(this.draw.bind(this));
  }

  init() {
    window.requestAnimationFrame(this.draw.bind(this));
    // Listen for Mouse updates
    document.body.addEventListener(
      "mousemove",
      this.onMouseUpdate.bind(this),
      false
    );
  }

  // Draws the background and calls the function for drawing the dots
  draw() {
    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawDots();
  }

  /*
  ((j - this.mouseY) / dist * 4)
  */

  // i and j function as x and y when drawing the dot grid.
  drawDots() {
    let size = 1;
    let gridSize = 20;
    for (var i = 2; i < this.canvasWidth / this.dpr / gridSize - 1; i++) {
      for (var j = 2; j < this.canvasHeight / this.dpr / gridSize - 1; j++) {
        let x = i * gridSize;
        let y = j * gridSize;
        let dist = this.pythag(x, y, this.mouseX, this.mouseY);
        this.canvas.beginPath();
        this.canvas.arc(
          x + (x - this.mouseX) / dist * gridSize,
          y + (y - this.mouseY) / dist * gridSize,
          size,
          size,
          Math.PI,
          true
        );

        var distShift = clamp(dist / 100, 1, 999);
        var redShift = 255 - (48/distShift);
        var greenShift = 255 - (71/distShift);
        var blueShift = 255 - (83 / distShift);

        this.canvas.fillStyle = "#FFFF"+Math.floor(blueShift).toString(16);//"#"+Math.floor(redShift).toString(16)+Math.floor(greenShift).toString(16)+Math.floor(blueShift).toString(16);//clrToHex(redShift, greenShift, blueShift);
        this.canvas.fill();
      }
    }
  }

  // Grabs mouse position, checks if the mouse is off the screen (NaN) and calculates the distance from the mouse pointer and each dot using the pythagorean theorem.
  pythag(ellipseX, ellipseY, mouseX, mouseY) {
    let x = mouseX;
    let y = mouseY;

    if (x == NaN) {
      return 1;
    } else {
      let leg1 = Math.abs(x - ellipseX);
      let leg2 = Math.abs(y - ellipseY);
      let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
      return Math.sqrt(pyth);
    }
  }
}

const grid = new dotGrid("sketch");
grid.init();
