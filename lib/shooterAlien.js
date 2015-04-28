(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.ShooterAlien = function (options) {
    // add to options....
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'shooter_alien.png';
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  CrystalQuest.ShooterAlien.prototype.fireBullet = function() {
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


  window.CrystalQuest.Util.inherits(CrystalQuest.ShooterAlien, MovingObject);

})();
