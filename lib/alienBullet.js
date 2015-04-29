(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var MovingObject = window.CrystalQuest.MovingObject;
  var Wave = window.CrystalQuest.Wave;

  var AlienBullet = CrystalQuest.AlienBullet = function (options) {
    MovingObject.call(this, options);
    this.radius = 4;
    this.img = options.img;
  };

  window.CrystalQuest.Util.inherits(AlienBullet, MovingObject);
  CrystalQuest.AlienBullet.prototype.isBounceable = function () {
    return false;
  };

})();
