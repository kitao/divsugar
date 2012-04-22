(function() {
  var DivSugar,
    __slice = Array.prototype.slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DivSugar = {
    _initialize: function() {
      var div, perspective, perspectiveOrigin, prefix, requestAnimationFrame, transform, transformOrigin, transformStyle, updateTasks, _i, _len, _ref,
        _this = this;
      this.VERSION = '0.10';
      this.EPSILON = 0.0001;
      this.DEG_TO_RAD = Math.PI / 180;
      this.RAD_TO_DEG = 180 / Math.PI;
      this.rootTask = null;
      this._transform = 'transform';
      this._transformStyle = 'transformStyle';
      this._transformOrigin = 'transformOrigin';
      this._perspective = 'perspective';
      this._perspectiveOrigin = 'perspectiveOrigin';
      this._requestAnimationFrame = 'requestAnimationFrame';
      div = document.createElement('div');
      _ref = ['webkit', 'moz', 'ms', 'o'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prefix = _ref[_i];
        transform = prefix + 'Transform';
        if (div.style[transform] != null) this._transform = transform;
        transformStyle = prefix + 'TransformStyle';
        if (div.style[transformStyle] != null) {
          this._transformStyle = transformStyle;
        }
        transformOrigin = prefix + 'TransformOrigin';
        if (div.style[transformOrigin] != null) {
          this._transformOrigin = transformOrigin;
        }
        perspective = prefix + 'Perspective';
        if (div.style[perspective] != null) this._perspective = perspective;
        perspectiveOrigin = prefix + 'PerspectiveOrigin';
        if (div.style[perspectiveOrigin] != null) {
          this._perspectiveOrigin = perspectiveOrigin;
        }
        requestAnimationFrame = prefix + 'RequestAnimationFrame';
        if (window[requestAnimationFrame] != null) {
          this._requestAnimationFrame = requestAnimationFrame;
        }
      }
      if (window[this._requestAnimationFrame] != null) {
        requestAnimationFrame = this._requestAnimationFrame;
        this._requestAnimationFrame = function(callback) {
          return window[requestAnimationFrame](callback);
        };
      } else {
        this._requestAnimationFrame = function(callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
      }
      updateTasks = function() {
        _this.rootTask.update(1);
        return _this._requestAnimationFrame(updateTasks);
      };
      return this._requestAnimationFrame(updateTasks);
    },
    createScene: function() {
      var args, div, func, name, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      div = document.createElement('div');
      _ref = this._Scene;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      div._initialize.apply(div, args);
      return div;
    },
    createSprite: function() {
      var args, div, func, name, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      div = document.createElement('div');
      _ref = this._Sprite;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      div._initialize.apply(div, args);
      return div;
    },
    createTask: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return typeof result === "object" ? result : child;
      })(this._Task, args, function() {});
    }
  };

  (window.DivSugar = DivSugar)._initialize();

  DivSugar.Vector = (function() {

    function Vector(x, y, z) {
      var vec;
      switch (arguments.length) {
        case 0:
          this.x = this.y = this.z = 0;
          break;
        case 1:
          vec = x;
          this.x = vec.x;
          this.y = vec.y;
          this.z = vec.z;
          break;
        default:
          this.x = x;
          this.y = y;
          this.z = z;
      }
    }

    Vector.prototype.set = function(x, y, z) {
      var vec;
      if (arguments.length === 1) {
        vec = x;
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
      }
      return this;
    };

    Vector.prototype.neg = function() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    };

    Vector.prototype.add = function(vec) {
      this.x += vec.x;
      this.y += vec.y;
      this.z += vec.z;
      return this;
    };

    Vector.prototype.sub = function(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
      this.z -= vec.z;
      return this;
    };

    Vector.prototype.mul = function(s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    };

    Vector.prototype.div = function(s) {
      var rs;
      rs = 1 / s;
      this.x *= rs;
      this.y *= rs;
      this.z *= rs;
      return this;
    };

    Vector.prototype.norm = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    Vector.prototype.sqNorm = function() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    };

    Vector.prototype.dist = function(vec) {
      return DivSugar.Vector._tmpVec1.set(this).sub(vec).norm();
    };

    Vector.prototype.sqDist = function(vec) {
      return DivSugar.Vector._tmpVec1.set(this).sub(vec).sqNorm();
    };

    Vector.prototype.dot = function(vec) {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    };

    Vector.prototype.cross = function(vec) {
      return this.set(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
    };

    Vector.prototype.normalize = function() {
      var norm;
      norm = this.norm();
      if (norm < DivSugar.EPSILON) {
        return this.set(DivSugar.Vector.X_UNIT);
      } else {
        return this.div(norm);
      }
    };

    Vector.prototype.rotateX = function(deg) {
      var cos, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      return this.set(this.x, this.y * cos - this.z * sin, this.z * cos + this.y * sin);
    };

    Vector.prototype.rotateY = function(deg) {
      var cos, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      return this.set(this.x * cos + this.z * sin, this.y, this.z * cos - this.x * sin);
    };

    Vector.prototype.rotateZ = function(deg) {
      var cos, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      return this.set(this.x * cos - this.y * sin, this.y * cos + this.x * sin, this.z);
    };

    Vector.prototype.lerp = function(to, ratio) {
      var vec;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        vec = DivSugar.Vector._tmpVec1;
        vec.set(to).mul(ratio);
        this.mul(1 - ratio).add(vec);
      }
      return this;
    };

    Vector.prototype.toLocal = function(mat) {
      var vec;
      vec = DivSugar.Vector._tmpVec1;
      vec.set(this.sub(mat.trans));
      return this.set(vec.dot(mat.xAxis) / mat.xAxis.sqNorm(), vec.dot(mat.yAxis) / mat.yAxis.sqNorm(), vec.dot(mat.zAxis) / mat.zAxis.sqNorm());
    };

    Vector.prototype.toGlobal = function(mat) {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Vector._tmpVec1;
      vec2 = DivSugar.Vector._tmpVec2;
      vec3 = DivSugar.Vector._tmpVec3;
      vec1.set(mat.xAxis).mul(this.x);
      vec2.set(mat.yAxis).mul(this.y);
      vec3.set(mat.zAxis).mul(this.z);
      return this.set(vec1).add(vec2).add(vec3).add(mat.trans);
    };

    Vector.prototype.toLocal_noTrans = function(mat) {
      var vec;
      vec = DivSugar.Vector._tmpVec1;
      vec.set(this.dot(mat.xAxis) / mat.xAxis.sqNorm(), this.dot(mat.yAxis) / mat.yAxis.sqNorm(), this.dot(mat.zAxis) / mat.zAxis.sqNorm());
      return this.set(vec);
    };

    Vector.prototype.toGlobal_noTrans = function(mat) {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Vector._tmpVec1;
      vec2 = DivSugar.Vector._tmpVec2;
      vec3 = DivSugar.Vector._tmpVec3;
      vec1.set(mat.xAxis).mul(this.x);
      vec2.set(mat.yAxis).mul(this.y);
      vec3.set(mat.zAxis).mul(this.z);
      return this.set(vec1).add(vec2).add(vec3);
    };

    Vector.prototype.equal = function(vec) {
      return this.x === vec.x && this.y === vec.y && this.z === vec.z;
    };

    Vector.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    };

    return Vector;

  })();

  DivSugar.Vector.ZERO = new DivSugar.Vector(0, 0, 0);

  DivSugar.Vector.X_UNIT = new DivSugar.Vector(1, 0, 0);

  DivSugar.Vector.Y_UNIT = new DivSugar.Vector(0, 1, 0);

  DivSugar.Vector.Z_UNIT = new DivSugar.Vector(0, 0, 1);

  DivSugar.Vector._tmpVec1 = new DivSugar.Vector;

  DivSugar.Vector._tmpVec2 = new DivSugar.Vector;

  DivSugar.Vector._tmpVec3 = new DivSugar.Vector;

  DivSugar.Matrix = (function() {

    function Matrix(xAxis, yAxis, zAxis, trans) {
      var mat;
      switch (arguments.length) {
        case 0:
          this.xAxis = new DivSugar.Vector;
          this.yAxis = new DivSugar.Vector;
          this.zAxis = new DivSugar.Vector;
          this.trans = new DivSugar.Vector;
          break;
        case 1:
          mat = xAxis;
          this.xAxis = new DivSugar.Vector(mat.xAxis);
          this.yAxis = new DivSugar.Vector(mat.yAxis);
          this.zAxis = new DivSugar.Vector(mat.zAxis);
          this.trans = new DivSugar.Vector(mat.trans);
          break;
        default:
          this.xAxis = new DivSugar.Vector(xAxis);
          this.yAxis = new DivSugar.Vector(yAxis);
          this.zAxis = new DivSugar.Vector(zAxis);
          this.trans = new DivSugar.Vector(trans);
      }
    }

    Matrix.prototype.set = function(xAxis, yAxis, zAxis, trans) {
      var mat;
      if (arguments.length === 1) {
        mat = xAxis;
        this.xAxis.set(mat.xAxis);
        this.yAxis.set(mat.yAxis);
        this.zAxis.set(mat.zAxis);
        this.trans.set(mat.trans);
      } else {
        this.xAxis.set(xAxis);
        this.yAxis.set(yAxis);
        this.zAxis.set(zAxis);
        this.trans.set(trans);
      }
      return this;
    };

    Matrix.prototype.fromQuaternion = function(quat) {
      var quatW, quatX, quatY, quatZ, wx2, wy2, wz2, x2, xx2, xy2, xz2, y2, yy2, yz2, z2, zz2;
      quatX = quat.x;
      quatY = quat.y;
      quatZ = quat.z;
      quatW = quat.w;
      x2 = quatX + quatX;
      y2 = quatY + quatY;
      z2 = quatZ + quatZ;
      wx2 = quatW * x2;
      wy2 = quatW * y2;
      wz2 = quatW * z2;
      xx2 = quatX * x2;
      xy2 = quatX * y2;
      xz2 = quatX * z2;
      yy2 = quatY * y2;
      yz2 = quatY * z2;
      zz2 = quatZ * z2;
      this.xAxis.set(1 - (yy2 + zz2), xy2 + wz2, xz2 - wy2);
      this.yAxis.set(xy2 - wz2, 1 - (xx2 + zz2), yz2 + wx2);
      this.zAxis.set(xz2 + wy2, yz2 - wx2, 1 - (xx2 + yy2));
      this.trans.set(DivSugar.Vector.ZERO);
      return this;
    };

    Matrix.prototype.orthonormalize = function() {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Matrix._tmpVec1;
      vec2 = DivSugar.Matrix._tmpVec2;
      vec3 = DivSugar.Matrix._tmpVec3;
      vec3.set(this.zAxis).normalize();
      vec1.set(this.yAxis).cross(this.zAxis).normalize();
      vec2.set(vec3).cross(vec1);
      return this.set(vec1, vec2, vec3, this.trans);
    };

    Matrix.prototype.rotateX = function(deg) {
      var cos, mat, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      mat = DivSugar.Matrix._tmpMat1;
      mat.xAxis.set(DivSugar.Vector.X_UNIT);
      mat.yAxis.set(0, cos, sin);
      mat.zAxis.set(0, -sin, cos);
      mat.trans.set(DivSugar.Vector.ZERO);
      mat.toGlobal(this);
      return this.set(mat);
    };

    Matrix.prototype.rotateY = function(deg) {
      var cos, mat, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      mat = DivSugar.Matrix._tmpMat1;
      mat.xAxis.set(cos, 0, -sin);
      mat.yAxis.set(DivSugar.Vector.Y_UNIT);
      mat.zAxis.set(sin, 0, cos);
      mat.trans.set(DivSugar.Vector.ZERO);
      mat.toGlobal(this);
      return this.set(mat);
    };

    Matrix.prototype.rotateZ = function(deg) {
      var cos, mat, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      mat = DivSugar.Matrix._tmpMat1;
      mat.xAxis.set(cos, sin, 0);
      mat.yAxis.set(-sin, cos, 0);
      mat.zAxis.set(DivSugar.Vector.Z_UNIT);
      mat.trans.set(DivSugar.Vector.ZERO);
      mat.toGlobal(this);
      return this.set(mat);
    };

    Matrix.prototype.scale = function(scaleX, scaleY, scaleZ) {
      this.xAxis.mul(scaleX);
      this.yAxis.mul(scaleY);
      this.zAxis.mul(scaleZ);
      return this;
    };

    Matrix.prototype.translate = function(offsetX, offsetY, offsetZ) {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Matrix._tmpVec1;
      vec2 = DivSugar.Matrix._tmpVec2;
      vec3 = DivSugar.Matrix._tmpVec3;
      vec1.set(this.xAxis.mul(offsetX));
      vec2.set(this.yAxis.mul(offsetY));
      vec3.set(this.zAxis.mul(offsetZ));
      this.trans.add(vec1).add(vec2).add(vec3);
      return this;
    };

    Matrix.prototype.slerp = function(to, ratio) {
      var quat1, quat2, vec;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        vec = DivSugar.Matrix._tmpVec1;
        quat1 = DivSugar.Matrix._tmpQuat1;
        quat2 = DivSugar.Matrix._tmpQuat2;
        quat1.fromMatrix(this);
        quat2.fromMatrix(to);
        vec.set(this.trans).lerp(to.trans, ratio);
        this.fromQuaternion(quat1.slerp(quat2, ratio));
        this.trans.set(vec);
      }
      return this;
    };

    Matrix.prototype.slerp_noTrans = function(to, ratio) {
      var quat1, quat2;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.xAxis.set(to.xAxis);
        this.yAxis.set(to.yAxis);
        this.zAxis.set(to.zAxis);
        this.trans.set(DivSugar.Vector.ZERO);
      } else if (ratio >= DivSugar.EPSILON) {
        quat1 = DivSugar.Matrix._tmpQuat1;
        quat2 = DivSugar.Matrix._tmpQuat2;
        quat1.fromMatrix(this);
        quat2.fromMatrix(to);
        this.fromQuaternion(quat1.slerp(quat2, ratio));
      } else {
        this.trans.set(DivSugar.Vector.ZERO);
      }
      return this;
    };

    Matrix.prototype.toLocal = function(mat) {
      var rsqXA, rsqYA, rsqZA, vec;
      vec = DivSugar.Matrix._tmpVec1;
      rsqXA = 1 / mat.xAxis.sqNorm();
      rsqYA = 1 / mat.yAxis.sqNorm();
      rsqZA = 1 / mat.zAxis.sqNorm();
      vec.set(this.trans).sub(mat.trans);
      this.xAxis.set(this.xAxis.dot(mat.xAxis) * rsqXA, this.xAxis.dot(mat.yAxis) * rsqYA, this.xAxis.dot(mat.zAxis) * rsqZA);
      this.yAxis.set(this.yAxis.dot(mat.xAxis) * rsqXA, this.yAxis.dot(mat.yAxis) * rsqYA, this.yAxis.dot(mat.zAxis) * rsqZA);
      this.zAxis.set(this.zAxis.dot(mat.xAxis) * rsqXA, this.zAxis.dot(mat.yAxis) * rsqYA, this.zAxis.dot(mat.zAxis) * rsqZA);
      this.trans.set(vec.dot(mat.xAxis) * rsqXA, vec.dot(mat.yAxis) * rsqYA, vec.dot(mat.zAxis) * rsqZA);
      return this;
    };

    Matrix.prototype.toGlobal = function(mat) {
      this.xAxis.toGlobal_noTrans(mat);
      this.yAxis.toGlobal_noTrans(mat);
      this.zAxis.toGlobal_noTrans(mat);
      this.trans.toGlobal(mat);
      return this;
    };

    Matrix.prototype.toLocal_noTrans = function(mat) {
      var rsqXA, rsqYA, rsqZA;
      rsqXA = 1 / mat.xAxis.sqNorm();
      rsqYA = 1 / mat.yAxis.sqNorm();
      rsqZA = 1 / mat.zAxis.sqNorm();
      this.xAxis.set(this.xAxis.dot(mat.xAxis) * rsqXA, this.xAxis.dot(mat.yAxis) * rsqYA, this.xAxis.dot(mat.zAxis) * rsqZA);
      this.yAxis.set(this.yAxis.dot(mat.xAxis) * rsqXA, this.yAxis.dot(mat.yAxis) * rsqYA, this.yAxis.dot(mat.zAxis) * rsqZA);
      this.zAxis.set(this.zAxis.dot(mat.xAxis) * rsqXA, this.zAxis.dot(mat.yAxis) * rsqYA, this.zAxis.dot(mat.zAxis) * rsqZA);
      this.trans.set(DivSugar.Vector.ZERO);
      return this;
    };

    Matrix.prototype.toGlobal_noTrans = function(mat) {
      this.xAxis.toGlobal_noTrans(mat);
      this.yAxis.toGlobal_noTrans(mat);
      this.zAxis.toGlobal_noTrans(mat);
      this.trans.set(DivSugar.Vector.ZERO);
      return this;
    };

    Matrix.prototype.lookAt = function(from, to, up) {
      this.zAxis.set(from).sub(to).normalize();
      this.xAxis.set(up).cross(this.zAxis).normalize();
      this.yAxis.set(this.zAxis).cross(this.xAxis);
      this.trans.set(from);
      return this;
    };

    Matrix.prototype.equal = function(mat) {
      return this.xAxis.equals(mat.xAxis) && this.yAxis.equals(mat.yAxis) && this.zAxis.equals(mat.zAxis) && this.trans.equals(mat.trans);
    };

    Matrix.prototype.toString = function() {
      return "(" + (this.xAxis.toString()) + ", " + (this.yAxis.toString()) + ", " + (this.zAxis.toString()) + ", " + (this.trans.toString()) + ")";
    };

    return Matrix;

  })();

  DivSugar.Matrix.UNIT = new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.ZERO);

  DivSugar.Matrix._tmpVec1 = new DivSugar.Vector;

  DivSugar.Matrix._tmpVec2 = new DivSugar.Vector;

  DivSugar.Matrix._tmpVec3 = new DivSugar.Vector;

  DivSugar.Matrix._tmpMat1 = new DivSugar.Matrix;

  DivSugar.Quaternion = (function() {

    function Quaternion(x, y, z, w) {
      var quat;
      switch (arguments.length) {
        case 0:
          this.x = this.y = this.z = this.w = 0;
          break;
        case 1:
          quat = x;
          this.x = quat.x;
          this.y = quat.y;
          this.z = quat.z;
          this.w = quat.w;
          break;
        default:
          this.x = x;
          this.y = y;
          this.z = z;
          this.w = w;
      }
    }

    Quaternion.prototype.set = function(x, y, z, w) {
      var quat;
      if (arguments.length === 1) {
        quat = x;
        this.x = quat.x;
        this.y = quat.y;
        this.z = quat.z;
        this.w = quat.w;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }
      return this;
    };

    Quaternion.prototype.fromMatrix = function(mat) {
      var k, matXAxis, matYAxis, matZAxis, root, scale, trace;
      matXAxis = mat.xAxis;
      matYAxis = mat.yAxis;
      matZAxis = mat.zAxis;
      trace = matXAxis.x + matYAxis.y + matZAxis.z;
      if (trace > 0) {
        root = Math.sqrt(trace + 1);
        scale = 0.5 / root;
        this.set((matYAxis.z - matZAxis.y) * scale, (matZAxis.x - matXAxis.z) * scale, (matXAxis.y - matYAxis.x) * scale, root * 0.5);
      } else {
        k = matYAxis.y > matXAxis.x ? (matZAxis.z > matYAxis.y ? 2 : 1) : (matZAxis.z > matXAxis.x ? 2 : 0);
        if (k === 0) {
          root = Math.sqrt(matXAxis.x - (matYAxis.y + matZAxis.z) + 1);
          scale = root !== 0.0 ? 0.5 / root : root;
          this.set(root * 0.5, (matXAxis.y + matYAxis.x) * scale, (matZAxis.x + matXAxis.z) * scale, (matYAxis.z - matZAxis.y) * scale);
        } else if (k === 1) {
          root = Math.sqrt(matYAxis.y - (matZAxis.z + matXAxis.x) + 1);
          scale = root !== 0 ? 0.5 / root : root;
          this.set((matXAxis.y + matYAxis.x) * scale, root * 0.5, (matYAxis.z + matZAxis.y) * scale, (matZAxis.x - matXAxis.z) * scale);
        } else {
          root = Math.sqrt(matZAxis.z - (matXAxis.x + matYAxis.y) + 1.0);
          scale = root !== 0 ? 0.5 / root : root;
          this.set((matZAxis.x + matXAxis.z) * scale, (matYAxis.z + matZAxis.y) * scale, root * 0.5, (matXAxis.y - matYAxis.x) * scale);
        }
      }
      return this;
    };

    Quaternion.prototype.slerp = function(to, ratio) {
      var cosOmega, omega, quat, scale0, scale1, sinOmega;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        quat = DivSugar.Quaternion._tmpQuat1;
        cosOmega = this.x * to.x + this.y * to.y + this.z * to.z + this.w * to.w;
        if (cosOmega < 0) {
          cosOmega = -cosOmega;
          quat.set(-to.x, -to.y, -to.z, -to.w);
        } else {
          quat.set(to);
        }
        if (cosOmega >= 1) {
          this.set(to);
        } else {
          omega = Math.acos(cosOmega > 1 ? void 0 : {
            1: cosOmega
          });
          sinOmega = Math.sin(omega);
          scale0 = Math.sin(omega * (1.0 - ratio)) / sinOmega;
          scale1 = Math.sin(omega * ratio) / sinOmega;
          this.set(this.x * scale0 + quat.x * scale1, this.y * scale0 + quat.y * scale1, this.z * scale0 + quat.z * scale1, this.w * scale0 + quat.w * scale1);
        }
      }
      return this;
    };

    Quaternion.prototype.equal = function(quat) {
      return this.x === quat.x && this.y === quat.y && this.z === quat.z && this.w === quat.w;
    };

    Quaternion.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    };

    return Quaternion;

  })();

  DivSugar.Quaternion._tmpQuat1 = new DivSugar.Quaternion;

  DivSugar.Matrix._tmpQuat1 = new DivSugar.Quaternion;

  DivSugar.Matrix._tmpQuat2 = new DivSugar.Quaternion;

  DivSugar._Scene = {
    _initialize: function(id) {
      this.id = id != null ? id : null;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.style[DivSugar._transformStyle] = 'preserve-3d';
      this.style[DivSugar._transformOrigin] = '0% 0% 0%';
      this.style[DivSugar._perspectiveOrigin] = '0% 0% 0%';
      this.setPerspective(1000);
      this.setSize(100, 100);
      this.setPosition(0, 0);
      this.setVisible(true);
      this.setClip(true);
      this.setOpacity(1);
      this.setImage('#0000ff');
      return this.setImageClip(0, 0, 1, 1);
    },
    getPerspective: function() {
      return this._perspective;
    },
    setPerspective: function(perspective) {
      this._perspective = perspective;
      this.style[DivSugar._perspective] = "" + perspective + "px";
      return this;
    },
    getWidth: function() {
      return this._width;
    },
    getHeight: function() {
      return this._height;
    },
    getViewWidth: function() {
      return this._viewWidth;
    },
    getViewHeight: function() {
      return this._viewHeight;
    },
    setSize: function(width, height, viewWidth, viewHeight) {
      var sx, sy, x, y;
      if (viewWidth == null) viewWidth = width;
      if (viewHeight == null) viewHeight = height;
      this._width = width;
      this._height = height;
      this._viewWidth = viewWidth;
      this._viewHeight = viewHeight;
      x = (width - viewWidth) / 2;
      y = (height - viewHeight) / 2;
      sx = width / viewWidth;
      sy = height / viewHeight;
      this.style.width = "" + viewWidth + "px";
      this.style.height = "" + viewHeight + "px";
      this.style[DivSugar._transform] = "translate(" + x + "px, " + y + "px) scale(" + sx + ", " + sy + ")";
      this.setImageClip(this._imageClipU1, this._imageClipV1, this._imageClipU2, this._imageClipV2);
      return this;
    },
    getPositionX: function() {
      return this._positionX;
    },
    getPositionY: function() {
      return this._positionY;
    },
    setPosition: function(x, y) {
      this._positionX = x;
      this._positionY = y;
      this.style.left = "" + x + "px";
      this.style.top = "" + y + "px";
      return this;
    },
    getVisible: function() {
      return this._visible;
    },
    setVisible: function(visible) {
      this._visible = visible;
      this.style.visibility = visible ? "visible" : "hidden";
      return this;
    },
    getClip: function() {
      return this._clip;
    },
    setClip: function(clip) {
      this._clip = clip;
      this.style.overflow = clip ? "hidden" : "visible";
      return this;
    },
    getOpacity: function() {
      return this._opacity;
    },
    setOpacity: function(opacity) {
      this._opacity = this.style.opacity = opacity;
      return this;
    },
    getImage: function() {
      return this._image;
    },
    setImage: function(image) {
      this._image = image;
      if (!(image != null)) {
        this.style.backgroundColor = null;
        this.style.backgroundImage = null;
      } else if (image.charAt(0) === '#') {
        this.style.backgroundColor = image;
        this.style.backgroundImage = null;
      } else {
        this.style.backgroundColor = null;
        this.style.backgroundImage = "url(" + image + ")";
      }
      return this;
    },
    getImageClipU1: function() {
      return this._imageClipU1;
    },
    getImageClipV1: function() {
      return this._imageClipV1;
    },
    getImageClipU2: function() {
      return this._imageClipU2;
    },
    getImageClipV2: function() {
      return this._imageClipV2;
    },
    setImageClip: function(u1, v1, u2, v2) {
      var h, w, x, y;
      this._imageClipU1 = u1;
      this._imageClipV1 = v1;
      this._imageClipU2 = u2;
      this._imageClipV2 = v2;
      w = this._viewWidth / (u2 - u1);
      h = this._viewHeight / (v2 - v1);
      x = -u1 * w;
      y = -v1 * h;
      this.style.backgroundPosition = "" + x + "px " + y + "px";
      this.style.backgroundSize = "" + w + "px " + h + "px";
      return this;
    }
  };

  DivSugar._Sprite = {
    _initialize: function(id) {
      this.id = id != null ? id : null;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'absolute';
      this.style[DivSugar._transformStyle] = 'preserve-3d';
      this.style[DivSugar._transformOrigin] = '0% 0% 0%';
      this.setSize(100, 100);
      this.setPosition(0, 0, 0);
      this.setRotation(0, 0, 0);
      this.setScale(1, 1, 1);
      this.setVisible(true);
      this.setClip(false);
      this.setOpacity(1);
      this.setImage(null);
      return this.setImageClip(0, 0, 1, 1);
    },
    getWidth: function() {
      return this._width;
    },
    getHeight: function() {
      return this._height;
    },
    setSize: function(width, height) {
      this._width = width;
      this._height = height;
      this.style.width = "" + width + "px";
      this.style.height = "" + height + "px";
      this.setImageClip(this._imageClipU1, this._imageClipV1, this._imageClipU2, this._imageClipV2);
      return this;
    },
    getPositionX: function() {
      return this._positionX;
    },
    getPositionY: function() {
      return this._positionY;
    },
    getPositionZ: function() {
      return this._positionZ;
    },
    getPosicion: function(vec) {
      vec.x = this._positionX;
      vec.y = this._positionY;
      return vec.z = this._positionZ;
    },
    setPosition: function(x, y, z) {
      var vec;
      if (arguments.length === 1) {
        vec = x;
        this._positionX = vec.x;
        this._positionY = vec.y;
        this._positionZ = vec.z;
      } else {
        this._positionX = x;
        this._positionY = y;
        this._positionZ = z;
      }
      this._ps = "translate3d(" + this._positionX + "px, " + this._positionY + "px, " + this._positionZ + "px) ";
      this.style[DivSugar._transform] = this._ps + this._rs + this._ss;
      return this;
    },
    getRotationX: function() {
      return this._rotationX;
    },
    getRotationY: function() {
      return this._rotationY;
    },
    getRotationZ: function() {
      return this._rotationZ;
    },
    getRotation: function(rotation) {
      rotation.x = this._rotationX;
      rotation.y = this._rotationY;
      return rotation.z = this._rotationZ;
    },
    setRotation: function(x, y, z) {
      var rotation;
      if (arguments.length === 1) {
        rotation = x;
        this._rotationX = rotation.x;
        this._rotationY = rotation.y;
        this._rotationZ = rotation.z;
      } else {
        this._rotationX = x;
        this._rotationY = y;
        this._rotationZ = z;
      }
      this._rs = "rotateX(" + this._rotationX + "deg) rotateY(" + this._rotationY + "deg) rotateZ(" + this._rotationZ + "deg) ";
      this.style[DivSugar._transform] = this._ps + this._rs + this._ss;
      return this;
    },
    getScaleX: function() {
      return this._scaleX;
    },
    getScaleY: function() {
      return this._scaleX;
    },
    getScaleZ: function() {
      return this._scaleX;
    },
    getScale: function(scale) {
      scale.x = this._scaleX;
      scale.y = this._scaleY;
      return scale.z = this._scaleZ;
    },
    setScale: function(x, y, z) {
      var scale;
      if (arguments === 1) {
        scale = x;
        this._scaleX = scale.x;
        this._scaleY = scale.y;
        this._scaleZ = scale.z;
      } else {
        this._scaleX = x;
        this._scaleY = y;
        this._scaleZ = z;
      }
      this._ss = "scale3d(" + this._scaleX + ", " + this._scaleY + ", " + this._scaleZ + ")";
      this.style[DivSugar._transform] = this._ps + this._rs + this._ss;
      return this;
    },
    getVisible: DivSugar._Scene.getVisible,
    setVisible: DivSugar._Scene.setVisible,
    getClip: DivSugar._Scene.getClip,
    setClip: DivSugar._Scene.setClip,
    getOpacity: DivSugar._Scene.getOpacity,
    setOpacity: DivSugar._Scene.setOpacity,
    getImage: DivSugar._Scene.getImage,
    setImage: DivSugar._Scene.setImage,
    getImageClip: DivSugar._Scene.getImageClip,
    setImageClip: function(u1, v1, u2, v2) {
      var h, w, x, y;
      this._imageClipU1 = u1;
      this._imageClipV1 = v1;
      this._imageClipU2 = u2;
      this._imageClipV2 = v2;
      w = this._width / (u2 - u1);
      h = this._height / (v2 - v1);
      x = -u1 * w;
      y = -v1 * h;
      this.style.backgroundPosition = "" + x + "px " + y + "px";
      this.style.backgroundSize = "" + w + "px " + h + "px";
      return this;
    }
  };

  DivSugar._Task = (function() {

    function _Task(id) {
      this.id = id;
      this.update = __bind(this.update, this);
      this.active = true;
      this.onUpdate = null;
      this.onDestroy = null;
      this._parent = null;
      this._children = [];
    }

    _Task.prototype.update = function(frameCount) {
      var child, _i, _len, _ref, _results;
      if (this.active) {
        if (typeof this.onUpdate === "function") this.onUpdate(frameCount);
        _ref = this._children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.update(frameCount));
        }
        return _results;
      }
    };

    _Task.prototype.destroy = function() {
      var child, _i, _len, _ref, _results;
      if (typeof this.onDestroy === "function") this.onDestroy();
      this._parent.removeChild(this);
      _ref = this._children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.destroy());
      }
      return _results;
    };

    _Task.prototype.appendChild = function(task) {
      this.removeChild(task);
      this._children.push(task);
      return task._parent = this;
    };

    _Task.prototype.removeChild = function(task) {
      var i;
      i = this._children.indexOf(task);
      if (i > -1) {
        this._children.splice(i, 1);
        return task._parent = null;
      }
    };

    return _Task;

  })();

  DivSugar.rootTask = DivSugar.createTask('root');

}).call(this);
