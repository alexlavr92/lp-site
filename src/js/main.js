
import Typed from 'Plugs/typed/typed.min.js';
window.theme = {};

(function (theme, $) {
    'use strict'

    // Функционал для хэдера
    theme.Header = {
        headerElem: $('body').find('header'),
        initScroll: function (options) {
            var $this = this
            var defaultsOptions = {
                header: $this.headerElem
            }
            var options = $.extend(defaultsOptions, options);
            /*    headerHeight =  */
            $this.headerHeight = options.header.innerHeight()

            $(window).on('scroll', function (e) {
                var $window = $(window),
                    scrollTop = $window.scrollTop()
                // console.log(scrollTop)
                scrollTop > $this.headerHeight
                    ? options.header.addClass('header-mini')
                    : options.header.removeClass('header-mini')

            })
        }
    }

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
                o = options
            // console.log($this)
            $(o.newRound).appendTo($this)
            var newRound = $this.find('.circle'),
                x = e.pageX - $this.offset().left,
                y = e.pageY - $this.offset().top
            newRound.css({
                'left': x + "px",
                'top': y + "px"
            })
            newRound.addClass('anim')
            setTimeout(function () {
                newRound.remove();
            }, o.delay);
        })
    }
    //----------------------//


    // Плагин для работы typed.js
    theme.typedInit = function ($this) {
        // console.log($this)
        $('body').on("DOMNodeInserted", function (event) {
            if ($(event.target).hasClass('typed-js') || $(event.target).find('.typed-js').length) {
                if (!$(event.target).hasClass('init')) {
                    var NewTypedJs = $(event.target).hasClass('typed-js')
                    if ($(event.target).hasClass('typed-js')) NewTypedJs = $(event.target)
                    else NewTypedJs = $(event.target).find('.typed-js')
                    InitTypedSingle(NewTypedJs)
                }
            }
        });
        // Иницализация написания текста //
        function InitTypedSingle(selfTyped) {
            // console.log(selfTyped)
            let typedTextElem = selfTyped,
                typedText = typedTextElem.children('span')
            typedTextElem.html('')
            var typedTextString = typedText.map(function () {
                return $(this).text()
            }).get()
            // console.log(selfTyped.attr('id'))
            let typed = new Typed('#' + selfTyped.attr('id') + '', { // Тут id того блока, в которм будет анимация
                strings: typedTextString,
                showCursor: true,
                autoInsertCss: true,
                onBegin: function (self) {
                    // console.log($(self.el))
                    $(self.el).addClass('init')
                },
                /*   onComplete: function (self) {
                      console.log(self.el)
                  }, */
                typeSpeed: 50, // Скорость печати
                startDelay: 500, // Задержка перед стартом анимации
                backSpeed: 50, // Скорость удаления
                loop: true // Указываем, повторять ли анимацию
            });
        }
        $.each($this, function () {
            // console.log(this)
            InitTypedSingle($(this))
        })

    }


    theme.Tabs = {
        defaultsOptions: {
            tabsElems: 'main-tabs-content',
            activeClass: 'active',
            tabsDescript: 'main-tabs-descripts'
        },
        InitTabs: function (options) {
            var options = $.extend(this.defaultsOptions, options),
                TabDiscriptElem = $('.' + options.tabsDescript + ''),
                TabContantsElems = $('.' + options.tabsElems + ''),
                TabContentsOuter = TabContantsElems.closest('.main-tabs-contents'),
                TabDescriptOuter = TabContentsOuter.next('.main-tabs-descripts_outer')
            // console.log(TabDiscriptElem)
            var TabDiscriptElemHeight = TabDiscriptElem.innerHeight()
            TabDiscriptElem.css({
                'top': 'calc(50vh - ' + (TabDiscriptElemHeight / 2) + 'px)'
            })
            /*    TabDescriptOuter.css({
                   'padding-top': TabDiscriptElemHeight / 4 + 'px'
               }) */
            $.each(TabContantsElems, function () {
                $(this).css({
                    'height': (TabDiscriptElemHeight) + 'px',
                })
            })
            TabContantsElems.filter(':not(.active)').css({
                'opacity': '0'
            })

            let ReplaceTabDescript = function (currentIndex) {
                var TabsDescriptsElem = TabDescriptOuter.find('.main-tabs-descript'),
                    NowActiveTabDescript = TabsDescriptsElem.filter('.active'),
                    NewActiveTabDescript = TabsDescriptsElem.filter(':nth-child(' + (currentIndex + 1) + ')')
                // console.log(currentIndex)
                NowActiveTabDescript.hide().removeClass('active')
                NewActiveTabDescript.show().addClass('active')
                // .addClass('active')

            }
            /*  TabContentsOuter.css({
                 'padding-top': (TabDiscriptElemHeight / 2) + 'px',
                 'padding-bottom': (TabDiscriptElemHeight / 2) + 'px'
             }) */
            var lastScrollTop = 0
            // currentTabContent = TabContantsElems.filter(':first-child')
            // console.log(TabContentsOuter.offset().top)



            $(window).on('scroll', function () {

                var scrollTop = $(window).scrollTop(),
                    windowHeight = $(window).height()
                var NextTabElem,
                    AfterNextTabElem,
                    PrevTabElem,
                    BeforePrevTabElem,
                    PercentCurrentNext,
                    PercentNext,
                    currentTabContent = TabContantsElems.filter('.active')

                // console.log(currentTabContent)
                if (scrollTop > lastScrollTop) {

                    // console.log(currentTabContent)
                    if (currentTabContent.next().length && (scrollTop + windowHeight >= currentTabContent.next().offset().top)) {

                        // if (currentTabContent.index() != TabContantsElems.length - 1) {
                        if (currentTabContent.index() < TabContantsElems.length - 2) {
                            NextTabElem = currentTabContent.next()
                            AfterNextTabElem = NextTabElem.next()

                            PercentCurrentNext = ((scrollTop + windowHeight) - NextTabElem.offset().top)
                                / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2)

                            PercentNext = ((scrollTop + windowHeight) - AfterNextTabElem.offset().top)
                                / (currentTabContent.innerHeight() * 2)
                        }
                        else if (currentTabContent.index() == TabContantsElems.length - 2) {
                            NextTabElem = currentTabContent.next()
                            PercentCurrentNext = ((scrollTop + windowHeight) - NextTabElem.offset().top)
                                / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2)
                        }

                        currentTabContent.css('opacity', (1 - PercentCurrentNext))
                        NextTabElem.css('opacity', PercentCurrentNext)
                        if (!NextTabElem.hasClass('active')) {
                            if (scrollTop + windowHeight >= NextTabElem.offset().top + NextTabElem.innerHeight() + NextTabElem.innerHeight() / 3.75) {

                                currentTabContent.removeClass('active')
                                // NextTabElem.css('opacity', '1')
                                currentTabContent = NextTabElem
                                currentTabContent.addClass('active')
                                ReplaceTabDescript(currentTabContent.index())
                            }
                        }
                        // console.log(currentTabContent.index())
                        if (currentTabContent.index() < TabContantsElems.length - 1 && currentTabContent.index() != 0) {
                            if (scrollTop + windowHeight >= (NextTabElem.offset().top)
                                && scrollTop + windowHeight <= (NextTabElem.offset().top + NextTabElem.innerHeight())) {
                                currentTabContent.css('opacity', '1')
                                // console.log('тут')
                            }
                        }


                        if (AfterNextTabElem != undefined && (scrollTop + windowHeight) >= AfterNextTabElem.offset().top) {
                            AfterNextTabElem.css('opacity', PercentNext)
                            if (PercentNext >= 1) {
                                AfterNextTabElem.css('opacity', '1')
                            }
                            if (PercentNext < 0)
                                AfterNextTabElem.css('opacity', '0')
                        }
                    }
                    else if (currentTabContent.index() == TabContantsElems.length - 1) {
                        // console.log('последний элемент')
                        PercentCurrentNext = ((scrollTop + windowHeight) - currentTabContent.offset().top)
                            / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2)
                        currentTabContent.css('opacity', PercentCurrentNext)
                        if (PercentCurrentNext >= 1)
                            currentTabContent.css('opacity', '1')
                    }
                    PrevTabElem = currentTabContent.prev()
                    BeforePrevTabElem = PrevTabElem.prev()
                    if (PrevTabElem.length) {
                        if (scrollTop >= PrevTabElem.offset().top + PrevTabElem.innerHeight()) {
                            PrevTabElem.css('opacity', '0')
                        }
                        else {
                            PercentCurrentNext = ((PrevTabElem.offset().top + PrevTabElem.innerHeight()) - scrollTop) / (PrevTabElem.offset().top + PrevTabElem.innerHeight())
                            PrevTabElem.css('opacity', PercentCurrentNext)
                        }
                    }
                    if (BeforePrevTabElem.length)
                        BeforePrevTabElem.css('opacity', '0')

                }
                else {
                    // console.log('вверх')

                    // if (currentTabContent.index() != 0) {
                    if (currentTabContent.prev().length && scrollTop <= (currentTabContent.prev().offset().top + currentTabContent.prev().innerHeight())) {
                        if (currentTabContent.index() >= 2) {
                            NextTabElem = currentTabContent.prev()
                            AfterNextTabElem = NextTabElem.prev()

                            PercentCurrentNext = ((NextTabElem.offset().top + NextTabElem.innerHeight()) - scrollTop)
                                / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2)

                            PercentNext = ((AfterNextTabElem.offset().top + AfterNextTabElem.innerHeight()) - scrollTop)
                                / (currentTabContent.innerHeight() * 2)
                        }

                        else if (currentTabContent.index() == 1) {
                            NextTabElem = currentTabContent.prev()
                            PercentCurrentNext = ((NextTabElem.offset().top + NextTabElem.innerHeight()) - scrollTop)
                                / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2)
                        }
                        currentTabContent.css('opacity', (1 - PercentCurrentNext))
                        NextTabElem.css('opacity', PercentCurrentNext)

                        if (!NextTabElem.hasClass('active')) {
                            if (scrollTop <= NextTabElem.offset().top) {
                                currentTabContent.removeClass('active')
                                // NextTabElem.css('opacity', '1')
                                currentTabContent = NextTabElem
                                currentTabContent.addClass('active')
                                ReplaceTabDescript(currentTabContent.index())
                            }
                        }
                        if (currentTabContent.index() >= 1 && currentTabContent.index() != TabContantsElems.length - 1) {
                            if (scrollTop <= (NextTabElem.offset().top + NextTabElem.innerHeight()) &&
                                scrollTop >= NextTabElem.offset().top) {

                                currentTabContent.css('opacity', '1')

                            }
                        }
                        if (AfterNextTabElem != undefined && scrollTop >= AfterNextTabElem.offset().top) {
                            AfterNextTabElem.css('opacity', PercentNext)
                            if (PercentNext >= 1) {
                                AfterNextTabElem.css('opacity', '1')
                            }
                            if (PercentNext < 0) {
                                AfterNextTabElem.css('opacity', '0')
                            }
                        }
                    }
                    else if (currentTabContent.index() == 0) {
                        PercentCurrentNext = ((currentTabContent.offset().top + currentTabContent.innerHeight()) - scrollTop)
                            / (currentTabContent.innerHeight() + currentTabContent.innerHeight() / 2)
                        currentTabContent.css('opacity', PercentCurrentNext)
                        if (PercentCurrentNext >= 1)
                            currentTabContent.css('opacity', '1')
                    }

                    PrevTabElem = currentTabContent.next()
                    BeforePrevTabElem = PrevTabElem.next()
                    if (PrevTabElem.length) {
                        if ((scrollTop + windowHeight) <= PrevTabElem.offset().top) {
                            PrevTabElem.css('opacity', '0')
                        }
                        else {
                            PercentCurrentNext = ((scrollTop + windowHeight) - PrevTabElem.offset().top) / PrevTabElem.offset().top
                            PrevTabElem.css('opacity', PercentCurrentNext)
                        }
                    }
                    if (BeforePrevTabElem.length) {
                        BeforePrevTabElem.css('opacity', '0')
                    }
                    // }
                }


                lastScrollTop = scrollTop
            })
        }
    }

}).apply(this, [window.theme, jQuery]);

