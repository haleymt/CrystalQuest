(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.ComputerAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/computer_alien.png';
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.ComputerAlien, MovingObject);

  CrystalQuest.ComputerAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(5);
      if (!that.wave || that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 500);
    this.hashInterval = setInterval( function () {
      var hash = new window.CrystalQuest.ComputerHash({
        pos: that.pos,
        wave: that.wave
      });
      if (that.pos[0] > 12 && that.pos[0] < (780 - 12) && that.wave) {
        that.wave.asteroids.push(hash);
      }
      if (!that.wave || that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 5000);
  }

})();
