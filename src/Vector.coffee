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
    switch arguments.length
      when 1
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
    if norm < 0.001 then @set Vector.X_UNIT else @div norm

  rotateX: (deg) ->
    sin = Math.sin deg # TODO
    cos = Math.cos deg
    @set @x, @y * cos - @z * sin, @z * cos + @y * sin

  rotateY: (deg) ->
    sin = Math.sin deg
    cos = Math.cos deg
    @set @x * cos + @z * sin, @y, @z * cos - @x * sin

  rotateZ: (deg) ->
    sin = Math.sin deg
    cos = Math.cos deg
    @set @x * cos - @y * sin, @y * cos + @x * sin, @z
###
  lerp: (to, ratio) ->
    if ratio > 1 - @_EPSILON
      @set to
    else ratio >= @_EPSILON
      vec = @_vec1
      @set(to).multiply(ratio)
      @multiply(1 - ratio).add(vec)

#  _vec1:: new Vector
###

###
b9.Vector3D.prototype.toLocal = function(mat) {
    var vec = b9.Vector3D._vec1;

    vec.set(this).sub(mat.trans);

    return this.set(
            vec.dot(mat.xAxis) / mat.xAxis.sqNorm(),
            vec.dot(mat.yAxis) / mat.yAxis.sqNorm(),
            vec.dot(mat.zAxis) / mat.zAxis.sqNorm());
};

b9.Vector3D.prototype.toGlobal = function(mat) {
    var vec1 = b9.Vector3D._vec1;
    var vec2 = b9.Vector3D._vec2;
    var vec3 = b9.Vector3D._vec3;

    vec1.set(mat.xAxis).mul(this.x);
    vec2.set(mat.yAxis).mul(this.y);
    vec3.set(mat.zAxis).mul(this.z);

    return this.set(vec1).add(vec2).add(vec3).add(mat.trans);
};

b9.Vector3D.prototype.toLocal_noTrans = function(mat) {
    var vec = b9.Vector3D._vec1;

    vec.set(
            this.dot(mat.xAxis) / mat.xAxis.sqNorm(),
            this.dot(mat.yAxis) / mat.yAxis.sqNorm(),
            this.dot(mat.zAxis) / mat.zAxis.sqNorm());

    return this.set(vec);
};

b9.Vector3D.prototype.toGlobal_noTrans = function(mat) {
    var vec1 = b9.Vector3D._vec1;
    var vec2 = b9.Vector3D._vec2;
    var vec3 = b9.Vector3D._vec3;

    vec1.set(mat.xAxis).mul(this.x);
    vec2.set(mat.yAxis).mul(this.y);
    vec3.set(mat.zAxis).mul(this.z);

    return this.set(vec1).add(vec2).add(vec3);
};

b9.Vector3D.prototype.equals = function(vec) {
    return (b9.Math.equals_float(this.x, vec.x) &&
            b9.Math.equals_float(this.y, vec.y) &&
            b9.Math.equals_float(this.z, vec.z));
};

b9.Vector3D.prototype.toString = function() {
    var str;

    str = "(";
    str += this.x;
    str += ", ";
    str += this.y;
    str += ", ";
    str += this.z;
    str += ")";

    return str;
};

b9.Vector3D.ZERO = new b9.Vector3D(0.0, 0.0, 0.0);

b9.Vector3D.X_UNIT = new b9.Vector3D(1.0, 0.0, 0.0);

b9.Vector3D.Y_UNIT = new b9.Vector3D(0.0, 1.0, 0.0);

b9.Vector3D.Z_UNIT = new b9.Vector3D(0.0, 0.0, 1.0);

b9.Vector3D._vec1 = new b9.Vector3D();
b9.Vector3D._vec2 = new b9.Vector3D();
b9.Vector3D._vec3 = new b9.Vector3D();

###
