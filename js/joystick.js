class Joystick {
  constructor(x = cnv.width / 2, y = cnv.height / 2) {
    this.position = { x: x, y: y };
    this.outlineWidth = 110;
    this.outlineGap = 10;
    this.centerLineWidth = 20;

    this.buttonWidth = 30;
    this.buttonPos = { x: this.position.x, y: this.position.y };
    this.buttonDrag = false;

    this.mouseDown = false;
    this.mousePos = { x: 0, y: 0 };

    this.heading = 0;
    this.velocity = 0;
    this.direction = "";
  }

  drawLines(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.outlineWidth, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p.x, p.y, this.outlineWidth + this.outlineGap, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p.x, p.y, this.centerLineWidth, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawButton(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.buttonWidth, 0, 2 * Math.PI);
    ctx.fill();
  }

  drawDetailes() {
    ctx.font = "10px Arial";
    ctx.fillText("Heading : " + this.heading, 10, 10);
    ctx.fillText("Velocity : " + this.velocity, 10, 20);
    ctx.fillText("Direction : " + this.direction, 10, 30);
  }

  getAngle(p1, p2) {
    let dy = p2.y - p1.y;
    let dx = p2.x - p1.x;
    let theta = Math.atan2(dy, dx);
    theta *= -(180 / Math.PI);
    return theta;
  }

  updateDetailes() {
    this.velocity = parseFloat(
      (
        Math.round(this.distance(this.position, this.buttonPos)) /
        this.outlineWidth
      ).toFixed(4)
    );
    let theta = this.getAngle(this.position, this.buttonPos);
    if (theta < 0) theta = 360 + theta;
    this.heading = Math.round(theta);
  }

  updateDirection() {
    if (!this.velocity) this.direction = "";
    else if (this.heading >= 338 || this.heading < 22) this.direction = "E";
    else if (this.heading >= 22 && this.heading < 67) this.direction = "NE";
    else if (this.heading >= 67 && this.heading < 112) this.direction = "N";
    else if (this.heading >= 112 && this.heading < 157) this.direction = "NW";
    else if (this.heading >= 157 && this.heading < 202) this.direction = "W";
    else if (this.heading >= 202 && this.heading < 247) this.direction = "SW";
    else if (this.heading >= 247 && this.heading < 292) this.direction = "S";
    else if (this.heading >= 297 && this.heading < 338) this.direction = "SE";
  }

  updateMousePos(x, y) {
    this.mousePos.x = x;
    this.mousePos.y = y;
  }

  updateButtonPos(x, y) {
    this.buttonPos.x = x;
    this.buttonPos.y = y;
  }

  mouseDownHandle() {
    this.mouseDown = true;
  }

  mouseUpHandle() {
    this.mouseDown = false;
    this.buttonDrag = false;
  }

  distance(p1, p2) {
    return Math.sqrt(
      (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    );
  }

  getPointInLine(p1, p2, distance) {
    let dLine = this.distance(p1, p2);
    let ratio = distance / dLine;
    let x = p1.x + ratio * (p2.x - p1.x);
    let y = p1.y + ratio * (p2.y - p1.y);
    return { x: x, y: y };
  }

  moveButton() {
    if (
      this.mouseDown &&
      this.distance(this.position, this.mousePos) <= this.centerLineWidth
    ) {
      this.buttonDrag = true;
    }
    if (this.buttonDrag) {
      if (this.distance(this.position, this.mousePos) <= this.outlineWidth) {
        this.updateButtonPos(this.mousePos.x, this.mousePos.y);
      } else {
        let newPos = this.getPointInLine(
          this.position,
          this.mousePos,
          this.outlineWidth
        );
        this.updateButtonPos(newPos.x, newPos.y);
        this.drawShadow();
      }
    } else {
      this.updateButtonPos(this.position.x, this.position.y);
    }
  }

  draw() {
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.fillStyle = "rgba(48,48,48,1)";
    this.drawLines(this.position);
    this.drawButton(this.buttonPos);
  }

  drawShadow() {
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.fillStyle = "rgba(48,48,48,0.2)";
    this.drawLines(
      this.getPointInLine(
        this.position,
        this.mousePos,
        this.distance(this.position, this.mousePos) - this.outlineWidth
      )
    );
    this.drawButton(this.mousePos);
  }

  update() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    this.moveButton();
    this.updateDetailes();
    this.draw();
    this.drawDetailes();
    this.updateDirection();
    //console.log("mouseDown : ", this.mouseDown);
    //console.log("mousePos : ", this.mousePos);
  }
}
