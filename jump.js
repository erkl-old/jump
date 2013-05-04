(function (window) {

  function Point(x, y) {
    this.x = x
    this.y = y
  }

  Point.prototype.sub = function (p) {
    this.x -= p.x
    this.y -= p.y
  }

  Point.prototype.rotate = function (r) {
    var x = this.x
      , y = this.y

    this.x = x * Math.cos(r) - y * Math.sin(r)
    this.y = x * Math.sin(r) + y * Math.cos(r)
  }

  function cost(x, y) {
    return (1 + y/x) * Math.sqrt(x*x/3.5 + y*y)
  }

  function positionOf(e) {
    var point = new Point(e.offsetWidth / 2, e.offsetHeight / 2)

    while (e.offsetParent) {
      point.x += e.offsetLeft
      point.y += e.offsetTop

      e = e.offsetParent
    }

    return point
  }

  function jump(element, candidates, angle) {
    var origin = positionOf(element)
      , lowest = Infinity
      , winner

    for (var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i]
        , point = positionOf(candidate)

      point.sub(origin)
      point.rotate(angle)

      point.y = Math.abs(point.y)

      if (point.x < 0 || point.y > point.x) {
        continue
      }

      var score = cost(point.x, point.y)

      if (score < lowest) {
        winner = candidate
        lowest = score
      }
    }

    return winner
  }

  window.jump = jump

})(window);
