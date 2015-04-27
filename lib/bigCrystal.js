(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var MovingObject = window.CrystalQuest.MovingObject;

  var BigCrystal = CrystalQuest.BigCrystal = function (options) {
    MovingObject.call(this, options);
    this.radius = 20;
    // this.vel = window.CrystalQuest.Util.randomVec(5); //arbitrary max length of vel vector
  };

  // BigCrystal.prototype.draw = function(ctx) {
  //   var img = new Image();
  //   x = this.pos[0];
  //   y = this.pos[1];
  //   img.src = 'big_crystal.png';
  //   ctx.drawImage(img, x, y, 30, 30);
  // }

  window.CrystalQuest.Util.inherits(CrystalQuest.BigCrystal, MovingObject);

})();
