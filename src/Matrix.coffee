class DivSugar.Matrix
  constructor: (mat) ->
    switch arguments.length
      when 0
        @xAxis = new DivSugar.Vector DivSugar.Vector.X_UNIT
        @yAxis = new DivSugar.Vector DivSugar.Vector.Y_UNIT
        @zAxis = new DivSugar.Vector DivSugar.Vector.Z_UNIT
        @trans = new DivSugar.Vector DivSugar.Vector.ZERO

      when 1
        @xAxis = new DivSugar.Vector mat.xAxis
        @yAxis = new DivSugar.Vector mat.yAxis
        @zAxis = new DivSugar.Vector mat.zAxis
        @trans = new DivSugar.Vector mat.trans

      else
        @xAxis = new DivSugar.Vector arguments[0], arguments[1], arguments[2]
        @yAxis = new DivSugar.Vector arguments[3], arguments[4], arguments[5]
        @zAxis = new DivSugar.Vector arguments[6], arguments[7], arguments[8]
        @trans = new DivSugar.Vector arguments[9], arguments[10], arguments[11]

  set: (mat) ->
    if arguments.length is 1
      @xAxis.set mat.xAxis
      @yAxis.set mat.yAxis
      @zAxis.set mat.zAxis
      @trans.set mat.trans
    else
      @xAxis.set arguments[0], arguments[1], arguments[2]
      @yAxis.set arguments[3], arguments[4], arguments[5]
      @zAxis.set arguments[6], arguments[7], arguments[8]
      @trans.set arguments[9], arguments[10], arguments[11]

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

    @set 1 - (yy2 + zz2), xy2 + wz2, xz2 - wy2, xy2 - wz2, 1 - (xx2 + zz2), yz2 + wx2, xz2 + wy2, yz2 - wx2, 1 - (xx2 + yy2), 0, 0, 0
    return @

  orthonormalize: ->
    vec1 = DivSugar.Matrix._tmpVec1
    vec2 = DivSugar.Matrix._tmpVec2
    vec3 = DivSugar.Matrix._tmpVec3

    vec3.set(@.zAxis).normalize()
    vec1.set(@.yAxis).cross(@.zAxis).normalize()
    vec2.set(vec3).cross(vec1)

    @xAxis.set vec1
    @yAxis.set vec2
    @zAxis.set vec3

    return @

  translate: (offsetX, offsetY, offsetZ) ->
    vec1 = DivSugar.Matrix._tmpVec1
    vec2 = DivSugar.Matrix._tmpVec2
    vec3 = DivSugar.Matrix._tmpVec3

    vec1.set(@xAxis).mul(offsetX)
    vec2.set(@yAxis).mul(offsetY)
    vec3.set(@zAxis).mul(offsetZ)
    @trans.add(vec1).add(vec2).add(vec3)

    return @

  rotate: (rotateX, rotateY, rotateZ) ->
    if rotateX isnt 0
      sin = Math.sin rotateX * DivSugar.DEG_TO_RAD
      cos = Math.cos rotateX * DivSugar.DEG_TO_RAD
      mat = DivSugar.Matrix._tmpMat1
      mat.set(1, 0, 0, 0, cos, sin, 0, -sin, cos, 0, 0, 0).toGlobal @
      @set mat

    if rotateY isnt 0
      sin = Math.sin rotateY * DivSugar.DEG_TO_RAD
      cos = Math.cos rotateY * DivSugar.DEG_TO_RAD
      mat = DivSugar.Matrix._tmpMat1
      mat.set(cos, 0, -sin, 0, 1, 0, sin, 0, cos, 0, 0, 0).toGlobal @
      @set mat

    if rotateZ isnt 0
      sin = Math.sin rotateZ * DivSugar.DEG_TO_RAD
      cos = Math.cos rotateZ * DivSugar.DEG_TO_RAD
      mat = DivSugar.Matrix._tmpMat1
      mat.set(cos, sin, 0, -sin, cos, 0, 0, 0, 1, 0, 0, 0).toGlobal @
      @set mat

    return @

  scale: (scaleX, scaleY, scaleZ) ->
    @xAxis.mul scaleX
    @yAxis.mul scaleY
    @zAxis.mul scaleZ
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
      @set to
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

    @set(
      @xAxis.dot(mat.xAxis) * rsqXA, @xAxis.dot(mat.yAxis) * rsqYA, @xAxis.dot(mat.zAxis) * rsqZA,
      @yAxis.dot(mat.xAxis) * rsqXA, @yAxis.dot(mat.yAxis) * rsqYA, @yAxis.dot(mat.zAxis) * rsqZA,
      @zAxis.dot(mat.xAxis) * rsqXA, @zAxis.dot(mat.yAxis) * rsqYA, @zAxis.dot(mat.zAxis) * rsqZA,
      vec.dot(mat.xAxis) * rsqXA, vec.dot(mat.yAxis) * rsqYA, vec.dot(mat.zAxis) * rsqZA
    )

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

    @set(
      @xAxis.dot(mat.xAxis) * rsqXA, @xAxis.dot(mat.yAxis) * rsqYA, @xAxis.dot(mat.zAxis) * rsqZA,
      @yAxis.dot(mat.xAxis) * rsqXA, @yAxis.dot(mat.yAxis) * rsqYA, @yAxis.dot(mat.zAxis) * rsqZA,
      @zAxis.dot(mat.xAxis) * rsqXA, @zAxis.dot(mat.yAxis) * rsqYA, @zAxis.dot(mat.zAxis) * rsqZA,
      0, 0, 0
    )

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
    @trans.set from
    return @

  equal: (mat) -> @xAxis.equal(mat.xAxis) and @yAxis.equal(mat.yAxis) and @zAxis.equal(mat.zAxis) and @trans.equal(mat.trans)

  toString: -> "(#{@xAxis.toString()}, #{@yAxis.toString()}, #{@zAxis.toString()}, #{@trans.toString()})"

  toCSSTransform: ->
    'matrix3d(' +
      "#{@xAxis.x}, #{@xAxis.y}, #{@xAxis.z}, 0, " +
      "#{@yAxis.x}, #{@yAxis.y}, #{@yAxis.z}, 0, " +
      "#{@zAxis.x}, #{@zAxis.y}, #{@zAxis.z}, 0, " +
      "#{@trans.x}, #{@trans.y}, #{@trans.z}, 1)"

DivSugar.Matrix.UNIT = new DivSugar.Matrix 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0

DivSugar.Matrix._tmpVec1 = new DivSugar.Vector()
DivSugar.Matrix._tmpVec2 = new DivSugar.Vector()
DivSugar.Matrix._tmpVec3 = new DivSugar.Vector()
DivSugar.Matrix._tmpMat1 = new DivSugar.Matrix()
# _tmpQuat1 and _tmpQuat2 are defined in Quaternion.js
