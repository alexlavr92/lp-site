
export const Buttons = {
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
    defaultsOptions: {
        delay: 1000,
        newRound: '<div class="circle"></div>',
        btnClass: 'btn'
    },
    init: function (options) {
        var options = $.extend(this.defaultsOptions, options);
        let docWidth = window.innerWidth
        this.events(docWidth, options);

    },
    events: function (docWidth, options) {
        $('body').on('mouseenter', '.' + options.btnClass + '', function (e) {
            let $this = $(this),
                o = options
            // console.log($this)
            $(o.newRound).appendTo($this)
            let newRound = $this.find('.circle'),
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
    }
}

// module.exports = Buttons;