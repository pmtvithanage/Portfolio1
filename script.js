document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const msgPara = document.getElementById("formMsg");

  if (name && email && message) {
    msgPara.textContent = "Thank you for your message, " + name + "!";
    msgPara.style.color = "green";
  } else {
    msgPara.textContent = "Please fill in all fields.";
    msgPara.style.color = "red";
  }

  // Reset form after submission
  this.reset();
});

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 250;

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Initialize stars with random positions
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width
  });
}

// Animation loop
function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  for (let i = 0; i < numStars; i++) {
    const star = stars[i];
    star.z -= 2;
    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }

    const k = 128.0 / star.z;
    const px = star.x * k + canvas.width / 2;
    const py = star.y * k + canvas.height / 2;

    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      const size = (1 - star.z / canvas.width) * 3;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  requestAnimationFrame(drawStars);
}
drawStars();