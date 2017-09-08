'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FitVideo = function () {
  function FitVideo(target) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, FitVideo);

    this.$window = $(window);
    this.target = document.querySelectorAll(target);
    this.options = options;
    this.$video = null;

    this.params = {
      self: null,
      viewSize: {},
      drowSize: { // 操作する設定値
        'sw': 0, // 動画元サイズ横幅
        'sh': 0, // 動画元サイズ縦幅
        'dx': 0, // 配置位置 X軸
        'dy': 0, // 配置位置 Y軸
        'dw': 0, // 表示領域横幅
        'dh': 0 // 表示領域縦幅
      }
    };

    this.options = $.extend({
      'size': {
        'width': 1280,
        'height': 720
      }
    }, options);

    this._loopHandler = function () {
      for (var i = 0; i < _this.target.length; i++) {
        var item = _this.target[i];
        _this.params.self = item;
        _this.video = item.getElementsByTagName('video');
        _this._setSize();
        _this._applySize();
      }
    };

    this._setEvent();
  }

  /**
  * イベントの設定
  */


  _createClass(FitVideo, [{
    key: '_setEvent',
    value: function _setEvent() {
      window.addEventListener('load', this._loopHandler);
      window.addEventListener('resize', this._loopHandler);
    }

    /**
    * サイズの取得
    */

  }, {
    key: '_setSize',
    value: function _setSize() {
      var width = Math.ceil(this.params.self.clientWidth);
      var height = Math.ceil(this.params.self.clientHeight);
      var scaleH = height / this.options.size.height;
      var scaleW = width / this.options.size.width;
      this.params.viewSize = {
        'width': width,
        'height': height,
        'scale': scaleH,
        'marginWidth': (this.options.size.width * scaleH - width) / 2,
        'marginHeight': (this.options.size.height * scaleW - height) / 2
      };

      // 動画サイズ設定
      this.params.drowSize.sw = this.options.size.width;
      this.params.drowSize.sw = this.options.size.height;

      if (width > this.options.size.width * scaleH) {
        this.params.viewSize.scale = scaleW;

        this.params.drowSize.dx = 0;
        this.params.drowSize.dy = -this.params.viewSize.marginHeight;
        this.params.drowSize.dw = this.params.viewSize.width;
        this.params.drowSize.dh = this.options.size.height * this.params.viewSize.scale;
      } else {
        this.params.viewSize.scale = scaleH;

        this.params.drowSize.dx = -this.params.viewSize.marginWidth;
        this.params.drowSize.dy = 0;
        this.params.drowSize.dw = this.options.size.width * this.params.viewSize.scale;
        this.params.drowSize.dh = this.params.viewSize.height;
      }
    }

    /**
    * videoタグにサイズのstyleをつける
    */

  }, {
    key: '_applySize',
    value: function _applySize() {
      for (var i = 0; i < this.video.length; i++) {
        var item = this.video[i];
        item.style.width = this.params.drowSize.dw + 'px';
        item.style.height = this.params.drowSize.dh + 'px';
        item.style.marginTop = this.params.drowSize.dy + 'px';
        item.style.marginLeft = this.params.drowSize.dx + 'px';
      }
    }

    /**
    * videoタグのstyleを解除
    */

  }, {
    key: '_resetSize',
    value: function _resetSize() {
      this.video = this.params.self.getElementsByTagName('video');
      for (var i = 0; i < this.video.length; i++) {
        var item = this.video[i];
        item.style.width = '';
        item.style.height = '';
        item.style.marginTop = '';
        item.style.marginLeft = '';
      }
    }

    /**
    * イベントを解除
    */

  }, {
    key: '_cancelEvent',
    value: function _cancelEvent() {
      window.removeEventListener('load', this._loopHandler);
      window.removeEventListener('resize', this._loopHandler);
    }

    /**
    * 解除処理
    */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._cancelEvent();
      // ライブラリ側で設定したものを解除
      for (var i = 0; i < this.target.length; i++) {
        var item = this.target[i];
        this.params.self = item;
        this.video = item.getElementsByTagName('video');
        this._resetSize();
      }
    }
  }]);

  return FitVideo;
}();
//# sourceMappingURL=fitVideo.js.map
