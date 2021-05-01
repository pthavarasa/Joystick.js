let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let joystick, square;
joystick = new Joystick();
square = new Square();

const update = () => {
  joystick.update();
  square.update(joystick.heading, joystick.velocity);
  setTimeout(update, 30);
};

window.addEventListener("load", () => {
  update();
});

window.addEventListener("mousedown", () => joystick.mouseDownHandle());
window.addEventListener("mouseup", () => joystick.mouseUpHandle());
window.addEventListener("mousemove", (e) =>
  joystick.updateMousePos(e.clientX, e.clientY)
);
