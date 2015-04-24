(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Game = window.CrystalQuest.Game = function (xDim, yDim, ctx) {
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.ctx = ctx;
    // this.waveWon = false;
    // this.waveLost = false;
  };

  Game.prototype.bindKeyHandlers = function(wave) {
    var ship = wave.ship
    key('up', function() { ship.power([0,-2]) });
    key('down', function() { ship.power([0,2]) });
    key('right', function () { ship.power([2,0]) });
    key('left', function () { ship.power([-2,0]) });
    key('r', function() { ship.power([0,0]) });
    key('space', function() { ship.fireBullet() });
  };

  Game.prototype.win = function(int) {
    clearInterval(int);
    var content = "<p style='color:white;'>You win</p><br><button id='next-level'>Next Level</button></menu>"
    $('#controls').append(content)
  };

  Game.prototype.lose = function(int) {
    clearInterval(int);
    var content = "<p style='color:white;'>You win</p><br><button id='next-level'>Next Level</button></menu>"
    $('#controls').append(content)
  };

  Game.prototype.run = function () {
    new window.CrystalQuest.IntroView(
      this.X_DIM,
      this.Y_DIM,
      this.ctx
    ).render();

    $('#start').click( function () {
      $('#controls').empty();
      var waveOne = new window.CrystalQuest.Wave(this.X_DIM, this.Y_DIM, this, Game.WAVE_ONE)
      var game = this

      var int = setInterval( function () {
        if (waveOne.step() === "lost" ) {
          game.lose(int);
        } else if (waveOne.step() === "won") {
          game.win(int);
        }
        waveOne.draw(this.ctx)
      }, 20)
      this.bindKeyHandlers(waveOne);
    }.bind(this))

    $('#next-level').click( function () {
      console.log("hi")
      $('#controls').empty();
    })

  };

  // OTHER PAGES: {
  //   intro: enter name, press start
  //   game over:
  //   high scores
  // }
  //
  //
  //
  // DEFAULT {
  //   bombs: 3
  //   lives: 2
  //   time
  //   score
  // }

  Game.WAVES = [
    Game.WAVE_ONE,
    Game.WAVE_TWO,
    Game.WAVE_THREE,
    Game.WAVE_FOUR,
    Game.WAVE_FIVE,
    Game.WAVE_SIX,
    Game.WAVE_SEVEN,
    Game.WAVE_EIGHT
  ];

  Game.WAVE_ONE = {
    numAsteroids: 0,
    numBombs: 0,
    numCrystals: 10,
    // kind_of_alien: no bullets
    numAliens: 4,
    numBigCrystals: 0,
    numPoints: 0
  };

  Game.WAVE_TWO = {
    numAsteroids: 0,
    numBombs: 0,
    numCrystals: 12,
    // kind_of_alien: no bullets
    numAliens: 1,
    numBigCrystals: 1,
    numPoints: 0
  };

  Game.WAVE_THREE = {
    numAsteroids: 2,
    numBombs: 0,
    numCrystals: 15,
    // kind_of_alien: bullets
    numAliens: 2,
    numBigCrystals: 1,
    numPoints: 0
  };

  Game.WAVE_FOUR = {
    numAsteroids: 5,
    numBombs: 0,
    numCrystals: 15,
    // kind_of_alien: bullets
    numAliens: 4,
    numBigCrystals: 0,
    numPoints: 2
  };

  Game.WAVE_FIVE = {
    numAsteroids: 5,
    numBombs: 1,
    numCrystals: 20,
    // kind_of_alien: n/a
    numAliens: 0,
    numBigCrystals: 0,
    numPoints: 0
  };

  Game.WAVE_SIX = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 20,
    // kind_of_alien: (2-3)blob, (1)no bullets
    numAliens: 3,
    numBigCrystals: 1,
    numPoints: 1
  };

  Game.WAVE_SEVEN = {
    numAsteroids: 10,
    numBombs: 0,
    numCrystals: 25,
    // kind_of_alien: computer
    numAliens: 1,
    numBigCrystals: 1,
    numPoints: 3
  };

  Game.WAVE_EIGHT = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 25,
    // kind_of_alien: (5)computer, (1)no bullets
    numAliens: 6,
    numBigCrystals: 0,
    numPoints: 3
  };

})();
