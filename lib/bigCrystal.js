(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  CrystalQuest.BigCrystal = function (options) {
    // add to options....
    MovingObject.call(this, options);
    this.color = "#FFCCCC";
    this.radius = 15;
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BigCrystal, MovingObject);


})();
