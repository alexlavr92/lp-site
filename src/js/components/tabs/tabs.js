import "./tabs.scss";

export const Tabs = {
    defaultsOptions: {
        tabsElems: 'main-tabs-content',
        activeClass: 'active',
        tabsDescript: 'main-tabs-descripts'
    },
    init: function (options) {
        var options = $.extend(this.defaultsOptions, options),
            TabDiscriptElem = $('.' + options.tabsDescript + ''),
            TabContantsElems = $('.' + options.tabsElems + ''),
            TabContentsOuter = TabContantsElems.closest('.main-tabs-contents'),
            TabDescriptOuter = TabContentsOuter.next('.main-tabs-descripts_outer')
        // console.log(TabDiscriptElem)
        const TabDiscriptElemHeight = TabDiscriptElem.innerHeight()
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

        let ReplaceTabDescript = currentIndex => {
            const TabsDescriptsElem = TabDescriptOuter.find('.main-tabs-descript'),
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
        let lastScrollTop = 0
        // currentTabContent = TabContantsElems.filter(':first-child')
        // console.log(TabContentsOuter.offset().top)



        $(window).on('scroll', function () {

            const scrollTop = $(window).scrollTop(),
                windowHeight = $(window).height()
            let NextTabElem,
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


// module.exports = Tabs;