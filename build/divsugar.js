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
      div._initialize(id);
      return div;
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
      div._initialize(id);
      return div;
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
      this.id = id;
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
    getPosicion: function(position) {
      position.x = this._positionX;
      position.y = this._positionY;
      return position.z = this._positionZ;
    },
    setPosition: function(x, y, z) {
      var position;
      if (arguments.length === 1) {
        position = x;
        this._positionX = position.x;
        this._positionY = position.y;
        this._positionZ = position.z;
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
