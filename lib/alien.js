(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.Alien = function (options) {
    // add to options....
    MovingObject.call(this, options);
    this.color = "#00FF00";
    this.radius = 7;
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.Alien, MovingObject);


})();
