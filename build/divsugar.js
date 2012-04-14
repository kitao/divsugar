(function() {
  var DivSugar;

  DivSugar = {
    _initialize: function() {
      var div, perspective, perspectiveOrigin, prefix, requestAnimationFrame, transform, transformOrigin, transformStyle, _i, _len, _ref, _results;
      this.EPSILON = 0.0001;
      this.DEG_TO_RAD = Math.PI / 180;
      this.DEG_TO_RAD = 180 / Math.PI;
      this.transform = 'transform';
      this.transformStyle = 'transformStyle';
      this.transformOrigin = 'transformOrigin';
      this.perspective = 'perspective';
      this.perspectiveOrigin = 'perspectiveOrigin';
      this.requestAnimationFrame = window.requestAnimationFrame;
      div = document.createElement('div');
      _ref = ['webkit', 'moz', 'ms', 'o'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prefix = _ref[_i];
        transform = prefix + 'Transform';
        if (div.style[transform] != null) this.transform = transform;
        transformStyle = prefix + 'TransformStyle';
        if (div.style[transformStyle] != null) {
          this.transformStyle = transformStyle;
        }
        transformOrigin = prefix + 'TransformOrigin';
        if (div.style[transformOrigin] != null) {
          this.transformOrigin = transformOrigin;
        }
        perspective = prefix + 'Perspective';
        if (div.style[perspective] != null) this.perspective = perspective;
        perspectiveOrigin = prefix + 'PerspectiveOrigin';
        if (div.style[perspectiveOrigin] != null) {
          this.perspectiveOrigin = perspectiveOrigin;
        }
        requestAnimationFrame = prefix + 'RequestAnimationFrame';
        if (window[requestAnimationFrame] != null) {
          this.requestAnimationFrame = requestAnimationFrame;
        }
        if (!(this.requestAnimationFrame != null)) {
          _results.push(this.requestAnimationFrame = function(callback) {
            return window.setInterval(callback, 1000 / 60);
          });
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    createScene: function(id) {
      var div, func, name, _ref;
      if (id == null) id = null;
      div = document.createElement('div');
      _ref = this._Scene;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      return div._initialize(id);
    },
    createSprite: function(id) {
      var div, func, name, _ref;
      if (id == null) id = null;
      div = document.createElement('div');
      _ref = this._Sprite;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      return div._initialize(id);
    },
    addTask: function(callback, tag) {},
    startTask: function() {
      var _this = this;
      return this._requestAnimationFrame(function() {});
    }
  };

  (window.DivSugar = DivSugar)._initialize();

  DivSugar._Scene = {
    _initialize: function(id) {
      this.id = id;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.style[DivSugar.transformStyle] = 'preserve-3d';
      this.style[DivSugar.transformOrigin] = '0% 0% 0%';
      this.style[DivSugar.perspectiveOrigin] = '0% 0% 0%';
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
        this.style[DivSugar.transform] = "scale(" + (outerW / innerW) + ", " + (outerH / innerH) + ")";
        return this;
      }
    },
    perspective: function(perspective) {
      if (arguments.length === 0) {
        return this._perspective;
      } else {
        this._perspective = perspective;
        this.style[DivSugar.perspective] = "" + perspective + "px";
        return this;
      }
    }
  };

  DivSugar._Sprite = {
    _initialize: function(id) {
      this.id = id;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'absolute';
      this.style[DivSugar.transformStyle] = 'preserve-3d';
      this.style[DivSugar.transformOrigin] = '0% 0% 0%';
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
      this.style[DivSugar.transform] = this._ps + this._rs + this._ss;
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
      this.style[DivSugar.transform] = this._ps + this._rs + this._ss;
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
      this.style[DivSugar.transform] = this._ps + this._rs + this._ss;
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
    image: function(imageUrlOrColor) {
      if (arguments.length === 0) {
        return this._image;
      } else {
        this._image = imageUrlOrColor;
        if (!(imageUrlOrColor != null)) {
          this.style.backgroundColor = null;
          this.style.backgroundImage = null;
        } else if (imageUrlOrColor.charAt(0) === '#') {
          this.style.backgroundColor = imageUrlOrColor;
          this.style.backgroundImage = null;
        } else {
          this.style.backgroundColor = null;
          this.style.backgroundImage = "url(" + imageUrlOrColor + ")";
        }
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
      if (norm < DivSugar.EPSILON) {
        return this.set(Vector.X_UNIT);
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
        return this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        vec = this._vec1;
        vec.set(to).multiply(ratio);
        return this.multiply(1 - ratio).add(vec);
      }
    };

    Vector.prototype.equals = function(vec) {
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

  DivSugar.Vector._vec1 = new DivSugar.Vector;

}).call(this);
