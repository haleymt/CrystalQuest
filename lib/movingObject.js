(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var Asteroid = window.CrystalQuest.Asteroid;
  var Portal = window.CrystalQuest.Portal;
  var BigCrystal = window.CrystalQuest.BigCrystal;
  var BasicAlien = window.CrystalQuest.BasicAlien;

  var MovingObject = window.CrystalQuest.MovingObject = function ( obj ) {
      this.pos = obj['pos'];
      this.vel = obj['vel'];
      this.radius = obj['radius'];
      this.color = obj['color'];
      this.wave = obj['wave'];
  };

  MovingObject.prototype.draw = function(ctx) {
    if (this instanceof CrystalQuest.BlobAlien) {
      var x = this.pos[0];
      var y = this.pos[1];
      var img = new Image();
      img.src = this.img;
      var count = Math.floor(this.wave.counter / 16);
      var xoff = (count % 4) * 100;

      ctx.drawImage(
        img,
        xoff,0,100,100,
        x,y,50, (this.radius * 3)
      );
    } else if (this instanceof CrystalQuest.BasicAlien) {
        var x = this.pos[0] - this.radius;
        var y = this.pos[1] - this.radius;
        var img = new Image();
        img.src = this.img;
        var count = Math.floor(this.wave.counter / 24);
        var xoff = (count % 2) * 100;

        ctx.drawImage(
          img,
          xoff,0,100,100,
          x,y,(this.radius * 2), (this.radius * 2)
        );
    } else if (this.img !== undefined) {
      var img = new Image();
      x = this.pos[0] - this.radius;
      y = this.pos[1] - this.radius;
      img.src = this.img;
      ctx.drawImage(img, x, y, this.radius * 2, this.radius * 2);
    } else {
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
    }
  };

  MovingObject.prototype.isBounceable = function () {
    return true;
  };

  MovingObject.prototype.move = function() {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if ((newPos[0] - this.radius < 0) || (newPos[1] - this.radius < 0) || (newPos[0] + this.radius > 780) || (newPos[1] + this.radius > 500)) {
      if (this.isBounceable()) {
        this.wave.bounce(this);
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
      } else if (this instanceof CrystalQuest.Ship) {
        this.pos = newPos
      } else {
        var collection = this instanceof CrystalQuest.AlienBullet ? this.wave.alienBullets : this.wave.bullets;
        this.wave.remove(collection, this);
      }
    } else {
      this.pos = newPos
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject, pos, rad) {
    var coords = pos || this.pos;
    var radius = rad || this.radius;
    if (otherObject instanceof CrystalQuest.Portal) {
      var xRightPos = coords[0] - 780;
      var xLeftPos = coords[0] - 0;
      var yPos = coords[1] - (500 / 2);
      var rightDist = Math.pow((Math.pow(xRightPos, 2) + Math.pow(yPos, 2)), (1/2));
      var leftDist = Math.pow((Math.pow(xLeftPos, 2) + Math.pow(yPos, 2)), (1/2));

      if ((rightDist < radius + otherObject.width) || (leftDist < radius + otherObject.width)) {
        return true;
      }
    } else if ((otherObject instanceof CrystalQuest.Crystal) || (otherObject instanceof CrystalQuest.Points)){
      var xPos = coords[0] - otherObject.pos[0];
      var yPos = coords[1] - otherObject.pos[1];
      var dist = Math.pow((Math.pow(xPos, 2) + Math.pow(yPos, 2)), (1/2));

      if (dist < radius + (otherObject.width / 2)) {
        return true;
      }
    } else if (otherObject && otherObject.width !== undefined) {
      var xPos = coords[0] - otherObject.pos[0] - (otherObject.width / 2);
      var yPos = coords[1] - otherObject.pos[1] - (otherObject.width / 2);
      var dist = Math.pow((Math.pow(xPos, 2) + Math.pow(yPos, 2)), (1/2));

      if (dist < radius + (otherObject.width / 2)) {
        return true;
      }
    } else if (otherObject) {
      var xPos = coords[0] - otherObject.pos[0];
      var yPos = coords[1] - otherObject.pos[1];
      var dist = Math.pow((Math.pow(xPos, 2) + Math.pow(yPos, 2)), (1/2));

      if (dist < radius + otherObject.radius) {
        return true;
      }
    }
  };

  MovingObject.prototype.clearIntervals = function() {
    clearInterval(this.dirInterval);
    this.dirInterval = null;
    clearInterval(this.shootInterval);
    this.shootInterval = null;
    clearInterval(this.hashInterval);
    this.hashInterval = null;
  };

})();
