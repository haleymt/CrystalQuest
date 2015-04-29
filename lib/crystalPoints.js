(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Points = CrystalQuest.CrystalPoints = function (options) {
    this.pos = options.pos;
    this.wave = options.wave;
    this.num = Math.floor(Math.random() * (9000) + 1000);
    this.width = 20;
  };

  CrystalPoints.prototype.draw = function(ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12pt Arial";
    ctx.fillText(this.num, this.pos[0], this.pos[1]);
  };

})();
