(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Asteroid = CrystalQuest.Asteroid = function (options) {
    this.pos = options.pos;
    this.wave = options.wave;
    this.color = "#FF7519";
    this.width = 20;
  };

  Asteroid.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.width);

    ctx.fill();
  };


})();
