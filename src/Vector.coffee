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
    if arguments.length is 1
      vec = x
      @x = vec.x
      @y = vec.y
      @z = vec.z
    else
      @x = x
      @y = y
      @z = z

    return @

  neg: ->
    @x = -@x
    @y = -@y
    @z = -@z
    return @

  add: (vec) ->
    @x += vec.x
    @y += vec.y
    @z += vec.z
    return @

  sub: (vec) ->
    @x -= vec.x
    @y -= vec.y
    @z -= vec.z
    return @

  mul: (s) ->
    @x *= s
    @y *= s
    @z *= s
    return @

  div: (s) ->
    rs = 1 / s
    @x *= rs
    @y *= rs
    @z *= rs
    return @

  norm: -> Math.sqrt @x * @x + @y * @y + @z * @z

  sqNorm: -> @x * @x + @y * @y + @z * @z

  dist: (vec) -> DivSugar.Vector._tmpVec1.set(@).sub(vec).norm()

  sqDist: (vec) -> DivSugar.Vector._tmpVec1.set(@).sub(vec).sqNorm()

  dot: (vec) -> @x * vec.x + @y * vec.y + @z * vec.z

  cross: (vec) -> @set @y * vec.z - @z * vec.y, @z * vec.x - @x * vec.z, @x * vec.y - @y * vec.x

  normalize: ->
    norm = @norm()
    if norm < DivSugar.EPSILON then @set DivSugar.Vector.X_UNIT else @div norm

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
      vec = DivSugar.Vector._tmpVec1
      vec.set(to).mul(ratio)
      @mul(1 - ratio).add(vec)

    return @

  toLocal: (mat) ->
    vec = DivSugar.Vector._tmpVec1
    vec.set @.sub mat.trans
    @set vec.dot(mat.xAxis) / mat.xAxis.sqNorm(), vec.dot(mat.yAxis) / mat.yAxis.sqNorm(), vec.dot(mat.zAxis) / mat.zAxis.sqNorm()

  toGlobal: (mat) ->
    vec1 = DivSugar.Vector._tmpVec1
    vec2 = DivSugar.Vector._tmpVec2
    vec3 = DivSugar.Vector._tmpVec3

    vec1.set(mat.xAxis).mul(@x)
    vec2.set(mat.yAxis).mul(@y)
    vec3.set(mat.zAxis).mul(@z)

    @set(vec1).add(vec2).add(vec3).add(mat.trans)

  toLocal_noTrans: (mat) -> @set @dot(mat.xAxis) / mat.xAxis.sqNorm(), @dot(mat.yAxis) / mat.yAxis.sqNorm(), @dot(mat.zAxis) / mat.zAxis.sqNorm()

  toGlobal_noTrans: (mat) ->
    vec1 = DivSugar.Vector._tmpVec1
    vec2 = DivSugar.Vector._tmpVec2
    vec3 = DivSugar.Vector._tmpVec3

    vec1.set(mat.xAxis).mul(@x)
    vec2.set(mat.yAxis).mul(@y)
    vec3.set(mat.zAxis).mul(@z)

    @set(vec1).add(vec2).add(vec3)

  equal: (vec) -> @x is vec.x and @y is vec.y and @z is vec.z

  toString: -> "(#{@x}, #{@y}, #{@z})"

DivSugar.Vector.ZERO = new DivSugar.Vector 0, 0, 0
DivSugar.Vector.X_UNIT = new DivSugar.Vector 1, 0, 0
DivSugar.Vector.Y_UNIT = new DivSugar.Vector 0, 1, 0
DivSugar.Vector.Z_UNIT = new DivSugar.Vector 0, 0, 1

DivSugar.Vector._tmpVec1 = new DivSugar.Vector
DivSugar.Vector._tmpVec2 = new DivSugar.Vector
DivSugar.Vector._tmpVec3 = new DivSugar.Vector
