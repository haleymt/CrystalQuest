(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }

  var Clock = CrystalQuest.Clock = function() {
    this.minutes = 0
    this.seconds = 0
  }

  Clock.prototype.printTime = function() {
    if (this.minutes > 9) {
      if (this.seconds > 9) {
        $('#time').html(this.minutes + ":" + this.seconds);
      } else {
        $('#time').html(this.minutes + ":0" + this.seconds);
      }
    } else {
      if (this.seconds > 9) {
        $('#time').html("0" + this.minutes + ":" + this.seconds);
      } else {
        $('#time').html("0" + this.minutes + ":0" + this.seconds);
      }
    }
  };

  Clock.prototype.run = function () {
    this.printTime();
    var that = this;
    setInterval(function () {
      that._tick();
    }, 1000);
  };

  Clock.prototype._tick = function () {
    var seconds = this.seconds + 1;
    if (seconds >= 60) {
      this.minutes += 1;
      this.seconds = 0 + (seconds - 60);
    } else {
      this.seconds += 1;
    }
    this.printTime();
  };

})();
