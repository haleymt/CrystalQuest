(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BasicAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'img/basic_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      var vel = window.CrystalQuest.Util.randomVec(5);
      that.vel = [vel[0] * 0.6, vel[1] * 0.6];
    }, 500);
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BasicAlien, MovingObject);


})();
