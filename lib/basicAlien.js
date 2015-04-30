(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BasicAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 14;
    this.img = 'img/basic_alien_sp.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(3);
    }, 500);
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BasicAlien, MovingObject);

})();
