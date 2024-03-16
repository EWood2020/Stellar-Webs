function setup() {
  createCanvas(1920, 1080); // HD resolution
  noLoop();
  pixelDensity(2); // Higher resolution for detailed output
  background(0); // Dark background to highlight the web-like structures
}

function draw() {
  let stellarWebStyle = {
    color: function(depth) {
      // Gradient from light blue to darker blue, symbolizing the vastness of space
      return lerpColor(color(173, 216, 230, 100), color(25, 25, 112, 100), depth / 10);
    },
    weight: function(depth) {
      // Thinner lines for a delicate web-like appearance
      return map(depth, 0, 10, 2, 0.5);
    },
    branches: 4, // Increased branches to create a more complex web
    angleOffset: function(i, depth) {
      // Even distribution of branches for a symmetrical web
      let baseAngle = TWO_PI / this.branches;
      return baseAngle * i;
    },
    lenShrink: 0.8 // Less shrinkage to maintain the web's structure
  };

  // Center the "Stellar Web" fractal on the canvas
  drawGalacticFractal(width / 2, height / 2, 120, -PI / 2, 10, stellarWebStyle);
}

function drawGalacticFractal(x, y, len, angle, depth, style) {
  if (depth === 0) return;

  let newX = x + cos(angle) * len;
  let newY = y + sin(angle) * len;

  stroke(style.color(depth));
  strokeWeight(style.weight(depth));
  line(x, y, newX, newY);

  if (depth > 1) {
    for (let i = 0; i < style.branches; i++) {
      let newAngle = angle + style.angleOffset(i, depth);
      drawGalacticFractal(newX, newY, len * style.lenShrink, newAngle, depth - 1, style);
    }
  }
}
