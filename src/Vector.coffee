class DivSugar._Vector
  constructor: (x, y, z) ->
    switch arguments.length
      when 0
        @x = @y = @z = 0

      when 1
        vec = x
        @x = vec.x
        @y = vec.y
        @z = vec.z

      else
        @x = x
        @y = y
        @z = z

  set: (x, y, z) ->
    if arguments.length == 1
      vec = x
      @x = vec.x
      @y = vec.y
      @z = vec.z
    else
      @x = x
      @y = y
      @z = z

    return @

  negate: ->
    @x = -@x
    @y = -@y
    @z = -@z
    return @

  add: (vec) ->
    @x += vec.x
    @y += vec.y
    @z += vec.z
    return @

  subtract: (vec) ->
    @x -= vec.x
    @y -= vec.y
    @z -= vec.z
    return @

  multiply: (s) ->
    @x *= s
    @y *= s
    @z *= s
    return @

  divide: (s) ->
    rs = 1 / s
    @x *= rs
    @y *= rs
    @z *= rs
    return @

  norm: ->
    Math.sqrt @x * @x + @y * @y + @z * @z

  squaredNorm: ->
    @x * @x + @y * @y + @z * @z

  distance: (vec) ->
    DivSugar.Vector._tmpVec.set(@).subtract(vec).norm()

  squaredDistance: (vec) ->
    DivSugar.Vector._tmpVec.set(@).subtract(vec).squaredNorm()

  dot: (vec) ->
    @x * vec.x + @y * vec.y + @z * vec.z

  cross: (vec) ->
    @set @y * vec.z - @z * vec.y, @z * vec.x - @x * vec.z, @x * vec.y - @y * vec.x

  normalize: ->
    norm = @norm
    if norm < DivSugar.EPSILON
      @set DivSugar.Vector.X_UNIT
    else
      @div norm

  rotateX: (deg) ->
    sin = Math.sin deg * DivSugar.DEG_TO_RAD
    cos = Math.cos deg * DivSugar.DEG_TO_RAD
    @set @x, @y * cos - @z * sin, @z * cos + @y * sin

  rotateY: (deg) ->
    sin = Math.sin deg * DivSugar.DEG_TO_RAD
    cos = Math.cos deg * DivSugar.DEG_TO_RAD
    @set @x * cos + @z * sin, @y, @z * cos - @x * sin

  rotateZ: (deg) ->
    sin = Math.sin deg * DivSugar.DEG_TO_RAD
    cos = Math.cos deg * DivSugar.DEG_TO_RAD
    @set @x * cos - @y * sin, @y * cos + @x * sin, @z

  lerp: (to, ratio) ->
    if ratio > 1 - DivSugar.EPSILON
      @set to
    else if ratio >= DivSugar.EPSILON
      vec = DivSugar.Vector._tmpVec
      vec.set(to).multiply(ratio)
      @multiply(1 - ratio).add(vec)

  equals: (vec) ->
    @x == vec.x && @y == vec.y && @z == vec.z

  toString: ->
    "(#{@x}, #{@y}, #{@z})"

DivSugar._Vector.ZERO = DivSugar.createVector 0, 0, 0
DivSugar._Vector.X_UNIT = DivSugar.createVector 1, 0, 0
DivSugar._Vector.Y_UNIT = DivSugar.createVector 0, 1, 0
DivSugar._Vector.Z_UNIT = DivSugar.createVector 0, 0, 1

DivSugar._Vector._tmpVec = DivSugar.createVector
