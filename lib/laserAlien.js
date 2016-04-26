(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.LaserAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/laser_alien.png';
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.LaserAlien, MovingObject);

  CrystalQuest.LaserAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);
      if (that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 500);
    // this.laserInterval = ...to write...
  };
})();
