import "./header.scss";



// Функционал для хэдера
export const Header = {
    defaultsOptions: {
        headerElem: $('body').find('header'),
    },
    initScroll: function (options) {
        const $obj = this
        var options = $.extend($obj.defaultsOptions, options);
        // console.log(options)
        let header = options.headerElem
        /*    headerHeight =  */
        $obj.headerHeight = header.innerHeight()

        $(window).on('scroll', function (e) {
            var $window = $(window),
                scrollTop = $window.scrollTop()
            // console.log(scrollTop)
            scrollTop > $obj.headerHeight
                ? header.addClass('header-mini')
                : header.removeClass('header-mini')

        })
    }
}

// module.exports = Header;