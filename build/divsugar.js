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
      div._initialize();
      return div;
    },
    createSprite: function() {
      var div, func, name, _ref;
      div = document.createElement('div');
      _ref = this._Sprite;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      div._initialize();
      return div;
    }
  };

  window.DivSugar = DivSugar;

  DivSugar._Screen = {
    _initialize: function() {
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.style.webkitTransformStyle = 'preserve-3d';
      this.style.webkitPerspectiveOrigin = '50% 50%';
      this._size = {};
      return this.perspective(500);
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
      this.style.webkitTransformStyle = 'preserve-3d';
      this.style.webkitTransformOrigin = '0% 0% 0%';
      this.style.position = 'absolute';
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
      return this.imageClip(0, 0, 1, 1);
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
    image: function(imageSrc, onload) {
      var _ref,
        _this = this;
      if (arguments.length === 0) {
        return (_ref = this._image) != null ? _ref.src : void 0;
      } else {
        this._image = new Image;
        this._image.src = imageSrc;
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

    function Vector() {}

    return Vector;

  })();

}).call(this);
