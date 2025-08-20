document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let ctx = canvas.getContext("2d");

  let running = false;
  let mouse = {
    x: undefined,
    y: undefined,
  };

  canvas.addEventListener("mousemove", function (e) {
    // let radius = 30;
    // let x = e.clientX;
    // let y = e.clientY;
    // let dy = 0;
    // let gravity = 0.98;
    // let bounce = Math.abs(Math.random() - 0.35);
    // circleArray.push(new Circle(x, y, dy, radius, gravity, bounce));
  });

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  });

  function Circle(x, y, dy, radius, gravity, bounce) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.gravity = gravity;
    this.bounce = bounce;

    let randomColor = () => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      return `rgb(${r},${g},${b})`;
    };

    this.color = randomColor();

    this.draw = function () {
      ctx.beginPath();
      //Math.PI *2 is required for full circle
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    this.update = function () {
      this.dy += this.gravity;
      if (this.y + this.radius + this.dy > innerHeight && this.dy > 0) {
        this.y = innerHeight - this.radius; // prevent sinking
        this.dy = -this.dy * this.bounce; // reverse and reduce velocity

        if (Math.abs(this.dy) < 0.5) {
          this.dy = 0;
          this.y = innerHeight - this.radius;
        }
      }

      this.y += this.dy;
      this.draw();
    };
  }

  //   let circle = new Circle(x, y, dy, radius, gravity, bounce);

  let circleArray;
  function init() {
    circleArray = [];
    for (let i = 0; i < 500; i++) {
      let radius = 30;
      let x = Math.random() * (window.innerWidth - radius);
      let y = Math.random() * (window.innerHeight - radius);
      let dy = 0;
      let gravity = 0.98;
      let bounce = 0.6;

      circleArray.push(new Circle(x, y, dy, radius, gravity, bounce));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  init();
  animate();
});
