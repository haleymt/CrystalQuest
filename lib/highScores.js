(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var HighScores = window.CrystalQuest.HighScores = function () {
    // this.X_DIM = xDim;
    // this.Y_DIM = yDim;
    // this.ctx = ctx;
  };

  HighScores.prototype.render = function () {
    str = "<menu id='controls'><h1>HIGH SCORES</h1><br><button id='start-menu'>Back to Start Menu</button></menu>"
    $('#container').append(str);
  };

})();
