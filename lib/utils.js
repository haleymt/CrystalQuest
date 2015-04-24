(function () {
  if (typeof CrystalQuest === "undefined") {
    window.CrystalQuest = {};
  }
  var Util = window.CrystalQuest.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  // max vector length can exceed length, fine for now
  // Util.randomVec = function (length) {
  //   var randX = Math.floor(Math.random() * length * 2) - length;
  //   var randY = Math.floor(Math.random() * length * 2) - length;
  //   return [randX, randY];
  // };

  Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  Util.norm = function (vec) {
   return Util.dist([0, 0], vec);
 };

})();
