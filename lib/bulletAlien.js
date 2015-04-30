(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BulletAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 7;
    this.img = 'img/bullet_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(4);
    }, 800);
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BulletAlien, MovingObject);

})();
