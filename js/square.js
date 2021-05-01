class Square {
  constructor(x = 0, y = 0) {
    this.squareSize = 20;
    this.squarePos = { x: x, y: x };
    this.speed = 20;

    this.heading = 0;
    this.velocity = 0;
  }

  updateSquarePos() {
    if (this.heading >= 338 || this.heading < 22)
      this.squarePos.x += this.speed * this.velocity;
    else if (this.heading >= 22 && this.heading < 67) {
      this.squarePos.x += this.speed * this.velocity;
      this.squarePos.y -= this.speed * this.velocity;
    } else if (this.heading >= 67 && this.heading < 112)
      this.squarePos.y -= this.speed * this.velocity;
    else if (this.heading >= 112 && this.heading < 157) {
      this.squarePos.x -= this.speed * this.velocity;
      this.squarePos.y -= this.speed * this.velocity;
    } else if (this.heading >= 157 && this.heading < 202)
      this.squarePos.x -= this.speed * this.velocity;
    else if (this.heading >= 202 && this.heading < 247) {
      this.squarePos.x -= this.speed * this.velocity;
      this.squarePos.y += this.speed * this.velocity;
    } else if (this.heading >= 247 && this.heading < 292)
      this.squarePos.y += this.speed * this.velocity;
    else if (this.heading >= 297 && this.heading < 338) {
      this.squarePos.x += this.speed * this.velocity;
      this.squarePos.y += this.speed * this.velocity;
    }

    /**
     * Handle square overflow from screen
     */
    if (this.squarePos.x < 0) this.squarePos.x = 0;
    if (this.squarePos.y < 0) this.squarePos.y = 0;
    if (this.squarePos.x > cnv.width - this.squareSize)
      this.squarePos.x = cnv.width - this.squareSize;
    if (this.squarePos.y > cnv.height - this.squareSize)
      this.squarePos.y = cnv.height - this.squareSize;
  }

  drawSquare() {
    ctx.rect(
      this.squarePos.x,
      this.squarePos.y,
      this.squareSize,
      this.squareSize
    );
    ctx.fill();
  }

  update(heading, velocity) {
    this.heading = heading;
    this.velocity = velocity;
    this.updateSquarePos();
    this.drawSquare();
  }
}
