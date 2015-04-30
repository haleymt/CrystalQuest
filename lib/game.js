(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Game = window.CrystalQuest.Game = function (xDim, yDim, ctx) {
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.ctx = ctx;
    this.scores = JSON.parse(localStorage.getItem("high-scores"));
    this.timeBonus = 0;
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
    this.ctx.clearRect(0, 0, this.X_DIM, this.Y_DIM);
    var timeTaken = $('#time').text();
    var seconds = (parseInt(timeTaken.split(":")[0]) / 60) + parseInt(timeTaken.split(":")[1])
    if (Math.floor((30 - seconds) * 500) > 0) {
      this.timeBonus = Math.floor((30 - seconds) * 500)
    } else {
      this.timeBonus = 0;
    }
    if (this.counter === Game.WAVES.length - 1) {
      var total = this.timeBonus + parseInt($('#score').text());
      var content = "<h2>YOU WON!!!</h2><p>Wave number " + $('#wave').text() + " completed</p><p>Time taken: " + timeTaken + "</p><p>Time bonus: " + this.timeBonus + "</p><h3>Total Score: " + total + " </h3><button id='start'>Play Again?</button><button id='start-menu'>Exit</button>"
      $('#controls').append(content);
      if ((this.scores.length < 10) || (total > this.scores[this.scores.length - 1]['score'])) {
        var name = prompt("You got a new high score! Enter your initials: ");
        if ((name !== "") && (name !== null)) {
          if (this.scores.length === 10) {
            this.scores.pop();
          }
          this.scores.push({'name': name, 'score': total})
          this.scores.sort( function(a, b) {
            return b['score'] - a['score'];
          });
          localStorage.setItem("high-scores", JSON.stringify(this.scores));
        }
      }
    } else {
      var content = "<p>Wave number " + $('#wave').text() + " completed</p><p>Time taken: " + timeTaken + "</p><p>Time bonus: " + this.timeBonus + "</p><br><button id='next-level'>Next Level</button>"
      $('#controls').append(content)
    }
  };

  Game.prototype.lose = function() {
    this.stop();
    var score = parseInt($('#score').text())
    if ((this.scores.length < 10) || (score > this.scores[this.scores.length - 1]['score'])) {
      var name = prompt("You got a new high score! Enter your initials: ");
      if ((name !== "") && (name !== null)) {
        if (this.scores.length === 10) {
          this.scores.pop();
        }
        this.scores.push({'name': name, 'score': score})
        this.scores.sort( function(a, b) {
          return b['score'] - a['score'];
        });
        localStorage.setItem("high-scores", JSON.stringify(this.scores));
      }
      this.showHighScores();
    } else {
      var content = "<p style='color:white;'>Game Over</p><br><button id='start'>Restart</button><button id='start-menu'>Exit</button>"
      $('#controls').append(content)
    }
  };

  Game.prototype.showIntro = function () {
    $('#status-bar').empty();
    var str = "<h1>CRYSTAL QUEST</h1><br><button id='start'>Start</button><br><button id='high-scores'>High Scores</button>"
    $('#controls').append(str);
    $('#controls').css('padding-bottom', '200px');
  };

  Game.prototype.showHighScores = function () {
    $('#status-bar').empty();
    var str = "<h1>HIGH SCORES</h1><ul></ul><button id='start-menu'>Back to Start Menu</button>"
    $('#controls').append(str);
    this.scores.forEach( function (score) {
      var scoreStr = "<li>"+ score['name'] + "&nbsp; &nbsp; &nbsp;" + score['score'] + "</li>"
      $('ul').append(scoreStr);
    });
    $('#controls').css('padding-bottom', '100px');
  };

  Game.prototype.run = function () {
    if (this.scores === null) {
      localStorage.setItem("high-scores", JSON.stringify([]));
    }
    this.showIntro();
    $('#controls').on('click', '#start', function () {
      this.counter = 0;
      $('#controls').empty();
      $('#status-bar').empty();
      $('#status-bar').append('<ul><li>Score: <t id="score">0</t></li><li id="lives"><img src="./life.png" width="25"><img src="./life.png" width="25"><t id="life-count"></t></li><li id="bombs"><img src="./bomb.png" height="15"><img src="./bomb.png" height="15"><img src="./bomb.png" height="15"><t id="bomb-count"></t></li><li>Wave: <t id="wave">1</t></li><li>Time: <t id="time">00:00</t></li>');
      var waveOne = new window.CrystalQuest.Wave(this.X_DIM, this.Y_DIM, this, Game.WAVES[0])
      var game = this

      this.interval = setInterval( function () {
        if (waveOne.step() === "lost" ) {
          game.lose();
          waveOne.aliens.forEach(function (alien) {
            clearInterval(alien.dirInterval);
            alien.dirInterval = null;
            if (alien instanceof CrystalQuest.ShooterAlien) {
              clearInterval(alien.shootInterval);
              alien.shootInterval = null;
            }
          }.bind(waveOne))
        } else if (waveOne.step() === "won") {
          game.win();
          waveOne.aliens.forEach(function (alien) {
            clearInterval(alien.dirInterval);
            alien.dirInterval = null;
            if (alien instanceof CrystalQuest.ShooterAlien) {
              clearInterval(alien.shootInterval);
              alien.shootInterval = null;
            }
          }.bind(waveOne))
        }
        waveOne.draw(this.ctx)
      }, 20)
      this.bindKeyHandlers(waveOne);
    }.bind(this));

    $('#controls').on('click', "#next-level", function () {
      this.counter++;
      $('#controls').empty();
      $('#wave').html(this.counter + 1)
      var score = parseInt($('#score').text()) + this.timeBonus;
      $('#score').html(score);
      this.ctx.clearRect(0, 0, this.X_DIM, this.Y_DIM);
      var wave = new window.CrystalQuest.Wave(this.X_DIM, this.Y_DIM, this, Game.WAVES[this.counter])
      var game = this

      this.interval = setInterval( function () {
        if (wave.step() === "lost" ) {
          game.lose();
          wave.aliens.forEach(function (alien) {
            clearInterval(alien.dirInterval);
            alien.dirInterval = null;
            if ((alien instanceof CrystalQuest.ShooterAlien) || (alien instanceof CrystalQuest.CSAlien) || (alien instanceof CrystalQuest.XSAlien)) {
              clearInterval(alien.shootInterval);
              alien.shootInterval = null;
            }
          }.bind(game))
        } else if (wave.step() === "won") {
          game.win();
          wave.aliens.forEach(function (alien) {
            clearInterval(alien.dirInterval);
            alien.dirInterval = null;
            if ((alien instanceof CrystalQuest.ShooterAlien) || (alien instanceof CrystalQuest.CSAlien) || (alien instanceof CrystalQuest.XSAlien)) {
              clearInterval(alien.shootInterval);
              alien.shootInterval = null;
            }
          }.bind(wave))
        }
        wave.draw(this.ctx)
      }, 20)
      this.bindKeyHandlers(wave);
    }.bind(this));

    $('#controls').on('click', '#high-scores', function () {
      $('#controls').empty();
      this.ctx.clearRect(0, 0, this.X_DIM, this.Y_DIM);
      this.showHighScores();
    }.bind(this))

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
    numBasicAliens: 4,
    numBigCrystals: 0,
    numPoints: 0
  };

  Game.WAVE_TWO = {
    numAsteroids: 0,
    numBombs: 0,
    numCrystals: 12,
    numBasicAliens: 1,
    numBigCrystals: 1,
    numPoints: 0
  };

  Game.WAVE_THREE = {
    numAsteroids: 2,
    numBombs: 0,
    numCrystals: 15,
    numShooterAliens: 2,
    numBigCrystals: 1,
    numPoints: 0
  };

  Game.WAVE_FOUR = {
    numAsteroids: 5,
    numBombs: 0,
    numCrystals: 15,
    numShooterAliens: 4,
    numBigCrystals: 0,
    numPoints: 2
  };

  Game.WAVE_FIVE = {
    numAsteroids: 5,
    numBombs: 1,
    numCrystals: 20,
    numBigCrystals: 0,
    numPoints: 0
  };

  Game.WAVE_SIX = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 20,
    numBlobAliens: 3,
    numBasicAliens: 1,
    numBigCrystals: 1,
    numPoints: 1
  };

  Game.WAVE_SEVEN = {
    numAsteroids: 10,
    numBombs: 0,
    numCrystals: 25,
    numComputerAliens: 1,
    numBigCrystals: 1,
    numPoints: 3
  };

  Game.WAVE_EIGHT = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 25,
    numComputerAliens: 5,
    numBasicAliens: 1,
    numBigCrystals: 0,
    numPoints: 3
  };

  Game.WAVE_NINE = {
    numAsteroids: 10,
    numBombs: 0,
    numCrystals: 30,
    numCShooterAliens: 6,
    numBigCrystals: 1,
    numPoints: 2
  };

  Game.WAVE_TEN = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 30,
    numCShooterAliens: 6,
    numBasicAliens: 2,
    numShooterAliens: 4,
    numComputerAliens: 2,
    numBigCrystals: 0,
    numPoints: 1
  };

  Game.WAVE_ELEVEN = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 30,
    numFourLegsAliens: 2,
    numBigCrystals: 1,
    numPoints: 1
  };

  Game.WAVE_TWELVE = {
    numAsteroids: 10,
    numBombs: 1,
    numCrystals: 30,
    numBlobAliens: 2,
    numBasicAliens: 1,
    numFourLegsAliens: 5,
    numCShooterAliens: 1,
    numShooterAliens: 1,
    numBigCrystals: 0,
    numPoints: 2
  };

  Game.WAVE_THIRTEEN = {
    numAsteroids: 10,
    numBombs: 2,
    numCrystals: 30,
    numXShooterAliens: 4,
    numBigCrystals: 0,
    numPoints: 2
  };

  Game.WAVE_FOURTEEN = {
    numAsteroids: 10,
    numBombs: 2,
    numCrystals: 30,
    numXShooterAliens: 13,
    numBasicAliens: 2,
    numFourLegsAliens: 2,
    numShooterAliens: 1,
    numBlobAliens: 2,
    numCShooterAliens: 1,
    numBigCrystals: 0,
    numPoints: 1
  };

  Game.WAVE_FIFTEEN = {
    numAsteroids: 15,
    numBombs: 2,
    numCrystals: 30,
    numBlobAliens: 3,
    numBigCrystals: 2,
    numPoints: 5
  };

  Game.WAVES = [
    Game.WAVE_ONE,
    Game.WAVE_TWO,
    Game.WAVE_THREE,
    Game.WAVE_FOUR,
    Game.WAVE_FIVE,
    Game.WAVE_SIX,
    Game.WAVE_SEVEN,
    Game.WAVE_EIGHT,
    Game.WAVE_NINE,
    Game.WAVE_TEN,
    Game.WAVE_ELEVEN,
    Game.WAVE_TWELVE,
    Game.WAVE_THIRTEEN,
    Game.WAVE_FOURTEEN,
    Game.WAVE_FIFTEEN
  ];

})();
