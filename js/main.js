let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let joystick, square;
joystick = new Joystick();
square = new Square();

const update = () => {
  joystick.update();
  square.update(joystick.heading, joystick.velocity, joystick.direction);
  setTimeout(update, 10);
};

window.addEventListener("load", () => {
  update();
});

/**
 * Handle joystick with mouse
 */
window.addEventListener("mousedown", () => joystick.mouseDownHandle());
window.addEventListener("mouseup", () => joystick.mouseUpHandle());
window.addEventListener("mousemove", (e) =>
  joystick.updateMousePos(e.clientX, e.clientY)
);

/**
 * Handle joystick with touch(mobile)
 */
window.addEventListener("touchstart", () => joystick.mouseDownHandle(), false);
window.addEventListener("touchend", () => joystick.mouseUpHandle(), false);
window.addEventListener(
  "touchmove",
  (e) =>
    joystick.updateMousePos(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    ),
  false
);
