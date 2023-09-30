/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.init.js":
/*!*****************************!*\
  !*** ./src/js/main.init.js ***!
  \*****************************/
/***/ (() => {

(function ($) {
  'use strict';

  $(document).ready(function ($) {
    // 'use strict'

    var docWidth = window.innerWidth;
    // Функция анимирования кнопок при наведении
    if ($('.btn').length) {
      theme.initAnimBtn();
      // console.log(BtnsInit)
    }

    // var newBtn = '<a href="javascript: void(0)" class="btn btn-orange btn-radius"><span data-hover="Обсудить проект">Обсудить проект</span></a>'
    // var NewBtnAppend = $(newBtn).appendTo('.header')
    // console.log(NewBtnAppend)
    // theme.initAnimBtn({ btnElems: NewBtnAppend })
    //----------------------//

    // Функция инициализации анимированной печати текста
    if ($('.typed-js').length) {
      var typedElems = $('body').find('.typed-js');
      /*   $.each(typedElems, function () { */
      theme.typedInit(typedElems);
      /* }) */
    }
    //----------------------//

    if ('header'.length) {
      theme.Header.initScroll();
      // console.log(theme.Header)
    }

    if ($('.main-tabs-wrapper').length) theme.Tabs.InitTabs();
    // var NewTyped = '<h1 class="heading heading-white">Мы помогаем превращать идеи<br /> в отличный <span class="typed-js"'
    //     + 'id = "main-heading2" ><span>пользовательский опыт</span><span>текст 2</span></span></h1>'
    // var NewTypedAppend = $(NewTyped).prependTo('.top-section .new-container')
    // console.log(theme.initTabs())
  }); // конец ready
})(jQuery);

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Plugs_typed_typed_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Plugs/typed/typed.min.js */ "./src/js/vendor/plugins/typed/typed.min.js");
/* harmony import */ var Plugs_typed_typed_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Plugs_typed_typed_min_js__WEBPACK_IMPORTED_MODULE_0__);

window.theme = {};
(function (theme, $) {
  'use strict';

  // Функционал для хэдера
  theme.Header = {
    headerElem: $('body').find('header'),
    initScroll: function initScroll(options) {
      var $this = this;
      var defaultsOptions = {
        header: $this.headerElem
      };
      var options = $.extend(defaultsOptions, options);
      /*    headerHeight =  */
      $this.headerHeight = options.header.innerHeight();
      $(window).on('scroll', function (e) {
        var $window = $(window),
          scrollTop = $window.scrollTop();
        // console.log(scrollTop)
        scrollTop > $this.headerHeight ? options.header.addClass('header-mini') : options.header.removeClass('header-mini');
      });
    }
  };

  // Плагин для работы кнопок 
  /*  this.btns = btnElems */
  theme.initAnimBtn = function (options) {
    // $('body').on("DOMNodeInserted", function (event) {
    //     if ($(event.target).hasClass('btn')) {
    //         var NewBtn = $(event.target)
    //         // console.log(NewBtn)
    //         // options.btnElems.off('mouseenter')
    //         options.btnElems = options.btnElems.add(NewBtn)
    //         // console.log(addElems)
    //         console.log(options.btnElems)

    //     }

    // });
    var defaultsOptions = {
      delay: 1000,
      newRound: '<div class="circle"></div>',
      btnClass: 'btn'
    };
    var options = $.extend(defaultsOptions, options);
    $('body').on('mouseenter', '.' + options.btnClass + '', function (e) {
      var $this = $(this),
        o = options;
      // console.log($this)
      $(o.newRound).appendTo($this);
      var newRound = $this.find('.circle'),
        x = e.pageX - $this.offset().left,
        y = e.pageY - $this.offset().top;
      newRound.css({
        'left': x + "px",
        'top': y + "px"
      });
      newRound.addClass('anim');
      setTimeout(function () {
        newRound.remove();
      }, o.delay);
    });
  };
  //----------------------//

  // Плагин для работы typed.js
  theme.typedInit = function ($this) {
    // console.log($this)
    $('body').on("DOMNodeInserted", function (event) {
      if ($(event.target).hasClass('typed-js') || $(event.target).find('.typed-js').length) {
        if (!$(event.target).hasClass('init')) {
          var NewTypedJs = $(event.target).hasClass('typed-js');
          if ($(event.target).hasClass('typed-js')) NewTypedJs = $(event.target);else NewTypedJs = $(event.target).find('.typed-js');
          InitTypedSingle(NewTypedJs);
        }
      }
    });
    // Иницализация написания текста //
    function InitTypedSingle(selfTyped) {
      // console.log(selfTyped)
      var typedTextElem = selfTyped,
        typedText = typedTextElem.children('span');
      typedTextElem.html('');
      var typedTextString = typedText.map(function () {
        return $(this).text();
      }).get();
      // console.log(selfTyped.attr('id'))
      var typed = new (Plugs_typed_typed_min_js__WEBPACK_IMPORTED_MODULE_0___default())('#' + selfTyped.attr('id') + '', {
        // Тут id того блока, в которм будет анимация
        strings: typedTextString,
        showCursor: true,
        autoInsertCss: true,
        onBegin: function onBegin(self) {
          // console.log($(self.el))
          $(self.el).addClass('init');
        },
        /*   onComplete: function (self) {
              console.log(self.el)
          }, */
        typeSpeed: 50,
        // Скорость печати
        startDelay: 500,
        // Задержка перед стартом анимации
        backSpeed: 50,
        // Скорость удаления
        loop: true // Указываем, повторять ли анимацию
      });
    }

    $.each($this, function () {
      // console.log(this)
      InitTypedSingle($(this));
    });
  };
  theme.Tabs = {
    defaultsOptions: {
      tabsElems: 'main-tabs-content',
      activeClass: 'active',
      tabsDescript: 'main-tabs-descripts'
    },
    InitTabs: function InitTabs(options) {
      var options = $.extend(this.defaultsOptions, options),
        TabDiscriptElem = $('.' + options.tabsDescript + ''),
        TabContantsElems = $('.' + options.tabsElems + ''),
        TabContentsOuter = TabContantsElems.closest('.main-tabs-contents'),
        TabDescriptOuter = TabContentsOuter.next('.main-tabs-descripts_outer');
      // console.log(TabDiscriptElem)
      var TabDiscriptElemHeight = TabDiscriptElem.innerHeight();
      TabDiscriptElem.css({
        'top': 'calc(50vh - ' + TabDiscriptElemHeight / 2 + 'px)'
      });
      /*    TabDescriptOuter.css({
             'padding-top': TabDiscriptElemHeight / 4 + 'px'
         }) */
      $.each(TabContantsElems, function () {
        $(this).css({
          'height': TabDiscriptElemHeight + 'px'
        });
      });
      TabContantsElems.filter(':not(.active)').css({
        'opacity': '0'
      });
      var ReplaceTabDescript = function ReplaceTabDescript(currentIndex) {
        var TabsDescriptsElem = TabDescriptOuter.find('.main-tabs-descript'),
          NowActiveTabDescript = TabsDescriptsElem.filter('.active'),
          NewActiveTabDescript = TabsDescriptsElem.filter(':nth-child(' + (currentIndex + 1) + ')');
        // console.log(currentIndex)
        NowActiveTabDescript.hide().removeClass('active');
        NewActiveTabDescript.show().addClass('active');
        // .addClass('active')
      };
      /*  TabContentsOuter.css({
           'padding-top': (TabDiscriptElemHeight / 2) + 'px',
           'padding-bottom': (TabDiscriptElemHeight / 2) + 'px'
       }) */
      var lastScrollTop = 0;
      // currentTabContent = TabContantsElems.filter(':first-child')
      // console.log(TabContentsOuter.offset().top)

      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop(),
          windowHeight = $(window).height();
        var NextTabElem,
          AfterNextTabElem,
          PrevTabElem,
          BeforePrevTabElem,
          PercentCurrentNext,
          PercentNext,
          currentTabContent = TabContantsElems.filter('.active');

        // console.log(currentTabContent)
        if (scrollTop > lastScrollTop) {
          // console.log(currentTabContent)
          if (currentTabContent.next().length && scrollTop + windowHeight >= currentTabContent.next().offset().top) {
            // if (currentTabContent.index() != TabContantsElems.length - 1) {
            if (currentTabContent.index() < TabContantsElems.length - 2) {
              NextTabElem = currentTabContent.next();
              AfterNextTabElem = NextTabElem.next();
              PercentCurrentNext = (scrollTop + windowHeight - NextTabElem.offset().top) / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2);
              PercentNext = (scrollTop + windowHeight - AfterNextTabElem.offset().top) / (currentTabContent.innerHeight() * 2);
            } else if (currentTabContent.index() == TabContantsElems.length - 2) {
              NextTabElem = currentTabContent.next();
              PercentCurrentNext = (scrollTop + windowHeight - NextTabElem.offset().top) / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2);
            }
            currentTabContent.css('opacity', 1 - PercentCurrentNext);
            NextTabElem.css('opacity', PercentCurrentNext);
            if (!NextTabElem.hasClass('active')) {
              if (scrollTop + windowHeight >= NextTabElem.offset().top + NextTabElem.innerHeight() + NextTabElem.innerHeight() / 3.75) {
                currentTabContent.removeClass('active');
                // NextTabElem.css('opacity', '1')
                currentTabContent = NextTabElem;
                currentTabContent.addClass('active');
                ReplaceTabDescript(currentTabContent.index());
              }
            }
            // console.log(currentTabContent.index())
            if (currentTabContent.index() < TabContantsElems.length - 1 && currentTabContent.index() != 0) {
              if (scrollTop + windowHeight >= NextTabElem.offset().top && scrollTop + windowHeight <= NextTabElem.offset().top + NextTabElem.innerHeight()) {
                currentTabContent.css('opacity', '1');
                // console.log('тут')
              }
            }

            if (AfterNextTabElem != undefined && scrollTop + windowHeight >= AfterNextTabElem.offset().top) {
              AfterNextTabElem.css('opacity', PercentNext);
              if (PercentNext >= 1) {
                AfterNextTabElem.css('opacity', '1');
              }
              if (PercentNext < 0) AfterNextTabElem.css('opacity', '0');
            }
          } else if (currentTabContent.index() == TabContantsElems.length - 1) {
            // console.log('последний элемент')
            PercentCurrentNext = (scrollTop + windowHeight - currentTabContent.offset().top) / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2);
            currentTabContent.css('opacity', PercentCurrentNext);
            if (PercentCurrentNext >= 1) currentTabContent.css('opacity', '1');
          }
          PrevTabElem = currentTabContent.prev();
          BeforePrevTabElem = PrevTabElem.prev();
          if (PrevTabElem.length) {
            if (scrollTop >= PrevTabElem.offset().top + PrevTabElem.innerHeight()) {
              PrevTabElem.css('opacity', '0');
            } else {
              PercentCurrentNext = (PrevTabElem.offset().top + PrevTabElem.innerHeight() - scrollTop) / (PrevTabElem.offset().top + PrevTabElem.innerHeight());
              PrevTabElem.css('opacity', PercentCurrentNext);
            }
          }
          if (BeforePrevTabElem.length) BeforePrevTabElem.css('opacity', '0');
        } else {
          // console.log('вверх')

          // if (currentTabContent.index() != 0) {
          if (currentTabContent.prev().length && scrollTop <= currentTabContent.prev().offset().top + currentTabContent.prev().innerHeight()) {
            if (currentTabContent.index() >= 2) {
              NextTabElem = currentTabContent.prev();
              AfterNextTabElem = NextTabElem.prev();
              PercentCurrentNext = (NextTabElem.offset().top + NextTabElem.innerHeight() - scrollTop) / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2);
              PercentNext = (AfterNextTabElem.offset().top + AfterNextTabElem.innerHeight() - scrollTop) / (currentTabContent.innerHeight() * 2);
            } else if (currentTabContent.index() == 1) {
              NextTabElem = currentTabContent.prev();
              PercentCurrentNext = (NextTabElem.offset().top + NextTabElem.innerHeight() - scrollTop) / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2);
            }
            currentTabContent.css('opacity', 1 - PercentCurrentNext);
            NextTabElem.css('opacity', PercentCurrentNext);
            if (!NextTabElem.hasClass('active')) {
              if (scrollTop <= NextTabElem.offset().top) {
                currentTabContent.removeClass('active');
                // NextTabElem.css('opacity', '1')
                currentTabContent = NextTabElem;
                currentTabContent.addClass('active');
                ReplaceTabDescript(currentTabContent.index());
              }
            }
            if (currentTabContent.index() >= 1 && currentTabContent.index() != TabContantsElems.length - 1) {
              if (scrollTop <= NextTabElem.offset().top + NextTabElem.innerHeight() && scrollTop >= NextTabElem.offset().top) {
                currentTabContent.css('opacity', '1');
              }
            }
            if (AfterNextTabElem != undefined && scrollTop >= AfterNextTabElem.offset().top) {
              AfterNextTabElem.css('opacity', PercentNext);
              if (PercentNext >= 1) {
                AfterNextTabElem.css('opacity', '1');
              }
              if (PercentNext < 0) {
                AfterNextTabElem.css('opacity', '0');
              }
            }
          } else if (currentTabContent.index() == 0) {
            PercentCurrentNext = (currentTabContent.offset().top + currentTabContent.innerHeight() - scrollTop) / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2);
            currentTabContent.css('opacity', PercentCurrentNext);
            if (PercentCurrentNext >= 1) currentTabContent.css('opacity', '1');
          }
          PrevTabElem = currentTabContent.next();
          BeforePrevTabElem = PrevTabElem.next();
          if (PrevTabElem.length) {
            if (scrollTop + windowHeight <= PrevTabElem.offset().top) {
              PrevTabElem.css('opacity', '0');
            } else {
              PercentCurrentNext = (scrollTop + windowHeight - PrevTabElem.offset().top) / PrevTabElem.offset().top;
              PrevTabElem.css('opacity', PercentCurrentNext);
            }
          }
          if (BeforePrevTabElem.length) {
            BeforePrevTabElem.css('opacity', '0');
          }
          // }
        }

        lastScrollTop = scrollTop;
      });
    }
  };
}).apply(undefined, [window.theme, jQuery]);
(function ($) {
  $(document).ready(function ($) {
    var docWidth = window.innerWidth;
    // console.log(allSectionHeights)

    $('body').on('click', '.btn-animate', function (e) {
      e.preventDefault();
      var header_offset = 0,
        $thisHash = $(this.hash),
        $thisHashOffset = $thisHash.offset().top;

      // console.log($(window).scrollTop())
      if (docWidth > 1200) {
        // header_offset = $('header').innerHeight();
        // console.log(header_offset)
      } else {
        header_offset = 0;
        if ($('.header-menu_btn.open').length) {
          // blockScroll('close')
          $('.header-menu_btn.open').trigger('click');
        }
        var scrollTop = $(window).scrollTop();
        if (scrollTop > $thisHash.offset().top) header_offset = $('header').innerHeight();
      }
      $('html, body').stop().animate({
        scrollTop: $thisHashOffset - header_offset
      }, 1000
      // {
      //     duration: 1000,
      // step: function (number) {
      //     var scroll = $(window).scrollTop()
      //     if (scroll >= header_offset + 20) {
      //         header_offset = $('header').innerHeight();
      //         $('html, body').stop().animate({
      //             scrollTop: $thisHash.offset().top - header_offset
      //         }, 1000)
      //     }
      // },
      /*  var scroll = $(window).scrollTop()
       if (scroll <= 1 || scroll >= header_offset) {
           header_offset = $('header').innerHeight();
         } */
      // console.log($(window).scrollTop())
      // done: function () {
      // var nowHeaderHeight = $('header').innerHeight();
      // var scroll = $thisHash.offset().top
      /*  console.log(scroll)
       console.log($(window).scrollTop())
       console.log(nowHeaderHeight + $(window).scrollTop()) */
      // if (scroll > (nowHeaderHeight + $(window).scrollTop())) {
      //     console.log('true')
      //     $('html,body').stop().animate({
      //         scrollTop: $thisHash.offset().top - nowHeaderHeight
      //     }, 300)
      // }
      // },
      // }
      );
      // e.preventDefault();
      return false;
    });
  });
  $(window).on('load', function () {
    setTimeout(function () {
      RestartScroll();
    }, 10);
  });
})(jQuery);
var RestartScroll = function RestartScroll() {
  // Перед закрытием записываем в локалсторадж window.scrollX и window.scrollY как scrollX и scrollY
  window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  // Прокручиваем страницу к scrollX и scrollY из localStorage (либо 0,0 если там еще ничего нет)
  var lastScrollPosition = sessionStorage.getItem('scrollPosition');
  // console.log(sessionStorage)
  if (lastScrollPosition) {
    window.scroll(0, 0);
    $('html, body').stop().animate({
      scrollTop: lastScrollPosition
    }, 200);
    // window.scroll(0, lastScrollPosition);
    sessionStorage.removeItem('scrollPosition');
  }
  // console.log(sessionStorage)
  // $(window).trigger('scroll')
  // console.log()
};

