(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BasicAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 14;
    this.img = 'img/basic_alien_sp.png';
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BasicAlien, MovingObject);

  CrystalQuest.BasicAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);
      if (that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 500);
  };

})();
