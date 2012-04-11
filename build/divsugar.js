(function() {
  var DivSugar;

  DivSugar = {
    createScreen: function() {
      var div, func, name, _ref;
      div = document.createElement('div');
      _ref = this._Screen;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      return div._initialize();
    },
    createSprite: function() {
      var div, func, name, _ref;
      div = document.createElement('div');
      _ref = this._Sprite;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      return div._initialize();
    }
  };

  window.DivSugar = DivSugar;

  DivSugar._Screen = {
    _initialize: function() {
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.style.webkitTransformStyle = 'preserve-3d';
      this.style.webkitTransformOrigin = '0% 0% 0%';
      this.style.webkitPerspectiveOrigin = '0% 0% 0%';
      this._size = {};
      this.perspective(500);
      return this;
    },
    size: function(outerW, outerH, innerW, innerH) {
      if (arguments.length === 0) {
        return this._size;
      } else {
        this._size.outerW = outerW;
        this._size.outerH = outerH;
        this._size.innerW = innerW;
        this._size.innerH = innerH;
        this.style.width = "" + innerW + "px";
        this.style.height = "" + innerH + "px";
        this.style.webkitTransform = "scale(" + (outerW / innerW) + ", " + (outerH / innerH) + ")";
        return this;
      }
    },
    perspective: function(perspective) {
      if (arguments.length === 0) {
        return this._perspective;
      } else {
        this._perspective = perspective;
        this.style.webkitPerspective = "" + perspective + "px";
        return this;
      }
    }
  };

  DivSugar._Sprite = {
    _initialize: function() {
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'absolute';
      this.style.webkitTransformStyle = 'preserve-3d';
      this.style.webkitTransformOrigin = '0% 0% 0%';
      this._size = {};
      this._pos = {};
      this._rot = {};
      this._scl = {};
      this._imageClip = {};
      this._ps = this._rs = this._ss = '';
      this.size(100, 100);
      this.position(0, 0, 0);
      this.rotation(0, 0, 0);
      this.scale(1, 1, 1);
      this.visible(true);
      this.clip(false);
      this.opacity(1);
      this.image(null);
      this.imageClip(0, 0, 1, 1);
      return this;
    },
    size: function(w, h) {
      var size;
      switch (arguments.length) {
        case 0:
          return this._size;
        case 1:
          size = w;
          this._size.w = size.w;
          this._size.h = size.h;
          break;
        default:
          this._size.w = w;
          this._size.h = h;
      }
      this.style.width = "" + this._size.w + "px";
      this.style.height = "" + this._size.h + "px";
      return this;
    },
    position: function(x, y, z) {
      var pos;
      switch (arguments.length) {
        case 0:
          return this._pos;
        case 1:
          pos = x;
          this._pos.x = pos.x;
          this._pos.y = pos.y;
          this._pos.z = pos.z;
          break;
        default:
          this._pos.x = x;
          this._pos.y = y;
          this._pos.z = z;
      }
      this._ps = "translate3d(" + this._pos.x + "px, " + this._pos.y + "px, " + this._pos.z + "px) ";
      this.style.webkitTransform = this._ps + this._rs + this._ss;
      return this;
    },
    rotation: function(x, y, z) {
      var rot;
      switch (arguments.length) {
        case 0:
          return this._rot;
        case 1:
          rot = x;
          this._rot.x = rot.x;
          this._rot.y = rot.y;
          this._rot.z = rot.z;
          break;
        default:
          this._rot.x = x;
          this._rot.y = y;
          this._rot.z = z;
      }
      this._rs = "rotateX(" + this._rot.x + "deg) rotateY(" + this._rot.y + "deg) rotateZ(" + this._rot.z + "deg) ";
      this.style.webkitTransform = this._ps + this._rs + this._ss;
      return this;
    },
    scale: function(x, y, z) {
      var scl;
      switch (arguments.length) {
        case 0:
          return this._scl;
        case 1:
          scl = x;
          this._scl.x = scl.x;
          this._scl.y = scl.y;
          this._scl.z = scl.z;
          break;
        default:
          this._scl.x = x;
          this._scl.y = y;
          this._scl.z = z;
      }
      this._ss = "scale3d(" + this._scl.x + ", " + this._scl.y + ", " + this._scl.z + ")";
      this.style.webkitTransform = this._ps + this._rs + this._ss;
      return this;
    },
    visible: function(visible) {
      if (arguments.length === 0) {
        return this._visible;
      } else {
        this._visible = visible;
        this.style.visibility = visible ? "visible" : "hidden";
        return this;
      }
    },
    clip: function(clip) {
      if (arguments.length === 0) {
        return this._clip;
      } else {
        this._clip = clip;
        this.style.overflow = clip ? "hidden" : "visible";
        return this;
      }
    },
    opacity: function(opacity) {
      if (arguments.length === 0) {
        return this._opacity;
      } else {
        this._opacity = this.style.opacity = opacity;
        return this;
      }
    },
    image: function(imageUrl, onload) {
      var _ref,
        _this = this;
      if (arguments.length === 0) {
        return (_ref = this._image) != null ? _ref.src : void 0;
      } else {
        this._image = new Image;
        this._image.src = imageUrl;
        this._image.onload = function() {
          _this.style.backgroundImage = "url(" + _this._image.src + ")";
          return typeof onload === "function" ? onload() : void 0;
        };
        return this;
      }
    },
    imageClip: function(u1, v1, u2, v2) {
      var h, w, x, y;
      if (arguments.length === 0) {
        return this._imageClip;
      } else {
        this._imageClip.u1 = u1;
        this._imageClip.v1 = v1;
        this._imageClip.u2 = u2;
        this._imageClip.v2 = v2;
        w = this._size.w / (u2 - u1);
        h = this._size.h / (v2 - v1);
        x = -u1 * w;
        y = -v1 * h;
        this.style.backgroundPosition = "" + x + "px " + y + "px";
        this.style.backgroundSize = "" + w + "px " + h + "px";
        return this;
      }
    }
  };

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
      switch (arguments.length) {
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
      return this;
    };

    Vector.prototype.negate = function() {
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

    Vector.prototype.subtract = function(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
      this.z -= vec.z;
      return this;
    };

    Vector.prototype.multiply = function(s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    };

    Vector.prototype.divide = function(s) {
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

    Vector.prototype.squaredNorm = function() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    };

    Vector.prototype.distance = function(vec) {
      return this._vec1.set(this).subtract(vec).norm();
    };

    Vector.prototype.squaredDistance = function(vec) {
      return this._vec1.set(this).subtract(vec).squaredNorm();
    };

    Vector.prototype.dot = function(vec) {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    };

    Vector.prototype.cross = function(vec) {
      return this.set(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
    };

    Vector.prototype.normalize = function() {
      var norm;
      norm = this.norm;
      if (norm < 0.001) {
        return this.set(Vector.X_UNIT);
      } else {
        return this.div(norm);
      }
    };

    Vector.prototype.rotateX = function(deg) {
      var cos, sin;
      sin = Math.sin(deg);
      cos = Math.cos(deg);
      return this.set(this.x, this.y * cos - this.z * sin, this.z * cos + this.y * sin);
    };

    Vector.prototype.rotateY = function(deg) {
      var cos, sin;
      sin = Math.sin(deg);
      cos = Math.cos(deg);
      return this.set(this.x * cos + this.z * sin, this.y, this.z * cos - this.x * sin);
    };

    Vector.prototype.rotateZ = function(deg) {
      var cos, sin;
      sin = Math.sin(deg);
      cos = Math.cos(deg);
      return this.set(this.x * cos - this.y * sin, this.y * cos + this.x * sin, this.z);
    };

    return Vector;

  })();

  /*
    lerp: (to, ratio) ->
      if ratio > 1 - @_EPSILON
        @set to
      else ratio >= @_EPSILON
        vec = @_vec1
        @set(to).multiply(ratio)
        @multiply(1 - ratio).add(vec)
  
  #  _vec1:: new Vector
  */

  /*
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
  */

}).call(this);