/***/ }),

/***/ "./src/js/vendor/plugins/typed/typed.min.js":
/*!**************************************************!*\
  !*** ./src/js/vendor/plugins/typed/typed.min.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function (t, e) {
  "object" == ( false ? 0 : _typeof(exports)) && "object" == ( false ? 0 : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
})(this, function () {
  return function (t) {
    function e(n) {
      if (s[n]) return s[n].exports;
      var i = s[n] = {
        exports: {},
        id: n,
        loaded: !1
      };
      return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
    }
    var s = {};
    return e.m = t, e.c = s, e.p = "", e(0);
  }([function (t, e, s) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var i = function () {
        function t(t, e) {
          for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }
        return function (e, s, n) {
          return s && t(e.prototype, s), n && t(e, n), e;
        };
      }(),
      r = s(1),
      o = s(3),
      a = function () {
        function t(e, s) {
          n(this, t), r.initializer.load(this, s, e), this.begin();
        }
        return i(t, [{
          key: "toggle",
          value: function value() {
            this.pause.status ? this.start() : this.stop();
          }
        }, {
          key: "stop",
          value: function value() {
            this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos, this));
          }
        }, {
          key: "start",
          value: function value() {
            this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this));
          }
        }, {
          key: "destroy",
          value: function value() {
            this.reset(!1), this.options.onDestroy(this);
          }
        }, {
          key: "reset",
          value: function value() {
            var t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
            clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, t && (this.insertCursor(), this.options.onReset(this), this.begin());
          }
        }, {
          key: "begin",
          value: function value() {
            var t = this;
            this.options.onBegin(this), this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout(function () {
              t.currentElContent && 0 !== t.currentElContent.length ? t.backspace(t.currentElContent, t.currentElContent.length) : t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos);
            }, this.startDelay);
          }
        }, {
          key: "typewrite",
          value: function value(t, e) {
            var s = this;
            this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
            var n = this.humanizer(this.typeSpeed),
              i = 1;
            return this.pause.status === !0 ? void this.setPauseStatus(t, e, !0) : void (this.timeout = setTimeout(function () {
              e = o.htmlParser.typeHtmlChars(t, e, s);
              var n = 0,
                r = t.substr(e);
              if ("^" === r.charAt(0) && /^\^\d+/.test(r)) {
                var a = 1;
                r = /\d+/.exec(r)[0], a += r.length, n = parseInt(r), s.temporaryPause = !0, s.options.onTypingPaused(s.arrayPos, s), t = t.substring(0, e) + t.substring(e + a), s.toggleBlinking(!0);
              }
              if ("`" === r.charAt(0)) {
                for (; "`" !== t.substr(e + i).charAt(0) && (i++, !(e + i > t.length)););
                var u = t.substring(0, e),
                  l = t.substring(u.length + 1, e + i),
                  c = t.substring(e + i + 1);
                t = u + l + c, i--;
              }
              s.timeout = setTimeout(function () {
                s.toggleBlinking(!1), e >= t.length ? s.doneTyping(t, e) : s.keepTyping(t, e, i), s.temporaryPause && (s.temporaryPause = !1, s.options.onTypingResumed(s.arrayPos, s));
              }, n);
            }, n));
          }
        }, {
          key: "keepTyping",
          value: function value(t, e, s) {
            0 === e && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this)), e += s;
            var n = t.substr(0, e);
            this.replaceText(n), this.typewrite(t, e);
          }
        }, {
          key: "doneTyping",
          value: function value(t, e) {
            var s = this;
            this.options.onStringTyped(this.arrayPos, this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), this.loop === !1 || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function () {
              s.backspace(t, e);
            }, this.backDelay));
          }
        }, {
          key: "backspace",
          value: function value(t, e) {
            var s = this;
            if (this.pause.status === !0) return void this.setPauseStatus(t, e, !1);
            if (this.fadeOut) return this.initFadeOut();
            this.toggleBlinking(!1);
            var n = this.humanizer(this.backSpeed);
            this.timeout = setTimeout(function () {
              e = o.htmlParser.backSpaceHtmlChars(t, e, s);
              var n = t.substr(0, e);
              if (s.replaceText(n), s.smartBackspace) {
                var i = s.strings[s.arrayPos + 1];
                i && n === i.substr(0, e) ? s.stopNum = e : s.stopNum = 0;
              }
              e > s.stopNum ? (e--, s.backspace(t, e)) : e <= s.stopNum && (s.arrayPos++, s.arrayPos === s.strings.length ? (s.arrayPos = 0, s.options.onLastStringBackspaced(), s.shuffleStringsIfNeeded(), s.begin()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], e));
            }, n);
          }
        }, {
          key: "complete",
          value: function value() {
            this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0;
          }
        }, {
          key: "setPauseStatus",
          value: function value(t, e, s) {
            this.pause.typewrite = s, this.pause.curString = t, this.pause.curStrPos = e;
          }
        }, {
          key: "toggleBlinking",
          value: function value(t) {
            this.cursor && (this.pause.status || this.cursorBlinking !== t && (this.cursorBlinking = t, t ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink")));
          }
        }, {
          key: "humanizer",
          value: function value(t) {
            return Math.round(Math.random() * t / 2) + t;
          }
        }, {
          key: "shuffleStringsIfNeeded",
          value: function value() {
            this.shuffle && (this.sequence = this.sequence.sort(function () {
              return Math.random() - .5;
            }));
          }
        }, {
          key: "initFadeOut",
          value: function value() {
            var t = this;
            return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout(function () {
              t.arrayPos++, t.replaceText(""), t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0) : (t.typewrite(t.strings[0], 0), t.arrayPos = 0);
            }, this.fadeOutDelay);
          }
        }, {
          key: "replaceText",
          value: function value(t) {
            this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t;
          }
        }, {
          key: "bindFocusEvents",
          value: function value() {
            var t = this;
            this.isInput && (this.el.addEventListener("focus", function (e) {
              t.stop();
            }), this.el.addEventListener("blur", function (e) {
              t.el.value && 0 !== t.el.value.length || t.start();
            }));
          }
        }, {
          key: "insertCursor",
          value: function value() {
            this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.setAttribute("aria-hidden", !0), this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)));
          }
        }]), t;
      }();
    e["default"] = a, t.exports = e["default"];
  }, function (t, e, s) {
    "use strict";

    function n(t) {
      return t && t.__esModule ? t : {
        "default": t
      };
    }
    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var s = arguments[e];
          for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
        }
        return t;
      },
      o = function () {
        function t(t, e) {
          for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }
        return function (e, s, n) {
          return s && t(e.prototype, s), n && t(e, n), e;
        };
      }(),
      a = s(2),
      u = n(a),
      l = function () {
        function t() {
          i(this, t);
        }
        return o(t, [{
          key: "load",
          value: function value(t, e, s) {
            if ("string" == typeof s ? t.el = document.querySelector(s) : t.el = s, t.options = r({}, u["default"], e), t.isInput = "input" === t.el.tagName.toLowerCase(), t.attr = t.options.attr, t.bindInputFocusEvents = t.options.bindInputFocusEvents, t.showCursor = !t.isInput && t.options.showCursor, t.cursorChar = t.options.cursorChar, t.cursorBlinking = !0, t.elContent = t.attr ? t.el.getAttribute(t.attr) : t.el.textContent, t.contentType = t.options.contentType, t.typeSpeed = t.options.typeSpeed, t.startDelay = t.options.startDelay, t.backSpeed = t.options.backSpeed, t.smartBackspace = t.options.smartBackspace, t.backDelay = t.options.backDelay, t.fadeOut = t.options.fadeOut, t.fadeOutClass = t.options.fadeOutClass, t.fadeOutDelay = t.options.fadeOutDelay, t.isPaused = !1, t.strings = t.options.strings.map(function (t) {
              return t.trim();
            }), "string" == typeof t.options.stringsElement ? t.stringsElement = document.querySelector(t.options.stringsElement) : t.stringsElement = t.options.stringsElement, t.stringsElement) {
              t.strings = [], t.stringsElement.style.display = "none";
              var n = Array.prototype.slice.apply(t.stringsElement.children),
                i = n.length;
              if (i) for (var o = 0; o < i; o += 1) {
                var a = n[o];
                t.strings.push(a.innerHTML.trim());
              }
            }
            t.strPos = 0, t.arrayPos = 0, t.stopNum = 0, t.loop = t.options.loop, t.loopCount = t.options.loopCount, t.curLoop = 0, t.shuffle = t.options.shuffle, t.sequence = [], t.pause = {
              status: !1,
              typewrite: !0,
              curString: "",
              curStrPos: 0
            }, t.typingComplete = !1;
            for (var o in t.strings) t.sequence[o] = o;
            t.currentElContent = this.getCurrentElContent(t), t.autoInsertCss = t.options.autoInsertCss, this.appendAnimationCss(t);
          }
        }, {
          key: "getCurrentElContent",
          value: function value(t) {
            var e = "";
            return e = t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent;
          }
        }, {
          key: "appendAnimationCss",
          value: function value(t) {
            var e = "data-typed-js-css";
            if (t.autoInsertCss && (t.showCursor || t.fadeOut) && !document.querySelector("[" + e + "]")) {
              var s = document.createElement("style");
              s.type = "text/css", s.setAttribute(e, !0);
              var n = "";
              t.showCursor && (n += "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "), t.fadeOut && (n += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "), 0 !== s.length && (s.innerHTML = n, document.body.appendChild(s));
            }
          }
        }]), t;
      }();
    e["default"] = l;
    var c = new l();
    e.initializer = c;
  }, function (t, e) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var s = {
      strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
      stringsElement: null,
      typeSpeed: 0,
      startDelay: 0,
      backSpeed: 0,
      smartBackspace: !0,
      shuffle: !1,
      backDelay: 700,
      fadeOut: !1,
      fadeOutClass: "typed-fade-out",
      fadeOutDelay: 500,
      loop: !1,
      loopCount: 1 / 0,
      showCursor: !0,
      cursorChar: "|",
      autoInsertCss: !0,
      attr: null,
      bindInputFocusEvents: !1,
      contentType: "html",
      onBegin: function onBegin(t) {},
      onComplete: function onComplete(t) {},
      preStringTyped: function preStringTyped(t, e) {},
      onStringTyped: function onStringTyped(t, e) {},
      onLastStringBackspaced: function onLastStringBackspaced(t) {},
      onTypingPaused: function onTypingPaused(t, e) {},
      onTypingResumed: function onTypingResumed(t, e) {},
      onReset: function onReset(t) {},
      onStop: function onStop(t, e) {},
      onStart: function onStart(t, e) {},
      onDestroy: function onDestroy(t) {}
    };
    e["default"] = s, t.exports = e["default"];
  }, function (t, e) {
    "use strict";

    function s(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var n = function () {
        function t(t, e) {
          for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }
        return function (e, s, n) {
          return s && t(e.prototype, s), n && t(e, n), e;
        };
      }(),
      i = function () {
        function t() {
          s(this, t);
        }
        return n(t, [{
          key: "typeHtmlChars",
          value: function value(t, e, s) {
            if ("html" !== s.contentType) return e;
            var n = t.substr(e).charAt(0);
            if ("<" === n || "&" === n) {
              var i = "";
              for (i = "<" === n ? ">" : ";"; t.substr(e + 1).charAt(0) !== i && (e++, !(e + 1 > t.length)););
              e++;
            }
            return e;
          }
        }, {
          key: "backSpaceHtmlChars",
          value: function value(t, e, s) {
            if ("html" !== s.contentType) return e;
            var n = t.substr(e).charAt(0);
            if (">" === n || ";" === n) {
              var i = "";
              for (i = ">" === n ? "<" : "&"; t.substr(e - 1).charAt(0) !== i && (e--, !(e < 0)););
              e--;
            }
            return e;
          }
        }]), t;
      }();
    e["default"] = i;
    var r = new i();
    e.htmlParser = r;
  }]);
});

/***/ }),

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mult: () => (/* binding */ mult),
/* harmony export */   summ: () => (/* binding */ summ)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var mult = function mult(a, b) {
  return a * b;
};
var summ = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(a, b) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", a + b);
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function summ(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/pages/index2.scss":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/pages/index2.scss ***!
  \***********************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.top-section {
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000000;
  z-index: 2;
}
.top-section .top-section-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.top-section .new-container {
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  /*  padding-bottom: 180px; */
  gap: 100px;
}
.top-section picture,
.top-section img {
  display: block;
  height: 100%;
  width: 100%;
  -o-object-fit: 100%;
     object-fit: 100%;
}
.top-section .heading > span {
  color: #F93C00;
}
.top-section .text {
  color: #FFF;
  max-width: 24vw;
  font-size: 0.8rem;
  margin-left: auto;
}
.top-section .mouse {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  bottom: 100px;
  -webkit-animation: mouse-anim 3s infinite;
          animation: mouse-anim 3s infinite;
}

@-webkit-keyframes mouse-anim {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  50% {
    -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

@keyframes mouse-anim {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  50% {
    -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
/* .typed-cursor {
    opacity: 1;
    font-weight: 100;
    animation: blink 0.7s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
} */
.main-tabs-wrapper {
  position: relative;
}
.main-tabs-wrapper .heading-absolute {
  top: 0;
  left: 0;
  z-index: 2;
}

.main-tabs-contents {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  /*  gap: 80px; */
}

.main-tabs-content {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  width: 100%;
  position: relative;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  /*    &:not(:first-child) {
      margin-top: 80px;
  } */
  /*  &:first-child {
      margin-top: 80px;
  } */
}
.main-tabs-content.active {
  z-index: 1;
  /*  opacity: 1 !important; */
}

.main-tabs-title {
  font-size: 4rem;
  font-weight: 600;
  line-height: 100%;
  /* 125% */
  letter-spacing: -0.8px;
  -webkit-box-align: end;
      -ms-flex-align: end;
          align-items: flex-end;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  width: 100%;
}
.main-tabs-title > span {
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  opacity: 0.8;
}
.main-tabs-content.active .main-tabs-title > span {
  opacity: 1;
}

.main-tabs-contents {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  min-width: 0;
}

.main-tabs-descripts_outer {
  width: 54vw;
}

.main-tabs-descripts {
  padding: 60px;
  border-radius: 10px;
  background: #F4F4F4;
  position: sticky;
  top: 0;
  /* top: calc(50vh - ) */
}
.main-tabs-descripts .main-tabs-descript:not(.active) {
  display: none;
  /* animation: anim-opacity .5s linear .2s; */
}
.main-tabs-descripts .main-tabs-descript.active {
  opacity: 1;
  -webkit-animation: anim-opacity 0.5s ease-in;
          animation: anim-opacity 0.5s ease-in;
}
.main-tabs-descripts .text {
  max-height: 90px;
  overflow: hidden;
}
.main-tabs-descripts .icons-wrappers {
  margin-top: 100px;
  gap: 2vw;
}
.main-tabs-descripts .icon-wrapper {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  gap: 27px;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  padding: 25px;
  padding-bottom: 35px;
  background: #ffffff;
  border-radius: 10px;
  max-width: 270px;
}
.main-tabs-descripts .icon-wrapper .img-wrapper {
  width: 60px;
}
.main-tabs-descripts .icon-wrapper img {
  display: block;
  width: 100%;
}

@-webkit-keyframes anim-opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes anim-opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`, "",{"version":3,"sources":["webpack://./src/scss/pages/index2.scss","webpack://./src/scss/config/_variables.scss","webpack://./src/scss/components/_tabs.scss"],"names":[],"mappings":"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","sourcesContent":["// COMMON IMPORTS\r\n@import \"../config/variables\";\r\n\r\n\r\n\r\n.top-section {\r\n    // position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100vh;\r\n    background: #000000;\r\n    z-index: 2;\r\n\r\n    // width: 100vw;\r\n    //min-height: 768px;\r\n    .top-section-bg {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .new-container {\r\n        height: 100%;\r\n        position: absolute;\r\n        top: 0;\r\n        left: 50%;\r\n        flex-direction: column;\r\n        justify-content: center;\r\n        transform: translateX(-50%);\r\n        /*  padding-bottom: 180px; */\r\n        gap: 100px;\r\n    }\r\n\r\n    picture,\r\n    img {\r\n        display: block;\r\n        height: 100%;\r\n        width: 100%;\r\n        object-fit: 100%;\r\n    }\r\n\r\n    .heading {\r\n        >span {\r\n            color: $color-font-second;\r\n        }\r\n    }\r\n\r\n    .text {\r\n        color: $color-light;\r\n        max-width: 24vw;\r\n        font-size: .8rem;\r\n        margin-left: auto;\r\n    }\r\n\r\n    .mouse {\r\n        position: absolute;\r\n        left: 50%;\r\n        transform: translateX(-50%);\r\n        bottom: 100px;\r\n        animation: mouse-anim 3s infinite;\r\n    }\r\n}\r\n\r\n@keyframes mouse-anim {\r\n    0% {\r\n        transform: translateY(0);\r\n        opacity: 1;\r\n    }\r\n\r\n    50% {\r\n        transform: translateY(-20px);\r\n        opacity: .5;\r\n    }\r\n\r\n    100% {\r\n        transform: translateY(0);\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n\r\n\r\n/* .typed-cursor {\r\n    opacity: 1;\r\n    font-weight: 100;\r\n    animation: blink 0.7s infinite;\r\n}\r\n\r\n@keyframes blink {\r\n    0% {\r\n        opacity: 1;\r\n    }\r\n\r\n    50% {\r\n        opacity: 0;\r\n    }\r\n\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n} */\r\n\r\n// Components Import\r\n@import \"../components/tabs\";","// TYPOGRAPHY\r\n// ---------------------------------------------------------------\r\n$font-heading: \"HelveticaNeueCyr\";\r\n$font-primary: \"Lato\";\r\n$font-primary-weight: normal;\r\n//$font-secondary: \"Shadows Into Light\", cursive;\r\n// $font-tertiary: \"Oswald\", sans-serif;\r\n\r\n$body-font-size: 20;\r\n$root-font-size: 16;\r\n$body-line-height: 150;\r\n\r\n// COLORS\r\n// ---------------------------------------------------------------\r\n$color-font-heading-dark: #333333;\r\n$color-font-heading-light: #FFFFFF;\r\n//$color-font-light: #ffffff;\r\n$color-font-second: #F93C00;\r\n$placeholder-color: rgba(0, 0, 0, .5);\r\n\r\n$color-background-primary: #ffffff;\r\n$color-background-second: #F1F1F1;\r\n\r\n$color-default: #000000;\r\n$color-default-light: #ffffff;\r\n\r\n$color-btn-primary: #F93C00;\r\n\r\n$color-light: #FFF;\r\n\r\n$bg-btn-primary: #F93C00;\r\n$bg-btn-primary-hover: red;\r\n\r\n\r\n// Animation \r\n// ---------------------------------------------------------------\r\n\r\n$transition: all .2s ease;\r\n\r\n// Box Sizing\r\n$box-border: border-box;","// Main Tabs Wrapper\r\n\r\n.main-tabs-wrapper {\r\n    position: relative;\r\n\r\n    .heading-absolute {\r\n        top: 0;\r\n        left: 0;\r\n        z-index: 2;\r\n    }\r\n}\r\n\r\n\r\n.main-tabs-contents {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    justify-content: flex-start;\r\n    /*  gap: 80px; */\r\n\r\n}\r\n\r\n.main-tabs-content {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    justify-content: center;\r\n    width: 100%;\r\n    position: relative;\r\n    transition: $transition;\r\n\r\n    /*    &:not(:first-child) {\r\n        margin-top: 80px;\r\n    } */\r\n\r\n    /*  &:first-child {\r\n        margin-top: 80px;\r\n    } */\r\n\r\n    // &:last-child {\r\n    //     margin-bottom: 80px;\r\n    // }\r\n\r\n    &.active {\r\n        z-index: 1;\r\n        /*  opacity: 1 !important; */\r\n    }\r\n}\r\n\r\n.main-tabs-title {\r\n    font-size: 4rem;\r\n    font-weight: 600;\r\n    line-height: 100%;\r\n    /* 125% */\r\n    letter-spacing: -0.8px;\r\n    align-items: flex-end;\r\n    justify-content: flex-start;\r\n    width: 100%;\r\n\r\n\r\n    // max-width: 35vw;\r\n    // span {\r\n    //     max-width: 35vw;\r\n    // }\r\n    >span {\r\n        transition: $transition;\r\n        opacity: .8;\r\n    }\r\n\r\n    .main-tabs-content.active &>span {\r\n        opacity: 1;\r\n    }\r\n\r\n}\r\n\r\n.main-tabs-contents {\r\n    flex: 1;\r\n    min-width: 0;\r\n}\r\n\r\n.main-tabs-descripts_outer {\r\n    width: 54vw;\r\n}\r\n\r\n.main-tabs-descripts {\r\n    padding: 60px;\r\n    border-radius: 10px;\r\n    background: #F4F4F4;\r\n    position: sticky;\r\n    top: 0;\r\n\r\n    .main-tabs-descript:not(.active) {\r\n        display: none;\r\n        /* animation: anim-opacity .5s linear .2s; */\r\n    }\r\n\r\n    .main-tabs-descript.active {\r\n        opacity: 1;\r\n        animation: anim-opacity .5s ease-in;\r\n    }\r\n\r\n    /* top: calc(50vh - ) */\r\n    .text {\r\n        max-height: 90px;\r\n        overflow: hidden;\r\n    }\r\n\r\n    .icons-wrappers {\r\n        margin-top: 100px;\r\n        gap: 2vw;\r\n    }\r\n\r\n    .icon-wrapper {\r\n        flex-direction: column;\r\n        align-items: flex-start;\r\n        gap: 27px;\r\n        justify-content: flex-start;\r\n        flex: 1;\r\n        padding: 25px;\r\n        padding-bottom: 35px;\r\n        background: #ffffff;\r\n        border-radius: 10px;\r\n        max-width: 270px;\r\n\r\n        .img-wrapper {\r\n            width: 60px;\r\n        }\r\n\r\n        img {\r\n            display: block;\r\n            width: 100%;\r\n        }\r\n    }\r\n}\r\n\r\n@keyframes anim-opacity {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \****************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Medium.eot */ "./src/fonts/HelveticaNeueCyr-Medium.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Medium.woff */ "./src/fonts/HelveticaNeueCyr-Medium.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Medium.ttf */ "./src/fonts/HelveticaNeueCyr-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Roman.eot */ "./src/fonts/HelveticaNeueCyr-Roman.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Roman.woff */ "./src/fonts/HelveticaNeueCyr-Roman.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Roman.ttf */ "./src/fonts/HelveticaNeueCyr-Roman.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Bold.eot */ "./src/fonts/HelveticaNeueCyr-Bold.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Bold.woff */ "./src/fonts/HelveticaNeueCyr-Bold.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Bold.ttf */ "./src/fonts/HelveticaNeueCyr-Bold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Light.eot */ "./src/fonts/HelveticaNeueCyr-Light.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Light.woff */ "./src/fonts/HelveticaNeueCyr-Light.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/HelveticaNeueCyr-Light.ttf */ "./src/fonts/HelveticaNeueCyr-Light.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Regular.eot */ "./src/fonts/Lato-Regular.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Regular.woff */ "./src/fonts/Lato-Regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Regular.ttf */ "./src/fonts/Lato-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Medium.eot */ "./src/fonts/Lato-Medium.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Medium.woff */ "./src/fonts/Lato-Medium.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Medium.ttf */ "./src/fonts/Lato-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Semibold.eot */ "./src/fonts/Lato-Semibold.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Semibold.woff */ "./src/fonts/Lato-Semibold.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_20___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Semibold.ttf */ "./src/fonts/Lato-Semibold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_21___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Bold.eot */ "./src/fonts/Lato-Bold.eot"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_22___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Bold.woff */ "./src/fonts/Lato-Bold.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_23___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Lato-Bold.ttf */ "./src/fonts/Lato-Bold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_22___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_23___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_24___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___);
var ___CSS_LOADER_URL_REPLACEMENT_25___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_26___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_19___);
var ___CSS_LOADER_URL_REPLACEMENT_27___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_20___);
var ___CSS_LOADER_URL_REPLACEMENT_28___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_21___);
var ___CSS_LOADER_URL_REPLACEMENT_29___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_21___, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_30___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_22___);
var ___CSS_LOADER_URL_REPLACEMENT_31___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_23___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
Name: 			style.css
Written by: 	Lavrinenko Aleksandr
Theme Version:	1.0
*/
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
/* Document
   ========================================================================== */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */
html {
  line-height: 1.15;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

/* Sections
     ========================================================================== */
/**
   * Remove the margin in all browsers.
   */
body {
  margin: 0;
}

/**
   * Render the \`main\` element consistently in IE.
   */
main {
  display: block;
}

/**
   * Correct the font size and margin on \`h1\` elements within \`section\` and
   * \`article\` contexts in Chrome, Firefox, and Safari.
   */
/* h1 {
  font-size: 2em;
  margin: 0.67em 0;
} */
/* Grouping content
     ========================================================================== */
/**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */
hr {
  -webkit-box-sizing: content-box;
          box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

/**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd \`em\` font sizing in all browsers.
   */
pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/* Text-level semantics
     ========================================================================== */
/**
   * Remove the gray background on active links in IE 10.
   */
a {
  background-color: transparent;
}

/**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */
abbr[title] {
  border-bottom: none;
  /* 1 */
  -webkit-text-decoration: underline;
  text-decoration: underline;
  /* 2 */
  text-decoration: underline;
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
  /* 2 */
}

/**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */
b,
strong {
  font-weight: bolder;
}

/**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd \`em\` font sizing in all browsers.
   */
code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/**
   * Add the correct font size in all browsers.
   */
small {
  font-size: 80%;
}

/**
   * Prevent \`sub\` and \`sup\` elements from affecting the line height in
   * all browsers.
   */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
     ========================================================================== */
/**
   * Remove the border on images inside links in IE 10.
   */
img {
  border-style: none;
}

/* Forms
     ========================================================================== */
/**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

/**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */
button,
input {
  /* 1 */
  overflow: visible;
}

/**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */
button,
select {
  /* 1 */
  text-transform: none;
}

/**
   * Correct the inability to style clickable types in iOS and Safari.
   */
button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}

/**
   * Remove the inner border and padding in Firefox.
   */
button::-moz-focus-inner,
[type=button]::-moz-focus-inner,
[type=reset]::-moz-focus-inner,
[type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
   * Restore the focus styles unset by the previous rule.
   */
button:-moz-focusring,
[type=button]:-moz-focusring,
[type=reset]:-moz-focusring,
[type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
   * Correct the padding in Firefox.
   */
fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from \`fieldset\` elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *    \`fieldset\` elements in all browsers.
   */
legend {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

/**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */
progress {
  vertical-align: baseline;
}

/**
   * Remove the default vertical scrollbar in IE 10+.
   */
textarea {
  overflow: auto;
}

/**
   * 1. Add the correct box sizing in IE 10.
   * 2. Remove the padding in IE 10.
   */
[type=checkbox],
[type=radio] {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */
[type=search] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/**
   * Remove the inner padding in Chrome and Safari on macOS.
   */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to \`inherit\` in Safari.
   */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/* Interactive
     ========================================================================== */
/*
   * Add the correct display in Edge, IE 10+, and Firefox.
   */
details {
  display: block;
}

/*
   * Add the correct display in all browsers.
   */
summary {
  display: list-item;
}

/* Misc
     ========================================================================== */
/**
   * Add the correct display in IE 10+.
   */
template {
  display: none;
}

/**
   * Add the correct display in IE 10.
   */
[hidden] {
  display: none;
}

/* Fonts CSS */
@font-face {
  font-family: "HelveticaNeueCyr";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  src: local("HelveticaNeueCyr-Medium"), url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format("truetype");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "HelveticaNeueCyr";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
  src: local("HelveticaNeueCyr-Roman"), url(${___CSS_LOADER_URL_REPLACEMENT_5___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_6___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_7___}) format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "HelveticaNeueCyr";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_8___});
  src: local("HelveticaNeueCyr-Bold"), url(${___CSS_LOADER_URL_REPLACEMENT_9___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_10___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_11___}) format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "HelveticaNeueCyr";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_12___});
  src: local("HelveticaNeueCyr-Light"), url(${___CSS_LOADER_URL_REPLACEMENT_13___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_14___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_15___}) format("truetype");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Lato";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_16___});
  src: local("Lato Regular"), local("Lato-Regular"), url(${___CSS_LOADER_URL_REPLACEMENT_17___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_18___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_19___}) format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Lato";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_20___});
  src: local("Lato Medium"), local("Lato-Medium"), url(${___CSS_LOADER_URL_REPLACEMENT_21___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_22___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_23___}) format("truetype");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Lato";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_24___});
  src: local("Lato Semibold"), local("Lato-Semibold"), url(${___CSS_LOADER_URL_REPLACEMENT_25___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_26___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_27___}) format("truetype");
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: "Lato";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_28___});
  src: local("Lato Bold"), local("Lato-Bold"), url(${___CSS_LOADER_URL_REPLACEMENT_29___}) format("embedded-opentype"), url(${___CSS_LOADER_URL_REPLACEMENT_30___}) format("woff"), url(${___CSS_LOADER_URL_REPLACEMENT_31___}) format("truetype");
  font-weight: bold;
  font-style: normal;
}
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}

html[xmlns] .clearfix {
  display: block;
}

* html .clearfix {
  height: 1%;
}

/* Position */
.p-relative {
  position: relative !important;
}

.p-absolute {
  position: absolute !important;
}

.p-fixed {
  position: fixed !important;
}

/* Color Transparent */
.color-transparent {
  color: transparent !important;
}

/* Background No Repeat */
.bg-no-repeat {
  background-repeat: no-repeat !important;
}

/* Background Size Auto */
.bg-size-auto {
  background-size: auto !important;
}

/* Background Size Cover */
.bg-size-cover {
  background-size: cover !important;
}

/* Background Position Center */
.bg-position-center {
  background-position: center center !important;
}

/* Background Clip Text */
.bg-clip-text {
  -webkit-background-clip: text !important;
          background-clip: text !important;
}
.bg-clip-text {
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

/* Display flex */
.flex-block {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}

.text-right {
  text-align: right;
}

.pointer {
  cursor: pointer;
}

/* Global CSS */
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  font-size: 20px;
}

body {
  background-color: #ffffff;
  color: #000000;
  font-family: "Lato";
  font-weight: normal;
  line-height: 150%;
  margin: 0;
}
body img {
  display: block;
  width: 100%;
}

body * {
  -webkit-box-sizing: inherit;
          box-sizing: inherit;
}

a {
  display: inline-block;
  -webkit-text-decoration: none;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  display: block;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

section:not(.top-section) {
  padding: 85px 0;
  padding-top: 170px;
}
section.main-tabs-section {
  padding-top: 100px !important;
}
section.grey {
  background: #F1F1F1;
}
section.white {
  background: #ffffff;
}

.new-container {
  width: 94vw;
  margin: 0 auto;
}

.btn {
  font-size: 0.8rem;
  letter-spacing: 0.2px;
  position: relative;
  padding: 15px 50px;
  -webkit-transition: background-color 0.3s ease-in, color 0.3s ease-in;
  transition: background-color 0.3s ease-in, color 0.3s ease-in;
  overflow: hidden;
}
.btn span {
  display: block;
  position: relative;
  z-index: 1;
}
.btn > .circle {
  width: 0px;
  height: 0px;
  position: absolute;
  background: transparent;
  border-radius: 50%;
}
.btn > .circle.anim {
  opacity: 0.3;
  -webkit-animation: touch 0.8s ease-out;
          animation: touch 0.8s ease-out;
}
.btn.btn-orange {
  color: #ffffff;
  background: #F93C00;
}
.btn.btn-orange > .circle {
  background: rgba(255, 255, 255, 0.4);
}
.btn.btn-radius {
  border-radius: 50px;
}

.link {
  letter-spacing: 0.4px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.link.link-orange {
  color: #F93C00;
  border-bottom: 1px solid #F93C00;
}
.link:hover {
  border-color: transparent;
}

@-webkit-keyframes touch {
  40% {
    opacity: 0.2;
  }
  100% {
    width: 800px;
    height: 800px;
    opacity: 0;
    margin: -400px;
  }
}

@keyframes touch {
  40% {
    opacity: 0.2;
  }
  100% {
    width: 800px;
    height: 800px;
    opacity: 0;
    margin: -400px;
  }
}
h1 {
  font-size: 75px;
  line-height: 120%;
}

h2 {
  font-size: 30px;
}
h2.heading-black {
  color: #000000;
}

.heading {
  font-family: "HelveticaNeueCyr";
  font-weight: 500;
}

.heading-absolute {
  position: absolute;
}

.heading-white {
  color: #FFFFFF;
}

.heading-black {
  color: #333333;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list li {
  position: relative;
  padding-left: 30px;
  color: #272626;
}
.list li:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #272626;
}

.page-scroll {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.page-scroll .page-scroll__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.page-scroll .page-scroll__blackout {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  pointer-events: none;
}
.page-scroll .page-scroll__item-wrapper {
  min-height: 100%;
  position: relative;
  background: #ffffff;
}

/* Header CSS */
header {
  width: 100%;
  z-index: 3;
}
header .header {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  /*  justify-content: space-between; */
  padding: 50px 0;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}
header .header .header-logo {
  width: 45px;
}
header .header .header-nav {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  gap: 60px;
  margin: 0 auto;
}
header .header .header-nav > a {
  font-size: 0.8rem;
  color: #ffffff;
  overflow: hidden;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
}
header .header .header-nav > a span {
  position: relative;
  display: inline-block;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
header .header .header-nav > a span:before {
  content: attr(data-hover);
  position: absolute;
  top: 100%;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
header .header .header-nav > a:hover {
  border-color: #FFF;
}
header .header .header-nav > a:hover span {
  -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
}
header .header .header-contacts {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  gap: 60px;
}
header .header .header-contacts .header-contacts_socs {
  gap: 50px;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
header .header .header-contacts .header-contacts_soc {
  width: 30px;
  position: relative;
  /*  overflow: hidden; */
}
header .header .header-contacts .header-contacts_soc:before {
  z-index: -1;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
          transform: translateY(-50%) translateX(-50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  opacity: 0;
  visibility: hidden;
  background: #F93C00;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
header .header .header-contacts .header-contacts_soc:hover:before {
  visibility: visible;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  -webkit-transform: translateY(-50%) translateX(-50%);
          transform: translateY(-50%) translateX(-50%);
  opacity: 1;
}
header:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  z-index: -1;
}
header.header-mini:after {
  opacity: 1;
  background: rgba(0, 0, 0, 0.8);
}
header.header-mini .header {
  padding: 10px 0;
}

@-webkit-keyframes animHeader {
  from {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
  }
  to {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
}

@keyframes animHeader {
  from {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
  }
  to {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
}`, "",{"version":3,"sources":["webpack://./src/scss/style.scss","webpack://./src/scss/config/_normalize.scss","webpack://./src/scss/config/_fonts.scss","webpack://./src/scss/base/_helpers.scss","webpack://./src/scss/base/_base.scss","webpack://./src/scss/config/_variables.scss","webpack://./src/scss/base/_header.scss"],"names":[],"mappings":"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","sourcesContent":["/*\r\nName: \t\t\tstyle.css\r\nWritten by: \tLavrinenko Aleksandr\r\nTheme Version:\t1.0\r\n*/\r\n\r\n// COMMON IMPORTS\r\n@import \"config/imports\";\r\n\r\n// HELPERS\r\n@import \"base/helpers\";\r\n\r\n// BASE\r\n@import \"base/base\";\r\n\r\n// HEADER\r\n@import \"base/header\";\r\n\r\n// FOOTER\r\n@import \"base/footer\";","/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n  line-height: 1.15;\r\n  /* 1 */\r\n  -webkit-text-size-adjust: 100%;\r\n  /* 2 */\r\n}\r\n\r\n/* Sections\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the margin in all browsers.\r\n   */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/**\r\n   * Render the `main` element consistently in IE.\r\n   */\r\n\r\nmain {\r\n  display: block;\r\n}\r\n\r\n/**\r\n   * Correct the font size and margin on `h1` elements within `section` and\r\n   * `article` contexts in Chrome, Firefox, and Safari.\r\n   */\r\n\r\n/* h1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n} */\r\n\r\n/* Grouping content\r\n     ========================================================================== */\r\n\r\n/**\r\n   * 1. Add the correct box sizing in Firefox.\r\n   * 2. Show the overflow in Edge and IE.\r\n   */\r\n\r\nhr {\r\n  box-sizing: content-box;\r\n  /* 1 */\r\n  height: 0;\r\n  /* 1 */\r\n  overflow: visible;\r\n  /* 2 */\r\n}\r\n\r\n/**\r\n   * 1. Correct the inheritance and scaling of font size in all browsers.\r\n   * 2. Correct the odd `em` font sizing in all browsers.\r\n   */\r\n\r\npre {\r\n  font-family: monospace, monospace;\r\n  /* 1 */\r\n  font-size: 1em;\r\n  /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the gray background on active links in IE 10.\r\n   */\r\n\r\na {\r\n  background-color: transparent;\r\n}\r\n\r\n/**\r\n   * 1. Remove the bottom border in Chrome 57-\r\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n   */\r\n\r\nabbr[title] {\r\n  border-bottom: none;\r\n  /* 1 */\r\n  text-decoration: underline;\r\n  /* 2 */\r\n  text-decoration: underline dotted;\r\n  /* 2 */\r\n}\r\n\r\n/**\r\n   * Add the correct font weight in Chrome, Edge, and Safari.\r\n   */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n   * 1. Correct the inheritance and scaling of font size in all browsers.\r\n   * 2. Correct the odd `em` font sizing in all browsers.\r\n   */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n  font-family: monospace, monospace;\r\n  /* 1 */\r\n  font-size: 1em;\r\n  /* 2 */\r\n}\r\n\r\n/**\r\n   * Add the correct font size in all browsers.\r\n   */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n   * Prevent `sub` and `sup` elements from affecting the line height in\r\n   * all browsers.\r\n   */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the border on images inside links in IE 10.\r\n   */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/* Forms\r\n     ========================================================================== */\r\n\r\n/**\r\n   * 1. Change the font styles in all browsers.\r\n   * 2. Remove the margin in Firefox and Safari.\r\n   */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  font-family: inherit;\r\n  /* 1 */\r\n  font-size: 100%;\r\n  /* 1 */\r\n  line-height: 1.15;\r\n  /* 1 */\r\n  margin: 0;\r\n  /* 2 */\r\n}\r\n\r\n/**\r\n   * Show the overflow in IE.\r\n   * 1. Show the overflow in Edge.\r\n   */\r\n\r\nbutton,\r\ninput {\r\n  /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n   * 1. Remove the inheritance of text transform in Firefox.\r\n   */\r\n\r\nbutton,\r\nselect {\r\n  /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n   * Correct the inability to style clickable types in iOS and Safari.\r\n   */\r\n\r\nbutton,\r\n[type=\"button\"],\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n   * Remove the inner border and padding in Firefox.\r\n   */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n   * Restore the focus styles unset by the previous rule.\r\n   */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n   * Correct the padding in Firefox.\r\n   */\r\n\r\nfieldset {\r\n  padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n   * 1. Correct the text wrapping in Edge and IE.\r\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n   * 3. Remove the padding so developers are not caught out when they zero out\r\n   *    `fieldset` elements in all browsers.\r\n   */\r\n\r\nlegend {\r\n  box-sizing: border-box;\r\n  /* 1 */\r\n  color: inherit;\r\n  /* 2 */\r\n  display: table;\r\n  /* 1 */\r\n  max-width: 100%;\r\n  /* 1 */\r\n  padding: 0;\r\n  /* 3 */\r\n  white-space: normal;\r\n  /* 1 */\r\n}\r\n\r\n/**\r\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n   */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n   * Remove the default vertical scrollbar in IE 10+.\r\n   */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n   * 1. Add the correct box sizing in IE 10.\r\n   * 2. Remove the padding in IE 10.\r\n   */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n  box-sizing: border-box;\r\n  /* 1 */\r\n  padding: 0;\r\n  /* 2 */\r\n}\r\n\r\n/**\r\n   * Correct the cursor style of increment and decrement buttons in Chrome.\r\n   */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n   * 1. Correct the odd appearance in Chrome and Safari.\r\n   * 2. Correct the outline style in Safari.\r\n   */\r\n\r\n[type=\"search\"] {\r\n  -webkit-appearance: textfield;\r\n  /* 1 */\r\n  outline-offset: -2px;\r\n  /* 2 */\r\n}\r\n\r\n/**\r\n   * Remove the inner padding in Chrome and Safari on macOS.\r\n   */\r\n\r\n[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n   * 1. Correct the inability to style clickable types in iOS and Safari.\r\n   * 2. Change font properties to `inherit` in Safari.\r\n   */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button;\r\n  /* 1 */\r\n  font: inherit;\r\n  /* 2 */\r\n}\r\n\r\n/* Interactive\r\n     ========================================================================== */\r\n\r\n/*\r\n   * Add the correct display in Edge, IE 10+, and Firefox.\r\n   */\r\n\r\ndetails {\r\n  display: block;\r\n}\r\n\r\n/*\r\n   * Add the correct display in all browsers.\r\n   */\r\n\r\nsummary {\r\n  display: list-item;\r\n}\r\n\r\n/* Misc\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Add the correct display in IE 10+.\r\n   */\r\n\r\ntemplate {\r\n  display: none;\r\n}\r\n\r\n/**\r\n   * Add the correct display in IE 10.\r\n   */\r\n\r\n[hidden] {\r\n  display: none;\r\n}","/* Fonts CSS */\r\n\r\n@font-face {\r\n    font-family: 'HelveticaNeueCyr';\r\n    src: url('../fonts/HelveticaNeueCyr-Medium.eot');\r\n    src: local('HelveticaNeueCyr-Medium'),\r\n        url('../fonts/HelveticaNeueCyr-Medium.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/HelveticaNeueCyr-Medium.woff') format('woff'),\r\n        url('../fonts/HelveticaNeueCyr-Medium.ttf') format('truetype');\r\n    font-weight: 500;\r\n    font-style: normal;\r\n}\r\n\r\n\r\n\r\n@font-face {\r\n    font-family: 'HelveticaNeueCyr';\r\n    src: url('../fonts/HelveticaNeueCyr-Roman.eot');\r\n    src: local('HelveticaNeueCyr-Roman'),\r\n        url('../fonts/HelveticaNeueCyr-Roman.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/HelveticaNeueCyr-Roman.woff') format('woff'),\r\n        url('../fonts/HelveticaNeueCyr-Roman.ttf') format('truetype');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n}\r\n\r\n@font-face {\r\n    font-family: 'HelveticaNeueCyr';\r\n    src: url('../fonts/HelveticaNeueCyr-Bold.eot');\r\n    src: local('HelveticaNeueCyr-Bold'),\r\n        url('../fonts/HelveticaNeueCyr-Bold.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/HelveticaNeueCyr-Bold.woff') format('woff'),\r\n        url('../fonts/HelveticaNeueCyr-Bold.ttf') format('truetype');\r\n    font-weight: bold;\r\n    font-style: normal;\r\n}\r\n\r\n@font-face {\r\n    font-family: 'HelveticaNeueCyr';\r\n    src: url('../fonts/HelveticaNeueCyr-Light.eot');\r\n    src: local('HelveticaNeueCyr-Light'),\r\n        url('../fonts/HelveticaNeueCyr-Light.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/HelveticaNeueCyr-Light.woff') format('woff'),\r\n        url('../fonts/HelveticaNeueCyr-Light.ttf') format('truetype');\r\n    font-weight: 300;\r\n    font-style: normal;\r\n}\r\n\r\n\r\n\r\n@font-face {\r\n    font-family: 'Lato';\r\n    src: url('../fonts/Lato-Regular.eot');\r\n    src: local('Lato Regular'), local('Lato-Regular'),\r\n        url('../fonts/Lato-Regular.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/Lato-Regular.woff') format('woff'),\r\n        url('../fonts/Lato-Regular.ttf') format('truetype');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n}\r\n\r\n\r\n\r\n@font-face {\r\n    font-family: 'Lato';\r\n    src: url('../fonts/Lato-Medium.eot');\r\n    src: local('Lato Medium'), local('Lato-Medium'),\r\n        url('../fonts/Lato-Medium.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/Lato-Medium.woff') format('woff'),\r\n        url('../fonts/Lato-Medium.ttf') format('truetype');\r\n    font-weight: 500;\r\n    font-style: normal;\r\n}\r\n\r\n\r\n@font-face {\r\n    font-family: 'Lato';\r\n    src: url('../fonts/Lato-Semibold.eot');\r\n    src: local('Lato Semibold'), local('Lato-Semibold'),\r\n        url('../fonts/Lato-Semibold.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/Lato-Semibold.woff') format('woff'),\r\n        url('../fonts/Lato-Semibold.ttf') format('truetype');\r\n    font-weight: 600;\r\n    font-style: normal;\r\n}\r\n\r\n@font-face {\r\n    font-family: 'Lato';\r\n    src: url('../fonts/Lato-Bold.eot');\r\n    src: local('Lato Bold'), local('Lato-Bold'),\r\n        url('../fonts/Lato-Bold.eot?#iefix') format('embedded-opentype'),\r\n        url('../fonts/Lato-Bold.woff') format('woff'),\r\n        url('../fonts/Lato-Bold.ttf') format('truetype');\r\n    font-weight: bold;\r\n    font-style: normal;\r\n}\r\n\r\n\r\n// @font-face {\r\n//     font-family: 'Lato';\r\n//     src: url('../fonts/Lato-Light.eot');\r\n//     src: local('Lato Light'), local('Lato-Light'),\r\n//         url('../fonts/Lato-Light.eot?#iefix') format('embedded-opentype'),\r\n//         url('../fonts/Lato-Light.woff') format('woff'),\r\n//         url('../fonts/Lato-Light.ttf') format('truetype');\r\n//     font-weight: 300;\r\n//     font-style: normal;\r\n// }",".clearfix {\r\n    &:after {\r\n        content: \".\";\r\n        display: block;\r\n        clear: both;\r\n        visibility: hidden;\r\n        line-height: 0;\r\n        height: 0;\r\n    }\r\n}\r\n\r\nhtml[xmlns] .clearfix {\r\n    display: block;\r\n}\r\n\r\n* html .clearfix {\r\n    height: 1%;\r\n}\r\n\r\n/* Position */\r\n.p-relative {\r\n    position: relative !important\r\n}\r\n\r\n.p-absolute {\r\n    position: absolute !important\r\n}\r\n\r\n.p-fixed {\r\n    position: fixed !important\r\n}\r\n\r\n/* Color Transparent */\r\n.color-transparent {\r\n    color: transparent !important;\r\n}\r\n\r\n/* Background No Repeat */\r\n.bg-no-repeat {\r\n    background-repeat: no-repeat !important;\r\n}\r\n\r\n/* Background Size Auto */\r\n.bg-size-auto {\r\n    background-size: auto !important;\r\n}\r\n\r\n/* Background Size Cover */\r\n.bg-size-cover {\r\n    background-size: cover !important;\r\n}\r\n\r\n/* Background Position Center */\r\n.bg-position-center {\r\n    background-position: center center !important;\r\n}\r\n\r\n/* Background Clip Text */\r\n.bg-clip-text {\r\n    background-clip: text !important;\r\n    -webkit-text-fill-color: transparent;\r\n    -webkit-background-clip: text;\r\n}\r\n\r\n/* Display flex */\r\n.flex-block {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.text-right {\r\n    text-align: right;\r\n}\r\n\r\n.pointer {\r\n    cursor: pointer;\r\n}","/* Global CSS */\r\n* {\r\n    -webkit-box-sizing: $box-border;\r\n    box-sizing: $box-border;\r\n}\r\n\r\nhtml {\r\n    font-size: $body-font-size + 0px;\r\n}\r\n\r\n\r\n\r\nbody {\r\n    background-color: $color-background-primary;\r\n    color: $color-default;\r\n    font-family: $font-primary;\r\n    font-weight: $font-primary-weight;\r\n    //font-size: $body-font-size + 0px;\r\n    line-height: $body-line-height + 0%;\r\n    margin: 0;\r\n\r\n    img {\r\n        display: block;\r\n        width: 100%;\r\n    }\r\n}\r\n\r\nbody * {\r\n    box-sizing: inherit;\r\n}\r\n\r\na {\r\n    display: inline-block;\r\n    text-decoration: none;\r\n}\r\n\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\np {\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-weight: normal;\r\n}\r\n\r\nsection {\r\n    &:not(.top-section) {\r\n        padding: 85px 0;\r\n        padding-top: 170px;\r\n    }\r\n\r\n    &.main-tabs-section {\r\n        padding-top: 100px !important;\r\n    }\r\n\r\n\r\n    &.grey {\r\n        background: #F1F1F1;\r\n    }\r\n\r\n    &.white {\r\n        background: #ffffff;\r\n    }\r\n}\r\n\r\n.new-container {\r\n    width: 94vw;\r\n    margin: 0 auto;\r\n}\r\n\r\n.btn {\r\n    font-size: .8rem;\r\n    letter-spacing: .2px;\r\n    position: relative;\r\n    //font-weight: 600;\r\n    padding: 15px 50px;\r\n    transition: background-color 0.3s ease-in, color 0.3s ease-in;\r\n    overflow: hidden;\r\n\r\n    span {\r\n        display: block;\r\n        position: relative;\r\n        z-index: 1;\r\n    }\r\n\r\n    >.circle {\r\n        width: 0px;\r\n        height: 0px;\r\n        position: absolute;\r\n        background: transparent;\r\n        border-radius: 50%;\r\n\r\n        &.anim {\r\n            opacity: 0.3;\r\n            animation: touch 0.8s ease-out;\r\n        }\r\n    }\r\n\r\n    &.btn-orange {\r\n        color: $color-default-light;\r\n        background: $bg-btn-primary;\r\n\r\n        >.circle {\r\n            background: rgba(255, 255, 255, .4);\r\n        }\r\n    }\r\n\r\n    &.btn-radius {\r\n        border-radius: 50px;\r\n    }\r\n}\r\n\r\n.link {\r\n    letter-spacing: 0.4px;\r\n    transition: $transition;\r\n\r\n    &.link-orange {\r\n        color: $color-font-second;\r\n        border-bottom: 1px solid $color-font-second;\r\n\r\n    }\r\n\r\n    &:hover {\r\n        border-color: transparent;\r\n    }\r\n}\r\n\r\n@keyframes touch {\r\n    40% {\r\n        opacity: 0.2;\r\n    }\r\n\r\n    100% {\r\n        width: 800px;\r\n        height: 800px;\r\n        opacity: 0;\r\n        margin: -400px;\r\n    }\r\n}\r\n\r\nh1 {\r\n    font-size: 75px;\r\n    line-height: 120%;\r\n}\r\n\r\nh2 {\r\n    font-size: 30px;\r\n\r\n    &.heading-black {\r\n        color: $color-default;\r\n    }\r\n}\r\n\r\n.heading {\r\n    font-family: $font-heading;\r\n    font-weight: 500;\r\n}\r\n\r\n.heading-absolute {\r\n    position: absolute;\r\n}\r\n\r\n.heading-white {\r\n    color: $color-font-heading-light;\r\n}\r\n\r\n.heading-black {\r\n    color: $color-font-heading-dark;\r\n}\r\n\r\n.list {\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n\r\n    li {\r\n        position: relative;\r\n        padding-left: 30px;\r\n        color: #272626;\r\n\r\n        &:before {\r\n            content: '';\r\n            position: absolute;\r\n            top: 50%;\r\n            left: 0;\r\n            transform: translateY(-50%);\r\n            width: 8px;\r\n            height: 8px;\r\n            border-radius: 50%;\r\n            background: #272626;\r\n        }\r\n    }\r\n}\r\n\r\n.page-scroll {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: hidden;\r\n\r\n    .page-scroll__item {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        overflow: hidden;\r\n    }\r\n\r\n    .page-scroll__blackout {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        display: block;\r\n        width: 100%;\r\n        height: 100%;\r\n        background-color: #000;\r\n        pointer-events: none;\r\n    }\r\n\r\n    .page-scroll__item-wrapper {\r\n        min-height: 100%;\r\n        position: relative;\r\n        background: #ffffff;\r\n    }\r\n}","// TYPOGRAPHY\r\n// ---------------------------------------------------------------\r\n$font-heading: \"HelveticaNeueCyr\";\r\n$font-primary: \"Lato\";\r\n$font-primary-weight: normal;\r\n//$font-secondary: \"Shadows Into Light\", cursive;\r\n// $font-tertiary: \"Oswald\", sans-serif;\r\n\r\n$body-font-size: 20;\r\n$root-font-size: 16;\r\n$body-line-height: 150;\r\n\r\n// COLORS\r\n// ---------------------------------------------------------------\r\n$color-font-heading-dark: #333333;\r\n$color-font-heading-light: #FFFFFF;\r\n//$color-font-light: #ffffff;\r\n$color-font-second: #F93C00;\r\n$placeholder-color: rgba(0, 0, 0, .5);\r\n\r\n$color-background-primary: #ffffff;\r\n$color-background-second: #F1F1F1;\r\n\r\n$color-default: #000000;\r\n$color-default-light: #ffffff;\r\n\r\n$color-btn-primary: #F93C00;\r\n\r\n$color-light: #FFF;\r\n\r\n$bg-btn-primary: #F93C00;\r\n$bg-btn-primary-hover: red;\r\n\r\n\r\n// Animation \r\n// ---------------------------------------------------------------\r\n\r\n$transition: all .2s ease;\r\n\r\n// Box Sizing\r\n$box-border: border-box;","/* Header CSS */\r\nheader {\r\n    width: 100%;\r\n    z-index: 3;\r\n\r\n    .header {\r\n        align-items: center;\r\n        /*  justify-content: space-between; */\r\n        padding: 50px 0;\r\n        transition: $transition;\r\n        // transition: .5s linear;\r\n        position: relative;\r\n        z-index: 1;\r\n\r\n        .header-logo {\r\n            width: 45px;\r\n        }\r\n\r\n        .header-nav {\r\n            align-items: center;\r\n            gap: 60px;\r\n            margin: 0 auto;\r\n\r\n            >a {\r\n                font-size: .8rem;\r\n                color: $color-default-light;\r\n                overflow: hidden;\r\n                transition: $transition;\r\n                border-bottom: 1px solid transparent;\r\n\r\n                span {\r\n                    position: relative;\r\n                    display: inline-block;\r\n                    transition: transform 0.3s;\r\n\r\n                    &:before {\r\n                        content: attr(data-hover);\r\n                        position: absolute;\r\n                        top: 100%;\r\n                        transform: translate3d(0, 0, 0);\r\n                    }\r\n                }\r\n\r\n                &:hover {\r\n                    span {\r\n                        transform: translateY(-100%);\r\n                    }\r\n\r\n                    border-color: $color-light;\r\n                }\r\n            }\r\n        }\r\n\r\n        .header-contacts {\r\n            align-items: center;\r\n            gap: 60px;\r\n\r\n            .header-contacts_socs {\r\n                gap: 50px;\r\n                align-items: center;\r\n            }\r\n\r\n            .header-contacts_soc {\r\n                width: 30px;\r\n                position: relative;\r\n                /*  overflow: hidden; */\r\n\r\n                &:before {\r\n                    z-index: -1;\r\n                    content: '';\r\n                    position: absolute;\r\n                    top: 50%;\r\n                    left: 50%;\r\n                    transform: translateY(-50%) translateX(-50%);\r\n                    width: 0;\r\n                    height: 0;\r\n                    border-radius: 50%;\r\n                    opacity: 0;\r\n                    visibility: hidden;\r\n                    background: $bg-btn-primary;\r\n                    transition: $transition;\r\n                }\r\n\r\n                &:hover:before {\r\n                    visibility: visible;\r\n                    width: calc(100% + 20px);\r\n                    height: calc(100% + 20px);\r\n                    transform: translateY(-50%) translateX(-50%);\r\n                    opacity: 1;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    &:after {\r\n        content: '';\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background: transparent;\r\n        opacity: 0;\r\n        transition: $transition;\r\n        z-index: -1;\r\n    }\r\n\r\n    &.header-mini {\r\n        // transform: translateY(-100%);\r\n        // animation: animHeader .5s ease;\r\n\r\n\r\n        &:after {\r\n            opacity: 1;\r\n            background: rgba(0, 0, 0, .8);\r\n\r\n        }\r\n\r\n        .header {\r\n            padding: 10px 0;\r\n        }\r\n    }\r\n}\r\n\r\n@keyframes animHeader {\r\n    from {\r\n        transform: translateY(-100%);\r\n    }\r\n\r\n    to {\r\n        transform: translateY(0);\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./media/img/logo.png */ "./src/media/img/logo.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./media/icon/telegram.png */ "./src/media/icon/telegram.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./media/icon/whatsapp.png */ "./src/media/icon/whatsapp.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./media/icon/vk.png */ "./src/media/icon/vk.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./media/img/index/top.jpg */ "./src/media/img/index/top.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./media/icon/mouse.svg */ "./src/media/icon/mouse.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./media/icon/usability.png */ "./src/media/icon/usability.png"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var ___HTML_LOADER_REPLACEMENT_6___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_6___);
var code = "<!DOCTYPE html>\r\n<html lang=\"ru\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Our Site</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html\" charset=\"utf-8\">\r\n    <meta name=\"keywords\" content=\"Our Site\">\r\n    <meta name=\"description\" content=\"Our Site\">\r\n    <meta name=\"viewport\"\r\n        content=\"minimum-scale=1.0, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\r\n    <meta name=\"HandheldFriendly\" content=\"true\">\r\n    <meta name=\"MobileOptimized\" content=\"320\">\r\n    <meta name=\"format-detection\" content=\"telephone=no\">\r\n    <!-- <link rel=\"icon\" href=\"favicon.ico\" type=\"image/x-icon\"> -->\r\n\r\n    <!-- Plugins CSS-->\r\n    <!-- <link rel=\"stylesheet\" type=\"text/css\" href=\"./css/plugins/aos.css\">\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"./css/plugins/swiper.min.css\">\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"./css/plugins/select2.min.css\"> -->\r\n\r\n    <!-- Style CSS-->\r\n    <!-- <link rel=\"stylesheet\" type=\"text/css\" href=\"./css/style.css\"> -->\r\n    <!-- Index Page CSS-->\r\n    <!-- <link rel=\"stylesheet\" type=\"text/css\" href=\"./css/index2.css\"> -->\r\n</head>\r\n\r\n<body>\r\n    <div class=\"body-inner\">\r\n        <header class=\"p-fixed\">\r\n            <div class=\"new-container\">\r\n                <div class=\"header flex-block\">\r\n                    <a href=\"/\" class=\"header-logo\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"\">\r\n                    </a>\r\n                    <nav class=\"header-nav flex-block\">\r\n                        <a href=\"#services\" class=\"btn-animate\"><span data-hover=\"Услуги\">Услуги</span></a>\r\n                        <a href=\"#services2\" class=\"btn-animate\"><span data-hover=\"Процесс работы\">Процесс\r\n                                работы</span></a>\r\n                        <a href=\"javascript: void(0)\"><span data-hover=\"Наши клиенты\">Наши клиенты</span></a>\r\n                        <a href=\"javascript: void(0)\"><span data-hover=\"Команда\">Команда</span></a>\r\n                        <a href=\"javascript: void(0)\"><span data-hover=\"Контакты\">Контакты</span></a>\r\n                    </nav>\r\n                    <div class=\"header-contacts flex-block\">\r\n                        <div class=\"header-contacts_socs flex-block\">\r\n                            <a href=\"javascript: void(0)\" class=\"header-contacts_soc\">\r\n                                <img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"\">\r\n                            </a>\r\n                            <a href=\"javascript: void(0)\" class=\"header-contacts_soc\">\r\n                                <img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"\">\r\n                            </a>\r\n                            <a href=\"javascript: void(0)\" class=\"header-contacts_soc\">\r\n                                <img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"\">\r\n                            </a>\r\n                        </div>\r\n                        <a href=\"javascript: void(0)\" class=\"btn btn-orange btn-radius\"><span\r\n                                data-hover=\"Обсудить проект\">Обсудить проект</span></a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </header>\r\n        <main>\r\n            <section class=\"top-section\">\r\n                <div class=\"top-section-bg\">\r\n                    <picture>\r\n                        <!-- <source media=\"(min-width: 1200px)\" srcset=\"\"> -->\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"\">\r\n                    </picture>\r\n                </div>\r\n                <div class=\"new-container flex-block\">\r\n                    <h1 class=\"heading heading-white\">\r\n                        Мы помогаем превращать идеи<br /> в отличный <span class=\"typed-js\"\r\n                            id=\"main-heading\"><span>пользовательский опыт</span><span>текст 2</span></span>\r\n                    </h1>\r\n                    <div class=\"text\">Мы арт-студия. Для нас цифровые продукты — это больше,\r\n                        чем просто строки кода. Мы ценим каждого клиента и создаём условия для долгосрочного\r\n                        сотрудничества.</div>\r\n                    <a href=\"#services\" class=\"mouse btn-animate\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" alt=\"\">\r\n                    </a>\r\n                </div>\r\n\r\n            </section>\r\n            <section class=\"white main-tabs-section\" id=\"services\">\r\n                <div class=\"new-container\">\r\n                    <div class=\"main-tabs-wrapper\">\r\n                        <h2 class=\"heading-black heading-absolute\">Услуги</h2>\r\n                        <div class=\"main-tabs-contents-outer flex-block\">\r\n                            <div class=\"main-tabs-contents flex-block\">\r\n                                <div class=\"main-tabs-content flex-block active\">\r\n                                    <div class=\"main-tabs-title heading heading-black\">UX/UI\r\n                                        Design</div>\r\n                                </div>\r\n                                <div class=\"main-tabs-content flex-block\">\r\n                                    <div class=\"main-tabs-title heading heading-black\">\r\n                                        Front-end Development\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"main-tabs-content flex-block\">\r\n                                    <div class=\"main-tabs-title heading heading-black \">\r\n                                        Back-end Development\r\n                                    </div>\r\n\r\n                                </div>\r\n                                <div class=\"main-tabs-content flex-block\">\r\n                                    <div class=\"main-tabs-title heading heading-black\">\r\n                                        Front-end Development\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"main-tabs-content flex-block\">\r\n                                    <div class=\"main-tabs-title heading heading-black\">\r\n                                        Back-end Development\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"main-tabs-descripts_outer\">\r\n                                <div class=\"main-tabs-descripts\">\r\n                                    <div class=\"main-tabs-descript active\">\r\n                                        <div class=\"text\">\r\n                                            Разработаем дизайн конкретно под ваш продукт и запрос. Проанализируем\r\n                                            целевую аудиторию, проведем бриф, проанализируем рынок, чтобы бы конечно\r\n                                            результат выделял вас среди конкурентов вашей ниши!\r\n                                        </div>\r\n                                        <div class=\"icons-wrappers flex-block\">\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Сайты, мобильные приложения</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Презентации</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Сайты, мобильные приложения</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"main-tabs-descript\">\r\n                                        <div class=\"text\">\r\n                                            Создаем адаптивные страницы сайта, которые точно соответсвуют\r\n                                            дизайн-макетам, придерживаясь подхода pixel perfect. Добавляем анимацию для\r\n                                            улучшения визуального восприятия и повышения вовлеченности пользователей.\r\n                                        </div>\r\n                                        <div class=\"icons-wrappers flex-block\">\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Адаптивность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Кроссбраузерность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Валидность</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"main-tabs-descript\">\r\n                                        <div class=\"text\">\r\n                                            3\r\n                                        </div>\r\n                                        <div class=\"icons-wrappers flex-block\">\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Адаптивность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Кроссбраузерность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Валидность</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"main-tabs-descript\">\r\n                                        <div class=\"text\">\r\n                                            4\r\n                                        </div>\r\n                                        <div class=\"icons-wrappers flex-block\">\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Адаптивность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Кроссбраузерность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Валидность</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"main-tabs-descript\">\r\n                                        <div class=\"text\">\r\n                                            5\r\n                                        </div>\r\n                                        <div class=\"icons-wrappers flex-block\">\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Адаптивность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Кроссбраузерность</span>\r\n                                            </div>\r\n                                            <div class=\"icon-wrapper flex-block\">\r\n                                                <div class=\"img-wrapper\">\r\n                                                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_6___ + "\" alt=\"\">\r\n                                                </div>\r\n                                                <span>Валидность</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </section>\r\n            <section style=\"height: 2000px;\"></section>\r\n\r\n\r\n            <!--  <section style=\"height: 2000px;\"></section> -->\r\n        </main>\r\n\r\n        <footer></footer>\r\n    </div>\r\n    <!--Swiper-Slider JS-->\r\n    <!-- <" + "script src=\"vendor/plugins/swiper/swiper.min.js\"><" + "/script> -->\r\n    <!--Current-Device JS-->\r\n    <!-- <" + "script src=\"vendor/plugins/current-device/device.js\"><" + "/script> -->\r\n    <!--Rellax-->\r\n    <!-- <" + "script src=\"vendor/plugins/rellax/rellax.min.js\"><" + "/script> -->\r\n    <!--AOS JS-->\r\n    <!-- <" + "script src=\"vendor/plugins/aos-animate/aos.js\"><" + "/script> -->\r\n    <!--  Modal JS -->\r\n    <!-- <" + "script src=\"vendor/plugins/jquery.modal/jquery.modal.min.js\"><" + "/script> -->\r\n    <!--  Typed JS -->\r\n    <!-- <" + "script src=\"vendor/plugins/typed/typed.min.js\"><" + "/script> -->\r\n\r\n\r\n    <!-- Theme Base, Components and Settings -->\r\n    <!-- <" + "script src=\"js/main.js\"><" + "/script> -->\r\n\r\n    <!-- Theme Custom -->\r\n    <!-- <" + "script src=\"js/index.js\"><" + "/script> -->\r\n\r\n    <!-- Theme Initialization Files -->\r\n    <!-- <" + "script src=\"js/main.init.js\"><" + "/script> -->\r\n</body>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/scss/pages/index2.scss":
/*!************************************!*\
  !*** ./src/scss/pages/index2.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index2_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./index2.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/pages/index2.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index2_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index2_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index2_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index2_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/media/icon/telegram.png":
/*!*************************************!*\
  !*** ./src/media/icon/telegram.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/img/telegram.png";

/***/ }),

/***/ "./src/media/icon/usability.png":
/*!**************************************!*\
  !*** ./src/media/icon/usability.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/img/usability.png";

/***/ }),

/***/ "./src/media/icon/vk.png":
/*!*******************************!*\
  !*** ./src/media/icon/vk.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/img/vk.png";

/***/ }),

/***/ "./src/media/icon/whatsapp.png":
/*!*************************************!*\
  !*** ./src/media/icon/whatsapp.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/img/whatsapp.png";

/***/ }),

