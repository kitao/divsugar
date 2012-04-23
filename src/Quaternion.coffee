class DivSugar.Quaternion
  constructor: (x, y, z, w) ->
    switch arguments.length
      when 0
        @x = @y = @z = @w = 0

      when 1
        quat = x
        @x = quat.x
        @y = quat.y
        @z = quat.z
        @w = quat.w

      else
        @x = x
        @y = y
        @z = z
        @w = w

  set: (x, y, z, w) ->
    if arguments.length is 1
      quat = x
      @x = quat.x
      @y = quat.y
      @z = quat.z
      @w = quat.w
    else
      @x = x
      @y = y
      @z = z
      @w = w

    return @

  fromMatrix: (mat) ->
    matXAxis = mat.xAxis
    matYAxis = mat.yAxis
    matZAxis = mat.zAxis
    trace = matXAxis.x + matYAxis.y + matZAxis.z

    if trace > 0
      root = Math.sqrt trace + 1
      scale = 0.5 / root
      @set (matYAxis.z - matZAxis.y) * scale, (matZAxis.x - matXAxis.z) * scale, (matXAxis.y - matYAxis.x) * scale, root * 0.5
    else
      k = if matYAxis.y > matXAxis.x then (if matZAxis.z > matYAxis.y then 2 else 1) else (if matZAxis.z > matXAxis.x then 2 else 0)

      switch k
        when 0
          root = Math.sqrt matXAxis.x - (matYAxis.y + matZAxis.z) + 1
          scale = if root isnt 0 then 0.5 / root else root
          @set root * 0.5, (matXAxis.y + matYAxis.x) * scale, (matZAxis.x + matXAxis.z) * scale, (matYAxis.z - matZAxis.y) * scale
        when 1
          root = Math.sqrt matYAxis.y - (matZAxis.z + matXAxis.x) + 1
          scale = if root isnt 0 then 0.5 / root else root
          @set (matXAxis.y + matYAxis.x) * scale, root * 0.5, (matYAxis.z + matZAxis.y) * scale, (matZAxis.x - matXAxis.z) * scale
        else # 2
          root = Math.sqrt matZAxis.z - (matXAxis.x + matYAxis.y) + 1
          scale = if root isnt 0 then 0.5 / root else root
          @set (matZAxis.x + matXAxis.z) * scale, (matYAxis.z + matZAxis.y) * scale, root * 0.5, (matXAxis.y - matYAxis.x) * scale

    return @

  slerp: (to, ratio) ->
    if ratio > 1 - DivSugar.EPSILON
      @set to
    else if ratio >= DivSugar.EPSILON
      quat = DivSugar.Quaternion._tmpQuat1
      cosOmega = @x * to.x + @y * to.y + @z * to.z + @w * to.w

      if cosOmega < 0
        cosOmega = -cosOmega
        quat.set -to.x, -to.y, -to.z, -to.w
      else
        quat.set to

      if cosOmega >= 1
        @set to
      else
        omega = Math.acos if cosOmega > 1 then 1 else cosOmega
        sinOmega = Math.sin omega
        scale0 = Math.sin(omega * (1 - ratio)) / sinOmega
        scale1 = Math.sin(omega * ratio) / sinOmega

        @set @x * scale0 + quat.x * scale1, @y * scale0 + quat.y * scale1, @z * scale0 + quat.z * scale1, @w * scale0 + quat.w * scale1

    return @

  equal: (quat) -> @x is quat.x and @y is quat.y and @z is quat.z and @w is quat.w

  toString: -> "(#{@x}, #{@y}, #{@z}, #{@w})"

DivSugar.Quaternion._tmpQuat1 = new DivSugar.Quaternion

DivSugar.Matrix._tmpQuat1 = new DivSugar.Quaternion
DivSugar.Matrix._tmpQuat2 = new DivSugar.Quaternion
