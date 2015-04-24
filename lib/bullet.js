(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var MovingObject = window.CrystalQuest.MovingObject;
  var Wave = window.CrystalQuest.Wave;

  var Bullet = CrystalQuest.Bullet = function (options) {
    MovingObject.call(this, options);
    this.color = "#FFFFFF";
    this.radius = 3;
  };

  Bullet.SPEED = 3;

  window.CrystalQuest.Util.inherits(Bullet, MovingObject);
  CrystalQuest.Bullet.prototype.isBounceable = function () {
    return false;
  };


})();
