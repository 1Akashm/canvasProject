document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");

  let mouse = {
    x: undefined,
    y: undefined,
  };

  let maxRadius = 20;

  // track the mouse event
  function trackMouse(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  canvas.addEventListener("mouseenter", function (e) {
    canvas.addEventListener("mousemove", trackMouse);
    (mouse.x = undefined), (mouse.y = undefined);
  });

  canvas.addEventListener("mouseleave", function (e) {
    canvas.removeEventListener("mousemove", trackMouse);
    (mouse.x = undefined), (mouse.y = undefined);
  });

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  });

  function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;

    let randomColor = () => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      return `rgb(${r},${g},${b})`;
    };

    this.color = randomColor();

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // ctx.strokeStyle = "blue";
      // ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    this.update = function () {
      if (this.x >= innerWidth - this.radius || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y >= innerHeight - this.radius || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx; // can be used to control the velocity of x
      this.y += this.dy;

      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > 2) {
        this.radius -= 1;
      }
      this.draw();
    };
  }

  let circleArray = [];
  function init() {
    circleArray = [];
    for (let i = 0; i < 2000; i++) {
      let radius = Math.floor(Math.random() * 30) + 1;
      let x = Math.random() * (window.innerWidth - radius * 2) + radius;
      let dx = (Math.random() - 0.3) * 8;
      let y = Math.random() * (window.innerHeight - radius * 2) + radius;
      let dy = (Math.random() - 0.3) * 8;

      circleArray.push(new Circle(x, y, radius, dx, dy));
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }
  init();
  animate();
});
