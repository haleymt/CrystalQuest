(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  // var GameView = window.CrystalQuest.GameView = function (xDim, yDim, ctx) {
  //   this.Wave = new window.CrystalQuest.Wave(xDim, yDim);
  //   this.ctx = ctx;
  // };

  var GameView = window.CrystalQuest.GameView = function (ctx, wave) {
    this.Wave = wave;
    this.ctx = ctx;
    this.won = false;
    this.lost = false;
  };

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.Wave.ship
    key('up', function() { ship.power([0,-2]) });
    key('down', function() { ship.power([0,2]) });
    key('right', function () { ship.power([2,0]) });
    key('left', function () { ship.power([-2,0]) });
    key('r', function() { ship.power([0,0]) });
    key('space', function() { ship.fireBullet() });
  };

  GameView.prototype.win = function(int) {
    clearInterval(int);
    this.won = true
  };

  GameView.prototype.lose = function(int) {
    clearInterval(int);
    this.lost = true
  };

  GameView.prototype.start = function() {
    var gameView = this;
    var int = setInterval(function() {
      // gameView.Wave.step();
      if (gameView.Wave.step() === "lost") {
        gameView.lose(int);
        console.log("hi")
      }
      gameView.Wave.draw(gameView.ctx);
    }, 20);
    gameView.bindKeyHandlers();
    // if (gameView.Wave.step() === "won") {
    //   return "won";
    // } else if (gameView.Wave.step() === "lost") {
    //   console.log("hi")
    //   return "lost"
    // }
    // if (this.lost) {
    //   console.log("hi")
    // }
  };


})();
