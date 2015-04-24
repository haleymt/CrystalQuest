(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var IntroView = window.CrystalQuest.IntroView = function (xDim, yDim, ctx) {
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.ctx = ctx
  };

  IntroView.prototype.render = function () {
    str = "<menu id='controls'><p>Play CRYSTAL QUEST</p><br><button id='start'>Start</button></menu>"
    $('#container').append(str)
  };

})();
