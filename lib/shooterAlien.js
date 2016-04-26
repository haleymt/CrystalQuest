(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  var ShooterAlien = CrystalQuest.ShooterAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/shooter_alien.png';
    this.bulletImg = 'img/alien_bullet1.png';
  };

  window.CrystalQuest.Util.inherits(ShooterAlien, MovingObject);

  ShooterAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);

      if (that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 500);

    this.shootInterval = setInterval( function () {
      var bulletVel = window.CrystalQuest.Util.randomVec(2);
      var bullet = new window.CrystalQuest.AlienBullet({
        pos: that.pos,
        vel: bulletVel,
        wave: that.wave,
        img: that.bulletImg
      });

      if (that.pos[0] > 12 && that.pos[0] < (780 - 12)) {
        that.wave.alienBullets.push(bullet);
      }

      if (that.wave.gameOver || that.wave.aliens.indexOf(that) < 0) {
        that.clearIntervals();
      }
    }, 500);
  };

})();
