(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.FourLegAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'four_leg_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.6, vel[1] * 0.6];
    }, 500);
    this.shootInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      var bulletVel = [
        vel[0] * 0.6, vel[1] * 0.6
      ];
      var bullet = new window.CrystalQuest.BulletAlien({
        pos: that.pos,
        vel: bulletVel,
        wave: that.wave
      });
      if (that.pos[0] > 12 && that.pos[0] < (780 - 12)) {
        that.wave.aliens.push(bullet);
      }
    }, 2000)
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.FourLegAlien, MovingObject);

})();
