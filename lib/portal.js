(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Portal = CrystalQuest.Portal = function (options) {
    this.color = "#BF3EFF";
    this.wave = options.wave;
    this.height = 60;
    this.width = 30;
  };

  Portal.RIGHT_POS = [500, ((500/ 2) - 30)];
  Portal.LEFT_POS = [0, ((500 /2) - 30)];

  Portal.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(Portal.LEFT_POS[0], Portal.LEFT_POS[1], 30, 60);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.fillRect(Portal.RIGHT_POS[0], Portal.RIGHT_POS[1], -30, 60);
    ctx.fill();
  };



})();
