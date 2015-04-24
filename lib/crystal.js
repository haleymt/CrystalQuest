(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Crystal = CrystalQuest.Crystal = function (options) {
    this.pos = options.pos;
    this.wave = options.wave;
    this.color = "#CCFFCC";
    this.width = 15;
  };

  Crystal.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.width);

    ctx.fill();
  };

})();
