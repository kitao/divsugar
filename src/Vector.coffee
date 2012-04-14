class DivSugar.Vector
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
    @_vec1.set(@).subtract(vec).norm()

  squaredDistance: (vec) ->
    @_vec1.set(@).subtract(vec).squaredNorm()

  dot: (vec) ->
    @x * vec.x + @y * vec.y + @z * vec.z

  cross: (vec) ->
    @set @y * vec.z - @z * vec.y, @z * vec.x - @x * vec.z, @x * vec.y - @y * vec.x

  normalize: ->
    norm = @norm
    if norm < DivSugar.EPSILON
      @set Vector.X_UNIT
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
      vec = @_vec1
      vec.set(to).multiply(ratio)
      @multiply(1 - ratio).add(vec)

  equals: (vec) ->
    @x == vec.x && @y == vec.y && @z == vec.z

  toString: ->
    "(#{@x}, #{@y}, #{@z})"

DivSugar.Vector.ZERO = new DivSugar.Vector 0, 0, 0
DivSugar.Vector.X_UNIT = new DivSugar.Vector 1, 0, 0
DivSugar.Vector.Y_UNIT = new DivSugar.Vector 0, 1, 0
DivSugar.Vector.Z_UNIT = new DivSugar.Vector 0, 0, 1

DivSugar.Vector._vec1 = new DivSugar.Vector
