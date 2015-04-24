(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var HighScores = window.CrystalQuest.HighScores = function (xDim, yDim, ctx) {
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.ctx = ctx;
  };

  HighScores.prototype.render = function () {
    
  };

})();
