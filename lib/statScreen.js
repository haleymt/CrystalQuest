(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var StatScreen = window.CrystalQuest.StatScreen = function (xDim, yDim, ctx, waveNum) {
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.ctx = ctx
    this.waveNum = waveNum
  };

  IntroView.prototype.render = function () {
    var timeTaken = $('#time').text();
    var seconds = (parseInt(timeTaken.split(":")[0]) / 60) + parseInt(timeTaken.split(":")[1])
    var timeBonus = (5000 / seconds) * 500
    str = "<menu id='controls'><p>Wave number " + this.waveNum + " completed</p><p>Time taken: " + timeTaken + "</p><p>Time bonus: " + timeBonus + "</menu>"
    $('#container').append(str)
  };

})();
