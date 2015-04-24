(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;
  var Wave = window.CrystalQuest.Wave;
  var Bullet = window.CrystalQuest.Bullet;

  CrystalQuest.Ship = function (options) {
    // add to options....
    MovingObject.call(this, options);
    this.color = "#FFFFFF";
    this.radius = 12;
    this.vel = [0,0];
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.Ship, MovingObject);

  CrystalQuest.Ship.prototype.relocate = function() {
    this.pos = window.CrystalQuest.Wave.randomPosition(12);
    this.vel = [0,0];
  };

  CrystalQuest.Ship.prototype.power = function(impulse) {
    this.vel = impulse;
  };

  CrystalQuest.Ship.prototype.fireBullet = function() {
    var norm = CrystalQuest.Util.norm(this.vel);

    if (norm == 0) {
      return;
    }

    var relVel = CrystalQuest.Util.scale(
      CrystalQuest.Util.dir(this.vel),
      CrystalQuest.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new window.CrystalQuest.Bullet({
      pos: this.pos,
      vel: bulletVel,
      wave: this.wave
    });
    this.wave.bullets.push(bullet);
  };

  CrystalQuest.Ship.prototype.isBounceable = function () {
    leftSide = (780 / 2) - 30
    rightSide = (780 / 2) + 30
    if ((this.pos[0] <= rightSide) && (this.pos[0] >= leftSide) && (this.pos[1] > 0)) {
      return false;
    } else {
      return true;
    }
  };

})();
