(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Gate = CrystalQuest.Gate = function (options) {
    this.wave = options.wave;
    this.color = "#FFFFFF";
  };

  Gate.prototype.draw = function(ctx) {
    height = 500
    middle = (780 / 2)

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo((middle - 30), height);
    ctx.lineTo((middle - 60), height);
    ctx.lineTo((middle - 30), height - 20);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo((middle + 30), height);
    ctx.lineTo((middle + 60), height);
    ctx.lineTo((middle + 30), height - 20);
    ctx.fill();
  };


})();
