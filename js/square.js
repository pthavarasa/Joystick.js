class Square {
  constructor(x = 0, y = 0) {
    this.squareSize = 20;
    this.squarePos = { x: x, y: x };
    this.speed = 10;

    this.heading = 0;
    this.velocity = 0;
    this.direction = "";
  }

  updateSquarePos() {
    if (this.direction == "E") this.squarePos.x += this.speed * this.velocity;
    else if (this.direction == "NE") {
      this.squarePos.x += this.speed * this.velocity;
      this.squarePos.y -= this.speed * this.velocity;
    } else if (this.direction == "N")
      this.squarePos.y -= this.speed * this.velocity;
    else if (this.direction == "NW") {
      this.squarePos.x -= this.speed * this.velocity;
      this.squarePos.y -= this.speed * this.velocity;
    } else if (this.direction == "W")
      this.squarePos.x -= this.speed * this.velocity;
    else if (this.direction == "SW") {
      this.squarePos.x -= this.speed * this.velocity;
      this.squarePos.y += this.speed * this.velocity;
    } else if (this.direction == "S")
      this.squarePos.y += this.speed * this.velocity;
    else if (this.direction == "SE") {
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

  update(heading, velocity, direction) {
    this.heading = heading;
    this.velocity = velocity;
    this.direction = direction;
    this.updateSquarePos();
    this.drawSquare();
  }
}