(function ($) {
    $(document).ready(function ($) {

        var docWidth = window.innerWidth
        // console.log(allSectionHeights)

        $('body').on('click', '.btn-animate', function (e) {
            e.preventDefault()
            var header_offset = 0,
                $thisHash = $(this.hash),
                $thisHashOffset = $thisHash.offset().top

            // console.log($(window).scrollTop())
            if (docWidth > 1200) {
                // header_offset = $('header').innerHeight();
                // console.log(header_offset)
            }
            else {
                header_offset = 0
                if ($('.header-menu_btn.open').length) {
                    // blockScroll('close')
                    $('.header-menu_btn.open').trigger('click')
                }
                var scrollTop = $(window).scrollTop();
                if (scrollTop > $thisHash.offset().top)
                    header_offset = $('header').innerHeight();

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
            return false
        });


    })


    $(window).on('load', function () {
        setTimeout(() => {
            RestartScroll()
        }, 10);
    })


})(jQuery);


let RestartScroll = function () {
    // Перед закрытием записываем в локалсторадж window.scrollX и window.scrollY как scrollX и scrollY
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });
    // Прокручиваем страницу к scrollX и scrollY из localStorage (либо 0,0 если там еще ничего нет)
    const lastScrollPosition = sessionStorage.getItem('scrollPosition');
    // console.log(sessionStorage)
    if (lastScrollPosition) {
        window.scroll(0, 0);
        $('html, body').stop().animate({
            scrollTop: lastScrollPosition
        }, 200)
        // window.scroll(0, lastScrollPosition);
        sessionStorage.removeItem('scrollPosition');
    }
    // console.log(sessionStorage)
    // $(window).trigger('scroll')
    // console.log()
}