/***/ "./src/media/img/index/top.jpg":
/*!*************************************!*\
  !*** ./src/media/img/index/top.jpg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/img/top.jpg";

/***/ }),

/***/ "./src/media/img/logo.png":
/*!********************************!*\
  !*** ./src/media/img/logo.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/img/logo.png";

/***/ }),

/***/ "./src/media/icon/mouse.svg":
/*!**********************************!*\
  !*** ./src/media/icon/mouse.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/media/icons/mouse.svg";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Bold.eot":
/*!*********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Bold.eot ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Bold.eot";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Bold.ttf":
/*!*********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Bold.ttf ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Bold.ttf";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Bold.woff":
/*!**********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Bold.woff ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Bold.woff";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Light.eot":
/*!**********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Light.eot ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Light.eot";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Light.ttf":
/*!**********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Light.ttf ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Light.ttf";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Light.woff":
/*!***********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Light.woff ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Light.woff";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Medium.eot":
/*!***********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Medium.eot ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Medium.eot";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Medium.ttf":
/*!***********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Medium.ttf ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Medium.ttf";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Medium.woff":
/*!************************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Medium.woff ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Medium.woff";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Roman.eot":
/*!**********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Roman.eot ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Roman.eot";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Roman.ttf":
/*!**********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Roman.ttf ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Roman.ttf";

/***/ }),

