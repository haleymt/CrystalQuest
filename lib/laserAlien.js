(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.LaserAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/laser_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.6, vel[1] * 0.6];
    }, 500);
    // this.laserInterval = ...to write...
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.LaserAlien, MovingObject);

})();
