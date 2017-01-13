(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var Alien = window.CrystalQuest.Alien;
  var Bullet = window.CrystalQuest.Bullet;
  var Ship = window.CrystalQuest.Ship;
  var Asteroid = window.CrystalQuest.Asteroid;
  var Portal = window.CrystalQuest.Portal;
  var Bomb = window.CrystalQuest.Bomb;
  var CrystalPoints = window.CrystalQuest.CrystalPoints;

  var Wave = window.CrystalQuest.Wave = function (xDim, yDim, game, options) {
    this.game = game
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.NUM_BASIC_ALIENS = options.numBasicAliens || 0;
    this.NUM_SHOOTER_ALIENS = options.numShooterAliens || 0;
    this.NUM_BLOB_ALIENS = options.numBlobAliens || 0;
    this.NUM_COMPUTER_ALIENS = options.numComputerAliens || 0;
    this.NUM_CSHOOTER_ALIENS = options.numCShooterAliens || 0;
    this.NUM_XSHOOTER_ALIENS = options.numXShooterAliens || 0;
    this.NUM_LASER_ALIENS = options.numLaserAliens || 0;
    this.NUM_FOUR_LEG_ALIENS = options.numFourLegsAliens || 0;
    this.NUM_ASTEROIDS = options.numAsteroids;
    this.NUM_CRYSTALS = options.numCrystals;
    this.NUM_BIG_CRYSTALS = options.numBigCrystals;
    this.NUM_BOMBS = options.numBombs;
    this.NUM_POINTS = options.numPoints;

    // Need to explicitly unbind and bind the enter key each wave or else
    // flash bomb will get called multiple times on one keypress
    $(document).unbind('keydown').keydown(function (event) {
      event.preventDefault();
      if (event.keyCode === 16) {
        this.flashBomb();
      }

      if (event.keyCode === 27) {
        this.isQuit = true;
      }
    }.bind(this))

    this.bigCrystalPoints = [];
    this.hiddenAliens = [];
    this.aliens = [];
    this.ship = new window.CrystalQuest.Ship({ pos: Wave.randomPosition(12), wave: this, color: "#FFFFFF" });
    this.bullets = [];
    this.alienBullets = [];
    this.asteroids = this.addAsteroids();
    this.gate = new window.CrystalQuest.Gate({ wave: this });
    this.portals = new window.CrystalQuest.Portal({ wave: this });
    this.crystals = this.addCrystals();
    this.bigCrystals = [];
    this.bombs = this.addBombs();
    this.points = this.addPoints();
    this.flash = false;
    this.gameOver = false;
    this.crystalPoints = false;
    this.counter = 0;
    this.isLost = false;
    this.isQuit = false;
    this.clock = new window.CrystalQuest.Clock();
    this.clock.run()
    this.addAliens();
    this.addBigCrystals();
  };

  Wave.randomPosition = function (radius) {
    var randX = Math.floor(Math.random() * (780 - radius * 2)) + radius;
    var randY = Math.floor(Math.random() * (500 - radius * 2)) + radius;
    return [randX, randY];
  };

  Wave.randomAsteroidPos = function (width) {
    do {
      var randX = Math.floor(Math.random() * (780 - width)) + (width/2);
      var randY = Math.floor(Math.random() * (500 - width)) + (width/2);
    } while (
      ((randX - 15 < 30 || randX + 15 > 750) && (randY > 220 && randY < 280))
      || (randY + 20 > 500)
    )
    return [randX, randY];
  };

  Wave.prototype.checkAsteroids = function(coords) {
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroidPos = this.asteroids[i].pos;
      if (coords[0] > asteroidPos[0] && coords[0] < asteroidPos[0] + 20 && coords[1] > asteroidPos[1] && coords[1] < asteroidPos[1] + 20) {
        return true;
      }
    }

    return false;
  };

  Wave.prototype.randomSafePos = function(width) {
    var coords = Wave.randomAsteroidPos(width);
    do {
      var coords = Wave.randomAsteroidPos(width);
    } while (
      this.checkAsteroids(coords) === true
    )
    return coords;
  };

  Wave.prototype.addPoints = function () {
    var result = [];
    for (var i = 0; i < this.NUM_POINTS; i++) {
      var points = new window.CrystalQuest.Points({
        pos: Wave.randomAsteroidPos(50),
        wave: this
      });
      result.push(points)
    }
    return result;
  };

  Wave.prototype.addBombs = function () {
    var result = [];
    for(var i = 0; i < this.NUM_BOMBS; i++) {
      var bomb = new window.CrystalQuest.Bomb({
        pos: Wave.randomAsteroidPos(15),
        wave: this
      });
      result.push(bomb);
    }
    return result;
  };

  Wave.prototype.addCrystals = function () {
    var result = [];
    for(var i = 0; i < this.NUM_CRYSTALS; i++) {
      var crystal = new window.CrystalQuest.Crystal({
        pos: this.randomSafePos(15),
        wave: this
      });
      result.push(crystal);
    }
    return result;
  };

  Wave.prototype.addAsteroids = function () {
    var result = [];
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var asteroid = new window.CrystalQuest.Asteroid({
        pos: Wave.randomAsteroidPos(10),
        wave: this
      });
      result.push(asteroid);
    }
    return result;
  };

  Wave.prototype.alienStop = function() {
    clearTimeout(this.alienInterval);
    this.alienInterval = null;
  };

  Wave.prototype.bcStop = function() {
    clearTimeout(this.bcInterval);
    this.bcInterval = null;
  };

  Wave.prototype.addAliens = function () {
    for(var i = 0; i < this.NUM_BASIC_ALIENS; i++) {
      if (i < (this.NUM_BASIC_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.BasicAlien({
          pos: [this.X_DIM - 12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.BasicAlien({
          pos: [12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    for(var i = 0; i < this.NUM_SHOOTER_ALIENS; i++) {
      if (i < (this.NUM_SHOOTER_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.ShooterAlien({
          pos: [this.X_DIM - 12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.ShooterAlien({
          pos: [12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    for(var i = 0; i < this.NUM_BLOB_ALIENS; i++) {
      if (i < (this.NUM_BLOB_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.BlobAlien({
          pos: [this.X_DIM - 20, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.BlobAlien({
          pos: [20, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    for(var i = 0; i < this.NUM_COMPUTER_ALIENS; i++) {
      if (i < (this.NUM_COMPUTER_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.ComputerAlien({
          pos: [this.X_DIM - 12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.ComputerAlien({
          pos: [12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    for(var i = 0; i < this.NUM_CSHOOTER_ALIENS; i++) {
      if (i < (this.NUM_CSHOOTER_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.CSAlien({
          pos: [this.X_DIM - 12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.CSAlien({
          pos: [12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    for(var i = 0; i < this.NUM_XSHOOTER_ALIENS; i++) {
      if (i < (this.NUM_XSHOOTER_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.XSAlien({
          pos: [this.X_DIM - 12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.XSAlien({
          pos: [12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    for(var i = 0; i < this.NUM_FOUR_LEG_ALIENS; i++) {
      if (i < (this.NUM_FOUR_LEG_ALIENS / 2) ) {
        var alien = new window.CrystalQuest.FourLegAlien({
          pos: [this.X_DIM - 12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      } else {
        var alien = new window.CrystalQuest.FourLegAlien({
          pos: [12, (this.Y_DIM / 2)],
          wave: this,
          vel: window.CrystalQuest.Util.randomVec(5)
        });
      }
      this.hiddenAliens.push(alien);
    }
    var that = this;
    this.hiddenAliens.forEach( function (alien) {
      var wait = (Math.random() * 20000);
      if (!this.gameOver) {
        this.alienInterval = setTimeout( function () {
          if (!that.gameOver) {
            that.aliens.push(alien);
            alien.startIntervals();
            that.alienStop();
          }
        }, wait);
      }
    });
  };

  Wave.prototype.addBigCrystals = function () {
    var result = [];
    for (var i = 0; i < this.NUM_BIG_CRYSTALS; i++) {
      var bigCrystal = new window.CrystalQuest.BigCrystal({
        pos: [this.X_DIM - 20, (this.Y_DIM / 2)],
        wave: this,
        vel: [1, -1]
      })
      result.push(bigCrystal);
    }
    var that = this;
    result.forEach( function (bigCrystal) {
      var wait = (Math.random() * 18000)
      that.bcInterval = setTimeout( function () {
        that.bigCrystals.push(bigCrystal)
        that.bcStop();
      }, wait);
    })
  };

  Wave.prototype.allObjects = function() {
    var movingObjects = this.movingObjects();
    return ([this.gate]
      .concat(this.asteroids)
      .concat(this.bombs)
      .concat(this.portals)
      .concat(this.crystals)
      .concat(this.points)
      .concat(this.bigCrystalPoints)
      .concat(movingObjects)
    );
  };

  Wave.prototype.movingObjects = function() {
    return ([this.ship]
      .concat(this.aliens)
      .concat(this.bullets)
      .concat(this.bigCrystals)
      .concat(this.alienBullets)
    );
  };

  Wave.prototype.draw = function(ctx) {
    if (this.flash) {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(0, 0, this.X_DIM, this.Y_DIM);
      var _this = this;
      setTimeout( function(e) {
        _this.flash = false;
      }, 90);
    } else {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, this.X_DIM, this.Y_DIM);
    }
    var objects = this.allObjects();
    objects.forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Wave.prototype.moveObjects = function () {
    var objects = this.movingObjects();
    objects.forEach(function (obj) {
      obj.move();
    });
  };

  Wave.prototype.bounce = function (object) {
    xVel = object.vel[0];
    yVel = object.vel[1];
    var dirs = [-1, 1];
    var idx = Math.floor(Math.random() * 2);

    if (xVel < 0 && yVel < 0) {
      object.vel = [-xVel, dirs[idx] * yVel]
    } else if (xVel < 0 && yVel > 0) {
      object.vel = [dirs[idx] * xVel, -yVel]
    } else if (xVel > 0 && yVel > 0) {
      object.vel = [-xVel, dirs[idx] * yVel]
    } else if (xVel > 0 && yVel < 0) {
      object.vel = [dirs[idx] * xVel, -yVel]
    } else if (xVel === 0 && yVel !== 0) {
      object.vel = [xVel, -yVel]
    } else if (yVel === 0 && xVel !== 0) {
      object.vel = [-xVel, yVel]
    }
  };

  Wave.prototype.remove = function (collection, object) {
    if (object instanceof CrystalQuest.ShooterAlien) {
      object.clearIntervals();
    }

    if (collection && collection.indexOf(object) > -1) {
      collection.splice(collection.indexOf(object), 1);
    } else {
      object = [];
    }
  };

  Wave.prototype.loseALife = function (relocate) {
    if ($('#lives').find('img').length === 0) {
      this.isLost = true;
    } else if ($('#life-count').text() === "") {
      $('#lives').find('img').last().remove();
      this.flashBomb(true);
    } else if ($('#life-count').text() === "5"){
      $('#life-count').html("")
      $('#lives').prepend('<img src="img/life.png" width="25">');
      // this.ship.relocate();
      this.flashBomb(true);
    } else {
      var count = parseInt($('#life-count').text()) - 1
      $('#life-count').html(count);
      // this.ship.relocate();
      this.flashBomb(true);
    }

    if (relocate) {
      this.ship.relocate();
    }

    this.game.playSound('wall');
  };

  Wave.prototype.flashBomb = function (loseALife) {
    if ($('#bombs').find('img').length > 0 || loseALife) {
      if (!loseALife) {
        if ($('#bomb-count').text() === "") {
          $('#bombs').children().first().remove();
        } else if ($('#bomb-count').text() === "5") {
          $('#bomb-count').html("");
          $('#bombs').prepend('<img src="img/bomb.png" height="15">');
        } else {
          var count = parseInt($('#bomb-count').text()) - 1;
          $('#bomb-count').html(count);
        }
      }
      this.aliens.forEach( function (alien) {
        this.remove(this.aliens, alien);
      }.bind(this))

      this.aliens = [];
      this.alienBullets = [];
      this.flash = true;
    }
  };

  Wave.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        this.loseALife(true);
      }
    }

    if (this.ship.isCollidedWith(this.portals)) {
      this.loseALife(true);
    }

    for (var i = 0; i < this.alienBullets.length; i++) {
      if (this.ship.isCollidedWith(this.alienBullets[i])) {
        this.loseALife();
      }
    }

    for (var i = 0; i < this.crystals.length; i++) {
      if (this.ship.isCollidedWith(this.crystals[i])) {
        this.game.playSound('crystal');
        var score = parseInt($('#score').text()) + 200;
        $('#score').html(score);
        this.remove(this.crystals, this.crystals[i]);
      }
    }

    for (var i = 0; i < this.bombs.length; i++) {
      if (this.ship.isCollidedWith(this.bombs[i])) {
        if (($('#bombs').find('img').length < 4) && ($('#bomb-count').text() === "")) {
          $('#bombs').prepend('<img src="img/bomb.png" height="15">')
        } else if ($('#bomb-count').text() === "") {
          $('#bombs').find('img').last().remove();
          $('#bomb-count').html(5)
        } else {
          var count = parseInt($('#bomb-count').text()) + 1
          $('#bomb-count').html(count)
        }
        this.remove(this.bombs, this.bombs[i])
      }
    }

    for (var i = 0; i < this.aliens.length; i++) {
      for (var j = 0; j < this.bullets.length; j++) {
        if ((this.aliens[i] !== undefined) && this.aliens[i].isCollidedWith(this.bullets[j])) {
          this.remove(this.aliens, this.aliens[i]);
          this.remove(this.bullets, this.bullets[j]);
        }
      }
      if (this.ship.isCollidedWith(this.aliens[i])) {
        this.loseALife();
      }
    }

    for (var i = 0; i < this.bigCrystals.length; i++) {
      if (this.ship.isCollidedWith(this.bigCrystals[i])) {
        this.game.playSound('success');

        if (($('#lives').find('img').length < 4) && ($('#life-count').text() === "")) {
          $('#lives').prepend('<img src="img/life.png" width="25">');
        } else if ($('#life-count').text() === "") {
          $('#lives').find('img').last().remove();
          $('#life-count').html(5);
        } else {
          var count = parseInt($('#life-count').text()) + 1
          $('#life-count').html(count);
        }
        var points = new window.CrystalQuest.CrystalPoints({
          pos: this.bigCrystals[i].pos,
          wave: this,
          num: this.bigCrystals[i].num
        });
        this.bigCrystalPoints.push(points);
        var score = parseInt($('#score').text()) + this.bigCrystals[i].num;
        $('#score').html(score);
        this.remove(this.bigCrystals, this.bigCrystals[i]);
        var that = this;
        setTimeout(function () {
          that.remove(that.bigCrystalPoints, points);
        }, 3000)
      }
    }

    for (var i = 0; i < this.points.length; i++) {
      if (this.ship.isCollidedWith(this.points[i])) {
        this.game.playSound('crystal');
        var score = parseInt($('#score').text()) + this.points[i].num;
        $('#score').html(score);
        this.remove(this.points, this.points[i]);
      }
    }
  };

  Wave.prototype.isWon = function () {
    if ((this.crystals.length === 0) && (this.ship.pos[1] > this.Y_DIM)) {
      return true;
    }
  };

  Wave.prototype.isOutOfBounds = function (pos) {
   return (pos[0] < 0) || (pos[1] < 0)
     || (pos[0] > this.X_DIM) || (pos[1] > this.Y_DIM);
  };

  Wave.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.counter++;

    if (this.isWon()) {
      this.endWave();
      this.game.playSound('levelSuccess');
      return "won";
    } else if (this.isLost) {
      this.endWave();
      this.game.playSound('tristeza');
      return "lost";
    } else if (this.isQuit) {
      this.endWave();
      return "quit";
    }
  };

  Wave.prototype.endWave = function() {
    this.clock.stop();
    this.gameOver = true;
    this.alienStop();
    this.bcStop();

    this.aliens.forEach( function (alien) {
      this.remove(this.aliens, alien);
    }.bind(this));

    this.hiddenAliens.forEach( function (alien) {
      this.remove(this.hiddenAliens, alien);
    }.bind(this));

    this.aliens = [];
    this.hiddenAliens = [];
    $(document).unbind('keydown').bind(this);
  };

})();
