(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.XSAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/x_alien.png';
    this.bulletImg = 'img/alien_bullet3.png';
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.XSAlien, MovingObject);

  CrystalQuest.XSAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);
      if (that.wave.gameOver) {
        that.clearIntervals();
      }
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
      if (that.wave.gameOver || that.wave.indexOf(that) < 0) {
        that.clearIntervals();
      }
    }, 200);
  }
})();
