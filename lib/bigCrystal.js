(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  var BigCrystal = CrystalQuest.BigCrystal = function (options) {
    MovingObject.call(this, options);
    this.radius = 20;
    this.img = 'big_crystal.png';
    this.num = Math.floor(Math.random() * (30000) + 2000);
  };

  window.CrystalQuest.Util.inherits(CrystalQuest.BigCrystal, MovingObject);

})();
