class DivSugar.Matrix
  constructor: (xAxis, yAxis, zAxis, trans) ->
    switch arguments.length
      when 0
        @xAxis = new DivSugar.Vector
        @yAxis = new DivSugar.Vector
        @zAxis = new DivSugar.Vector
        @trans = new DivSugar.Vector

      when 1
        mat = xAxis
        @xAxis = new DivSugar.Vector mat.xAxis
        @yAxis = new DivSugar.Vector mat.yAxis
        @zAxis = new DivSugar.Vector mat.zAxis
        @trans = new DivSugar.Vector mat.trans

      else
        @xAxis = new DivSugar.Vector xAxis
        @yAxis = new DivSugar.Vector yAxis
        @zAxis = new DivSugar.Vector zAxis
        @trans = new DivSugar.Vector trans

  set: (xAxis, yAxis, zAxis, trans) ->
    if arguments.length is 1
      mat = xAxis
      @xAxis.set mat.xAxis
      @yAxis.set mat.yAxis
      @zAxis.set mat.zAxis
      @trans.set mat.trans
    else
      @xAxis.set xAxis
      @yAxis.set yAxis
      @zAxis.set zAxis
      @trans.set trans

    return @

  fromQuaternion: (quat) ->
    quatX = quat.x
    quatY = quat.y
    quatZ = quat.z
    quatW = quat.w

    x2 = quatX + quatX
    y2 = quatY + quatY
    z2 = quatZ + quatZ

    wx2 = quatW * x2
    wy2 = quatW * y2
    wz2 = quatW * z2
    xx2 = quatX * x2
    xy2 = quatX * y2
    xz2 = quatX * z2
    yy2 = quatY * y2
    yz2 = quatY * z2
    zz2 = quatZ * z2

    @xAxis.set 1 - (yy2 + zz2), xy2 + wz2, xz2 - wy2
    @yAxis.set xy2 - wz2, 1 - (xx2 + zz2), yz2 + wx2
    @zAxis.set xz2 + wy2, yz2 - wx2, 1 - (xx2 + yy2)
    @trans.set DivSugar.Vector.ZERO

    return @

  orthonormalize: ->
    vec1 = DivSugar.Matrix._tmpVec1
    vec2 = DivSugar.Matrix._tmpVec2
    vec3 = DivSugar.Matrix._tmpVec3

    vec3.set(@.zAxis).normalize()
    vec1.set(@.yAxis).cross(@.zAxis).normalize()
    vec2.set(vec3).cross(vec1)

    @set vec1, vec2, vec3, @.trans

  rotateX: (deg) ->
    sin = Math.sin deg * DivSugar.DEG_TO_RAD
    cos = Math.cos deg * DivSugar.DEG_TO_RAD
    mat = DivSugar.Matrix._tmpMat1

    mat.xAxis.set DivSugar.Vector.X_UNIT
    mat.yAxis.set 0, cos, sin
    mat.zAxis.set 0, -sin, cos
    mat.trans.set DivSugar.Vector.ZERO
    mat.toGlobal @

    @set mat

  rotateY: (deg) ->
    sin = Math.sin deg * DivSugar.DEG_TO_RAD
    cos = Math.cos deg * DivSugar.DEG_TO_RAD
    mat = DivSugar.Matrix._tmpMat1

    mat.xAxis.set cos, 0, -sin
    mat.yAxis.set DivSugar.Vector.Y_UNIT
    mat.zAxis.set sin, 0, cos
    mat.trans.set DivSugar.Vector.ZERO
    mat.toGlobal @

    @set mat

  rotateZ: (deg) ->
    sin = Math.sin deg * DivSugar.DEG_TO_RAD
    cos = Math.cos deg * DivSugar.DEG_TO_RAD
    mat = DivSugar.Matrix._tmpMat1

    mat.xAxis.set cos, sin, 0
    mat.yAxis.set -sin, cos, 0
    mat.zAxis.set DivSugar.Vector.Z_UNIT
    mat.trans.set DivSugar.Vector.ZERO
    mat.toGlobal @

    @set mat

  scale: (scaleX, scaleY, scaleZ) ->
    @xAxis.mul scaleX
    @yAxis.mul scaleY
    @zAxis.mul scaleZ
    return @

  translate: (offsetX, offsetY, offsetZ) ->
    vec1 = DivSugar.Matrix._tmpVec1
    vec2 = DivSugar.Matrix._tmpVec2
    vec3 = DivSugar.Matrix._tmpVec3

    vec1.set @xAxis.mul offsetX
    vec2.set @yAxis.mul offsetY
    vec3.set @zAxis.mul offsetZ
    @trans.add(vec1).add(vec2).add(vec3)

    return @

  slerp: (to, ratio) ->
    if ratio > 1 - DivSugar.EPSILON
      @set to
    else if ratio >= DivSugar.EPSILON
      vec = DivSugar.Matrix._tmpVec1
      quat1 = DivSugar.Matrix._tmpQuat1
      quat2 = DivSugar.Matrix._tmpQuat2

      quat1.fromMatrix @
      quat2.fromMatrix to
      vec.set(@trans).lerp(to.trans, ratio)

      @fromQuaternion quat1.slerp quat2, ratio
      @trans.set vec

    return @

  slerp_noTrans: (to, ratio) ->
    if ratio > 1 - DivSugar.EPSILON
      @xAxis.set to.xAxis
      @yAxis.set to.yAxis
      @zAxis.set to.zAxis
      @trans.set DivSugar.Vector.ZERO
    else if ratio >= DivSugar.EPSILON
      quat1 = DivSugar.Matrix._tmpQuat1
      quat2 = DivSugar.Matrix._tmpQuat2

      quat1.fromMatrix @
      quat2.fromMatrix to

      @fromQuaternion quat1.slerp quat2, ratio
    else
      @trans.set DivSugar.Vector.ZERO

    return @

  toLocal: (mat) ->
    vec = DivSugar.Matrix._tmpVec1
    rsqXA = 1 / mat.xAxis.sqNorm()
    rsqYA = 1 / mat.yAxis.sqNorm()
    rsqZA = 1 / mat.zAxis.sqNorm()

    vec.set(@trans).sub(mat.trans)

    @xAxis.set @xAxis.dot(mat.xAxis) * rsqXA, @xAxis.dot(mat.yAxis) * rsqYA, @xAxis.dot(mat.zAxis) * rsqZA
    @yAxis.set @yAxis.dot(mat.xAxis) * rsqXA, @yAxis.dot(mat.yAxis) * rsqYA, @yAxis.dot(mat.zAxis) * rsqZA
    @zAxis.set @zAxis.dot(mat.xAxis) * rsqXA, @zAxis.dot(mat.yAxis) * rsqYA, @zAxis.dot(mat.zAxis) * rsqZA
    @trans.set vec.dot(mat.xAxis) * rsqXA, vec.dot(mat.yAxis) * rsqYA, vec.dot(mat.zAxis) * rsqZA

    return @

  toGlobal: (mat) ->
    @xAxis.toGlobal_noTrans mat
    @yAxis.toGlobal_noTrans mat
    @zAxis.toGlobal_noTrans mat
    @trans.toGlobal mat
    return @

  toLocal_noTrans: (mat) ->
    rsqXA = 1 / mat.xAxis.sqNorm()
    rsqYA = 1 / mat.yAxis.sqNorm()
    rsqZA = 1 / mat.zAxis.sqNorm()

    @xAxis.set @xAxis.dot(mat.xAxis) * rsqXA, @xAxis.dot(mat.yAxis) * rsqYA, @xAxis.dot(mat.zAxis) * rsqZA
    @yAxis.set @yAxis.dot(mat.xAxis) * rsqXA, @yAxis.dot(mat.yAxis) * rsqYA, @yAxis.dot(mat.zAxis) * rsqZA
    @zAxis.set @zAxis.dot(mat.xAxis) * rsqXA, @zAxis.dot(mat.yAxis) * rsqYA, @zAxis.dot(mat.zAxis) * rsqZA
    @trans.set DivSugar.Vector.ZERO

    return @

  toGlobal_noTrans: (mat) ->
    @xAxis.toGlobal_noTrans mat
    @yAxis.toGlobal_noTrans mat
    @zAxis.toGlobal_noTrans mat
    @trans.set DivSugar.Vector.ZERO
    return @

  lookAt: (from, to, up) ->
    @zAxis.set(from).sub(to).normalize()
    @xAxis.set(up).cross(@zAxis).normalize()
    @yAxis.set(@zAxis).cross(@xAxis)
    @trans.set(from)
    return @

  #toCSSTransform:

  equal: (mat) -> @xAxis.equals(mat.xAxis) and @yAxis.equals(mat.yAxis) and @zAxis.equals(mat.zAxis) and @trans.equals(mat.trans)

  toString: -> "(#{@xAxis.toString()}, #{@yAxis.toString()}, #{@zAxis.toString()}, #{@trans.toString()})"

DivSugar.Matrix.UNIT = new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.ZERO);

DivSugar.Matrix._tmpVec1 = new DivSugar.Vector
DivSugar.Matrix._tmpVec2 = new DivSugar.Vector
DivSugar.Matrix._tmpVec3 = new DivSugar.Vector
DivSugar.Matrix._tmpMat1 = new DivSugar.Matrix
# _tmpQuat1 and _tmpQuat2 are defined in Quaternion.js
