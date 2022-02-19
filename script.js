var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.lineWidth = "6";
ctx.strokeStyle = "red";
ctx.rect(5, 5, 80, 80);
ctx.stroke();
ctx.fillStyle = "red";
ctx.fill();
