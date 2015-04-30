(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.XSAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'x_alien.png';
    this.bulletImg = 'alien_bullet3.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.6, vel[1] * 0.6];
    }, 500);
    this.shootInterval = setInterval( function () {
      var bulletVel = [
        that.vel[0] * 2, that.vel[1] * 2
      ];
      var bullet = new window.CrystalQuest.AlienBullet({
        pos: that.pos,
        vel: bulletVel,
        wave: that.wave,
        img: that.bulletImg
      });
      if (that.pos[0] > 12 && that.pos[0] < (780 - 12)) {
        that.wave.alienBullets.push(bullet);
      }
    }, 200)
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.XSAlien, MovingObject);

})();
