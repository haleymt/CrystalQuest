(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BlobAlien = function (options) {
    // add to options....
    MovingObject.call(this, options);
    this.radius = 20;
    this.img = 'blob_alien.png';
    this.counter = 0;
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.1, vel[1] * 0.1];
    }, 500);
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BlobAlien, MovingObject);


})();
