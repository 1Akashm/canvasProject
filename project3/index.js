document.addEventListener("DOMContentLoaded", function () {
  let img = new Image();
  img.crossOrigin = "anonymous"; // important for CORS
  img.src =
    "https://images.unsplash.com/photo-1755241113707-add12bc22e69?q=80&w=1156&auto=format&fit=crop";

  img.onload = function () {
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log("pixels",pixels);
    let particleArray = [];
    let maxParticle = 5000;
    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++) {
      let row = [];
      for (let x = 0; x < canvas.width; x++) {
        let index = (y * pixels.width + x) * 4;
        let red = pixels.data[index];
        let green = pixels.data[index + 1];
        let blue = pixels.data[index + 2];
        let brightness =
          Math.sqrt(
            red * red * 0.58 + green * green * 0.32 + blue * blue * 0.03
          ) / 255;

        row.push(brightness);
      }
      mappedImage.push(row);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 0.05;
        this.size = Math.random() * 1.5 + 1;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
      }
      update() {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.speed = mappedImage[this.position1][this.position2];

        this.movement = 2.5 - this.speed + this.velocity;

        this.y += this.movement;
        if (this.y >= canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#dfded2";
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < maxParticle; i++) {
        particleArray.push(new Particle());
      }
    }

    init();
    function animate() {
      //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.2;

      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        ctx.globalAlpha = particleArray[i].speed * 0.5;
        particleArray[i].draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    // let getImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // let scannedData = getImageData.data;
    // for (let i = 0; i < scannedData.length; i += 4) {
    //   let scannedValue =
    //     scannedData[i] + scannedData[i + 1] + scannedData[i + 3]; // the i indicates the red, i+1 indicates the green and i+2 indicates the blue for(rgb())
    //   // the 4 value from the getImageData() indicates the rgba() and we have took the i,i+1 and i+2 to get the rgb() of image and for converting
    //   //it to grayScale we have averageValue
    //   let averageValue = scannedValue / 3;

    //   scannedData[i] = averageValue;
    //   scannedData[i + 1] = averageValue;
    //   scannedData[i + 2] = averageValue;
    // }

    // getImageData.data = scannedData;
    // ctx.putImageData(getImageData, 0, 0);
  };
});
