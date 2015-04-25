(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Game = window.CrystalQuest.Game = function (xDim, yDim, ctx) {
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.ctx = ctx;
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

  Game.prototype.stop = function() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  Game.prototype.win = function() {
    this.stop()
    var content = "<p style='color:white;'>You Win!</p><br><button id='next-level'>Next Level</button></menu>"
    $('#controls').append(content)
  };

  Game.prototype.lose = function() {
    this.stop();
    var content = "<p style='color:white;'>You Lose</p><br><button id='start'>Start Over</button><button id='start-menu'>Exit</button></menu>"
    $('#controls').append(content)
  };

  Game.prototype.showIntro = function () {
    $('#status-bar').empty();
    str = "<p>Play CRYSTAL QUEST</p><br><button id='start'>Start</button>"
    $('#controls').append(str);
  };

  Game.prototype.run = function () {
    // this.counter = 0;

    this.showIntro();
    $('#controls').on('click', '#start', function () {
      this.counter = 0;
      $('#controls').empty();
      $('#status-bar').append('<ul><li>Score: <t id="score">0</t></li><li id="lives"><img src="./life.png" width="25"><img src="./life.png" width="25"><t id="life-count"></t></li><li id="bombs"><img src="./bomb.png" height="15"><img src="./bomb.png" height="15"><img src="./bomb.png" height="15"><t id="bomb-count"></t></li><li>Wave: <t id="wave">1</t></li><li>Time: <t id="time">00:00</t></li>');
      var waveOne = new window.CrystalQuest.Wave(this.X_DIM, this.Y_DIM, this, Game.WAVES[0])
      var game = this

      this.interval = setInterval( function () {
        if (waveOne.step() === "lost" ) {
          game.lose();
        } else if (waveOne.step() === "won") {
          game.win();
        }
        waveOne.draw(this.ctx)
      }, 20)
      this.bindKeyHandlers(waveOne);
    }.bind(this));

    $('#controls').on('click', "#next-level", function () {
      this.counter++;
      $('#controls').empty();
      $('#wave').html(this.counter + 1)
      this.ctx.clearRect(0, 0, this.X_DIM, this.Y_DIM);
      var wave = new window.CrystalQuest.Wave(this.X_DIM, this.Y_DIM, this, Game.WAVES[this.counter])
      var game = this

      this.interval = setInterval( function () {
        if (wave.step() === "lost" ) {
          game.lose();
        } else if (wave.step() === "won") {
          game.win();
          // i++;
        }
        wave.draw(this.ctx)
      }, 20)
      this.bindKeyHandlers(wave);
    }.bind(this));

    $('#controls').on('click', "#start-menu", function () {
      $('#controls').empty();
      this.ctx.clearRect(0, 0, this.X_DIM, this.Y_DIM);
      this.showIntro();
    }.bind(this))

  };

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

})();
