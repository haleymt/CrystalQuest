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
      that.vel = window.CrystalQuest.Util.randomVec(5);
    }, 500);
  };

  CrystalQuest.BasicAlien.prototype.clearDirInterval = function () {
    clearInterval(this.dirInterval);
    this.dirInterval = null;
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BasicAlien, MovingObject);


})();
