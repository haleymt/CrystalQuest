(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.ShooterAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/shooter_alien.png';
    this.bulletImg = 'img/alien_bullet1.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);
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
    }, 500)
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.ShooterAlien, MovingObject);

})();
