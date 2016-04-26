(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BlobAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 20;
    this.img = 'img/blob_alien.png';
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BlobAlien, MovingObject);

  CrystalQuest.BlobAlien.prototype.startIntervals = function() {
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(1);
      if (that.wave.gameOver) {
        that.clearIntervals();
      }
    }, 500);
  };
})();
