(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.ComputerAlien = function (options) {
    MovingObject.call(this, options);
    this.radius = 12;
    this.img = 'computer_alien.png';
    var that = this;
    this.dirInterval = setInterval( function () {
      that.vel = window.CrystalQuest.Util.randomVec(5);
    }, 500);
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.ComputerAlien, MovingObject);


})();
