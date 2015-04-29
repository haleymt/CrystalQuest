(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  CrystalQuest.CrystalPoints = function (options) {
    this.pos = options.pos;
    this.wave = options.wave;
    this.num = options.num;
    this.width = 20;
  };

  CrystalQuest.CrystalPoints.prototype.draw = function(ctx) {
    ctx.fillStyle = "yellow";
    ctx.font = "10pt Arial";
    ctx.fillText(this.num, this.pos[0], this.pos[1]);
    ctx.fill();
  };

})();