/***/ "./src/fonts/HelveticaNeueCyr-Roman.woff":
/*!***********************************************!*\
  !*** ./src/fonts/HelveticaNeueCyr-Roman.woff ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/HelveticaNeueCyr-Roman.woff";

/***/ }),

/***/ "./src/fonts/Lato-Bold.eot":
/*!*********************************!*\
  !*** ./src/fonts/Lato-Bold.eot ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Bold.eot";

/***/ }),

/***/ "./src/fonts/Lato-Bold.ttf":
/*!*********************************!*\
  !*** ./src/fonts/Lato-Bold.ttf ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Bold.ttf";

/***/ }),

/***/ "./src/fonts/Lato-Bold.woff":
/*!**********************************!*\
  !*** ./src/fonts/Lato-Bold.woff ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Bold.woff";

/***/ }),

/***/ "./src/fonts/Lato-Medium.eot":
/*!***********************************!*\
  !*** ./src/fonts/Lato-Medium.eot ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Medium.eot";

/***/ }),

/***/ "./src/fonts/Lato-Medium.ttf":
/*!***********************************!*\
  !*** ./src/fonts/Lato-Medium.ttf ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Medium.ttf";

/***/ }),

/***/ "./src/fonts/Lato-Medium.woff":
/*!************************************!*\
  !*** ./src/fonts/Lato-Medium.woff ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Medium.woff";

/***/ }),

