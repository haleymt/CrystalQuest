(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.ShooterAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'shooter_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(5);
    }, 500);
    this.shootInterval = setInterval( function () {
      var bullet = new window.CrystalQuest.AlienBullet({
        pos: that.pos,
        vel: window.CrystalQuest.Util.randomVec(5),
        wave: that.wave
      });
      if (that.pos[0] > 12 && that.pos[0] < (780 - 12)) {
        that.wave.alienBullets.push(bullet);
      }
    }, 200)
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.ShooterAlien, MovingObject);

})();
