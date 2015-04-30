(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Bomb = CrystalQuest.Bomb = function (options) {
    this.pos = options.pos;
    this.wave = options.wave;
    this.width = 15;
  };

  Bomb.prototype.draw = function(ctx) {
    var img = new Image();
    x = this.pos[0];
    y = this.pos[1];
    img.src = 'img/bomb.png';
    ctx.drawImage(img, x, y, 15, 15);
  };


})();
