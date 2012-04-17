(function() {
  var DivSugar,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DivSugar = {
    _initialize: function() {
      var div, perspective, perspectiveOrigin, prefix, requestAnimationFrame, transform, transformOrigin, transformStyle, updateTasks, _i, _len, _ref,
        _this = this;
      this.EPSILON = 0.0001;
      this.DEG_TO_RAD = Math.PI / 180;
      this.DEG_TO_RAD = 180 / Math.PI;
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
    createTask: function(id) {
      if (id == null) id = null;
      return new this._Task;
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
      this.style[DivSugar._transformStyle] = 'preserve-3d';
      this.style[DivSugar._transformOrigin] = '0% 0% 0%';
      this.style[DivSugar._perspectiveOrigin] = '0% 0% 0%';
      this._size = {};
      this._pos = {};
      this._imageClip = {};
      this.perspective(1000);
      this.size(100, 100, 100, 100);
      this.position(0, 0);
      this.visible(true);
      this.clip(true);
      this.opacity(1);
      this.image('#0000ff');
      this.imageClip(0, 0, 1, 1);
      return this;
    },
    perspective: function(perspective) {
      if (arguments.length === 0) {
        return this._perspective;
      } else {
        this._perspective = perspective;
        this.style[DivSugar._perspective] = "" + perspective + "px";
        return this;
      }
    },
    size: function(outerW, outerH, innerW, innerH) {
      var offsetX, offsetY, scaleX, scaleY, size;
      switch (arguments.length) {
        case 0:
          return {
            outerW: this._size.outerW,
            outerH: this._size.outerH,
            innerW: this._size.innerW,
            innerH: this._size.innerH
          };
        case 1:
          size = outerW;
          this._size.outerW = size.outerW;
          this._size.outerH = size.outerH;
          this._size.innerW = size.innerW;
          this._size.innerH = size.innerH;
          break;
        default:
          this._size.outerW = outerW;
          this._size.outerH = outerH;
          this._size.innerW = innerW;
          this._size.innerH = innerH;
      }
      offsetX = (this._size.outerW - this._size.innerW) / 2 + this._pos.x;
      offsetY = (this._size.outerH - this._size.innerH) / 2 + this._pos.y;
      scaleX = this._size.outerW / this._size.innerW;
      scaleY = this._size.outerH / this._size.innerH;
      this.style.width = "" + this._size.innerW + "px";
      this.style.height = "" + this._size.innerH + "px";
      this.style[DivSugar._transform] = "translate(" + offsetX + "px, " + offsetY + "px) scale(" + scaleX + ", " + scaleY + ")";
      this.imageClip(this._imageClip);
      return this;
    },
    position: function(x, y) {
      var pos;
      switch (arguments.length) {
        case 0:
          return {
            x: this._pos.x,
            y: this._pos.y
          };
        case 1:
          pos = x;
          this._pos.x = pos.x;
          this._pos.y = pos.y;
          break;
        default:
          this._pos.x = x;
          this._pos.y = y;
      }
      this.size(this._size);
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
      var h, imageClip, w, x, y;
      switch (arguments.length) {
        case 0:
          return {
            u1: this._imageClip.u1,
            v1: this._imageClip.v1,
            u2: this._imageClip.u2,
            v2: this._imageClip.v2
          };
        case 1:
          imageClip = u1;
          this._imageClip.u1 = imageClip.u1;
          this._imageClip.v1 = imageClip.v1;
          this._imageClip.u2 = imageClip.u2;
          this._imageClip.v2 = imageClip.v2;
          break;
        default:
          this._imageClip.u1 = u1;
          this._imageClip.v1 = v1;
          this._imageClip.u2 = u2;
          this._imageClip.v2 = v2;
      }
      w = this._size.w / (this._imageClip.u2 - this._imageClip.u1);
      h = this._size.h / (this._imageClip.v2 - this._imageClip.v1);
      x = -this._imageClip.u1 * w;
      y = -this._imageClip.v1 * h;
      this.style.backgroundPosition = "" + x + "px " + y + "px";
      this.style.backgroundSize = "" + w + "px " + h + "px";
      return this;
    }
  };

  DivSugar._Sprite = {
    _initialize: function(id) {
      this.id = id;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'absolute';
      this.style[DivSugar._transformStyle] = 'preserve-3d';
      this.style[DivSugar._transformOrigin] = '0% 0% 0%';
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
          return {
            w: this._size.w,
            h: this._size.h
          };
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
      this.imageClip(this._imageClip);
      return this;
    },
    position: function(x, y, z) {
      var pos;
      switch (arguments.length) {
        case 0:
          return {
            x: this._pos.x,
            y: this._pos.y,
            z: this._pos.z
          };
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
      this.style[DivSugar._transform] = this._ps + this._rs + this._ss;
      return this;
    },
    rotation: function(x, y, z) {
      var rot;
      switch (arguments.length) {
        case 0:
          return {
            x: this._rot.x,
            y: this._rot.y,
            z: this._rot.z
          };
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
      this.style[DivSugar._transform] = this._ps + this._rs + this._ss;
      return this;
    },
    scale: function(x, y, z) {
      var scl;
      switch (arguments.length) {
        case 0:
          return {
            x: this._scl.x,
            y: this._scl.y,
            z: this._scl.z
          };
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
      this.style[DivSugar._transform] = this._ps + this._rs + this._ss;
      return this;
    },
    visible: DivSugar._Scene.visible,
    clip: DivSugar._Scene.clip,
    opacity: DivSugar._Scene.opacity,
    image: DivSugar._Scene.image,
    imageClip: DivSugar._Scene.imageClip
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
      return DivSugar.Vector._tmpVec.set(this).subtract(vec).norm();
    };

    Vector.prototype.squaredDistance = function(vec) {
      return DivSugar.Vector._tmpVec.set(this).subtract(vec).squaredNorm();
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
        return this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        vec = DivSugar.Vector._tmpVec;
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

  DivSugar.Vector._tmpVec = new DivSugar.Vector;

}).call(this);
