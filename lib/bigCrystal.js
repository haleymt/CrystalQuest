(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  var BigCrystal = CrystalQuest.BigCrystal = function (options) {
    MovingObject.call(this, options);
    this.radius = 20;
    this.img = 'big_crystal.png';
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BigCrystal, MovingObject);

})();
