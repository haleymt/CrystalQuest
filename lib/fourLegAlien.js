(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.FourLegAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/four_leg_alien.png';
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.FourLegAlien, MovingObject);

  CrystalQuest.FourLegAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);
      if (that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 500);

    this.shootInterval = setInterval( function () {
      var bulletVel = window.CrystalQuest.Util.randomVec(3);
      var bullet = new window.CrystalQuest.BulletAlien({
        pos: that.pos,
        vel: bulletVel,
        wave: that.wave
      });
      if (that.pos[0] > 12 && that.pos[0] < (780 - 12)) {
        that.wave.aliens.push(bullet);
      }
      if (that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 2000);
  }
})();
