(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BlobAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 20;
    this.img = 'blob_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.2, vel[1] * 0.2];
    }, 500);
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BlobAlien, MovingObject);


})();
