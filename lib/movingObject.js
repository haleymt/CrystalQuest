(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var Asteroid = window.CrystalQuest.Asteroid;
  var Portal = window.CrystalQuest.Portal;

  var MovingObject = window.CrystalQuest.MovingObject = function ( obj ) {
      this.pos = obj['pos'];
      this.vel = obj['vel'];
      this.radius = obj['radius'];
      this.color = obj['color'];
      this.wave = obj['wave'];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isBounceable = function () {
    return true;
  };

  MovingObject.prototype.move = function() {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if ((newPos[0] < 0) || (newPos[1] < 0) || (newPos[0] > 500) || (newPos[1] > 500)) {
      if (this.isBounceable()) {
        this.wave.bounce(this);
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
      } else if (this instanceof CrystalQuest.Ship) {
        this.pos = newPos
      } else {
        this.wave.remove(this);
      }
    } else {
      this.pos = newPos
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    if (otherObject instanceof CrystalQuest.Portal) {
      var xRightPos = this.pos[0] - 500;
      var xLeftPos = this.pos[0] - 0;
      var yPos = this.pos[1] - (500 / 2);
      var rightDist = Math.pow((Math.pow(xRightPos, 2) + Math.pow(yPos, 2)), (1/2));
      var leftDist = Math.pow((Math.pow(xLeftPos, 2) + Math.pow(yPos, 2)), (1/2));

      if ((rightDist < this.radius + otherObject.width) || (leftDist < this.radius + otherObject.width)) {
        return true;
      }
    } else {
      var xPos = this.pos[0] - otherObject.pos[0];
      var yPos = this.pos[1] - otherObject.pos[1];
      var dist = Math.pow((Math.pow(xPos, 2) + Math.pow(yPos, 2)), (1/2));

      if ((otherObject.width !== undefined) && (dist < this.radius + otherObject.width)) {
        return true;
      } else if (dist < this.radius + otherObject.radius) {
        return true;
      }
    }
  };

})();
