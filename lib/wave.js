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

  var Wave = window.CrystalQuest.Wave = function (xDim, yDim, game, options) {
    this.game = game
    this.X_DIM = xDim;
    this.Y_DIM = yDim;
    this.NUM_ALIENS = options.numAliens;
    this.NUM_ASTEROIDS = options.numAsteroids;
    this.NUM_CRYSTALS = options.numCrystals;
    this.NUM_BIG_CRYSTALS = options.numBigCrystals;
    this.NUM_BOMBS = options.numBombs;
    this.NUM_POINTS = options.numPoints;

    this.aliens = this.addAliens();
    this.ship = new window.CrystalQuest.Ship({ pos: Wave.randomPosition(12), wave: this });
    this.bullets = [];
    this.asteroids = this.addAsteroids();
    this.gate = new window.CrystalQuest.Gate({ wave: this });
    this.portals = new window.CrystalQuest.Portal({ wave: this });
    this.crystals = this.addCrystals();
    this.bigCrystals = this.addBigCrystals();
    this.bombs = this.addBombs();
  };

  Wave.randomPosition = function (radius) {
    // var radius = 7;
    var randX = Math.floor(Math.random() * (780 - radius * 2)) + radius;
    var randY = Math.floor(Math.random() * (500 - radius * 2)) + radius;
    return [randX, randY];
  };

  Wave.randomAsteroidPos = function (width) {
    var randX = Math.floor(Math.random() * (780 - width)) + (width/2);
    var randY = Math.floor(Math.random() * (500 - width)) + (width/2);
    return [randX, randY];
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
        pos: Wave.randomAsteroidPos(15),
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

  Wave.prototype.addAliens = function () {
    var result = [];
      for(var i = 0; i < this.NUM_ALIENS; i++) {
        if (i < (this.NUM_ALIENS / 2) ) {
          var alien = new window.CrystalQuest.Alien({
            pos: [this.X_DIM, (this.Y_DIM / 2)],
            wave: this,
            vel: window.CrystalQuest.Util.randomVec(5)
          });
        } else {
          var alien = new window.CrystalQuest.Alien({
            pos: [0, (this.Y_DIM / 2)],
            wave: this,
            vel: window.CrystalQuest.Util.randomVec(5)
          });
        }
        result.push(alien);
      }
    return result;
  };

  Wave.prototype.addBigCrystals = function () {
    var result = [];
    for (var i = 0; i < this.NUM_BIG_CRYSTALS; i++) {
      var bigCrystal = new window.CrystalQuest.BigCrystal({
        pos: [this.X_DIM, (this.Y_DIM / 2)],
        wave: this,
        vel: [1, -1]
      })
      result.push(bigCrystal);
    }
    return result;
  };

  Wave.prototype.allObjects = function() {
    // var result = [this.ship];
    return ([this.ship]
      .concat(this.aliens)
      .concat(this.bullets)
      .concat(this.asteroids)
      .concat(this.bombs)
      .concat(this.gate)
      .concat(this.portals)
      .concat(this.crystals)
      .concat(this.bigCrystals)
    );
  };

  Wave.prototype.movingObjects = function() {
    var result = [this.ship];
    return (result.concat(this.aliens).concat(this.bullets).concat(this.bigCrystals));
  };

  Wave.prototype.draw = function(ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.X_DIM, this.Y_DIM);

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

    if (xVel < 0 && yVel < 0) {
      object.vel = [-xVel, yVel]
    } else if (xVel < 0 && yVel > 0) {
      object.vel = [xVel, -yVel]
    } else if (xVel > 0 && yVel > 0) {
      object.vel = [-xVel, yVel]
    } else if (xVel > 0 && yVel < 0) {
      object.vel = [xVel, -yVel]
    } else if (xVel === 0 && yVel !== 0) {
      object.vel = [xVel, -yVel]
    } else if (yVel === 0 && xVel !== 0) {
      object.vel = [-xVel, yVel]
    }
    // object.vel = [yVel, xVel];
  };

  Wave.prototype.remove = function (object) {
   if (object instanceof CrystalQuest.Bullet) {
     this.bullets.splice(this.bullets.indexOf(object), 1);
   } else if (object instanceof CrystalQuest.Alien) {
     this.aliens.splice(this.aliens.indexOf(object), 1);
   } else if (object instanceof CrystalQuest.Crystal){
     this.crystals.splice(this.crystals.indexOf(object), 1);
   } else if (object instanceof CrystalQuest.Bomb){
     this.bombs.splice(this.bombs.indexOf(object), 1);
   } else {
     object = [];
   }
 };

  Wave.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        this.isLost = true;
      }
    }

    if (this.ship.isCollidedWith(this.portals)) {
      this.isLost = true;
    }

    for (var i = 0; i < this.crystals.length; i++) {
      if (this.ship.isCollidedWith(this.crystals[i])) {
        var score = parseInt($('#score').text()) + 200;
        $('#score').html(score);
        this.remove(this.crystals[i]);
      }
    }

    for (var i = 0; i < this.bombs.length; i++) {
      if (this.ship.isCollidedWith(this.bombs[i])) {
        this.remove(this.bombs[i])
      }
    }

    for (var i = 0; i < this.aliens.length; i++) {
      for (var j = 0; j < this.bullets.length; j++) {
        if ((this.aliens[i] !== undefined) && this.aliens[i].isCollidedWith(this.bullets[j])) {
          this.remove(this.aliens[i]);
          this.remove(this.bullets[j]);
        }
      }
    }
  };

  Wave.prototype.isWon = function () {
    if ((this.crystals.length === 0) && (this.ship.pos[1] > this.Y_DIM)) {
      return true;
    }
  };

  Wave.prototype.isLost = false;

  Wave.prototype.checkIfOver = function () {
    if (this.isWon()) {
      // this.ship.vel = [0,0];
      // this.allObjects().forEach( function (obj) {
      //   this.remove(obj)
      // }.bind(this))
      return "won"
    } else if (this.isLost) {
      // this.ship.vel = [0,0];
      // this.allObjects().forEach( function (obj) {
      //   this.remove(obj)
      // }.bind(this))
      return "lost"
    }
  };

  Wave.prototype.isOutOfBounds = function (pos) {
   return (pos[0] < 0) || (pos[1] < 0)
     || (pos[0] > this.X_DIM) || (pos[1] > this.Y_DIM);
 };

  Wave.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    if (this.checkIfOver() === "won") {
      return "won"
    } else if (this.checkIfOver() === "lost") {
      return "lost"
    }
  };

})();