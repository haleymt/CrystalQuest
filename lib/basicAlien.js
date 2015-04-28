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
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BasicAlien, MovingObject);


})();