/***/ "./src/fonts/Lato-Regular.eot":
/*!************************************!*\
  !*** ./src/fonts/Lato-Regular.eot ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Regular.eot";

/***/ }),

/***/ "./src/fonts/Lato-Regular.ttf":
/*!************************************!*\
  !*** ./src/fonts/Lato-Regular.ttf ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Regular.ttf";

/***/ }),

/***/ "./src/fonts/Lato-Regular.woff":
/*!*************************************!*\
  !*** ./src/fonts/Lato-Regular.woff ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Regular.woff";

/***/ }),

/***/ "./src/fonts/Lato-Semibold.eot":
/*!*************************************!*\
  !*** ./src/fonts/Lato-Semibold.eot ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Semibold.eot";

/***/ }),

/***/ "./src/fonts/Lato-Semibold.ttf":
/*!*************************************!*\
  !*** ./src/fonts/Lato-Semibold.ttf ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Semibold.ttf";

/***/ }),

/***/ "./src/fonts/Lato-Semibold.woff":
/*!**************************************!*\
  !*** ./src/fonts/Lato-Semibold.woff ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/Lato-Semibold.woff";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.html */ "./src/index.html");
/* harmony import */ var scss_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var scss_pages_index2_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scss/pages/index2.scss */ "./src/scss/pages/index2.scss");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main.js */ "./src/js/main.js");
/* harmony import */ var _main_init_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main.init.js */ "./src/js/main.init.js");
/* harmony import */ var _main_init_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_main_init_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/calc */ "./src/modules/calc.js");

console.log((0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.mult)(3, 4));
console.log((0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.summ)(3, 4));
// summ(3, 4).then((value) => console.log(value));






})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map