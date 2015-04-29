(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BasicAlien = function (options) {
    // add to options....
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'basic_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.6, vel[1] * 0.6];
    }, 500);
  };

  // CrystalQuest.BasicAlien.prototype.clearDirInterval = function () {
  //   clearInterval(this.dirInterval);
  //   this.dirInterval = null;
  // };

  window.CrystalQuest.Util.inherits(CrystalQuest.BasicAlien, MovingObject);


})();
