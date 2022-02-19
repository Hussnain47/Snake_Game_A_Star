var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

for (let i = 0; i < 10; i++) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.rect(5, 5, 80, 80);

  ctx.fill();
}
