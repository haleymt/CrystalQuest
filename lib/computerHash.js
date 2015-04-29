(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var ComputerHash = CrystalQuest.ComputerHash = function (options) {
    this.pos = options.pos;
    this.wave = options.wave;
    this.width = 15;
  };

  ComputerHash.prototype.draw = function(ctx) {
    var img = new Image();
    x = this.pos[0] - 7.5;
    y = this.pos[1] - 7.5;
    img.src = 'computer_hash.png';
    ctx.drawImage(img, x, y, 15, 15);
  };

})();
