(function ($) {
    'use strict'
    $(document).ready(function ($) {
        // 'use strict'

        var docWidth = window.innerWidth
        // Функция анимирования кнопок при наведении
        if ($('.btn').length) {
            theme.initAnimBtn()
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
            theme.typedInit(typedElems)
            /* }) */
        }
        //----------------------//

        if (('header').length) {
            theme.Header.initScroll()
            // console.log(theme.Header)
        }

        if ($('.main-tabs-wrapper').length)
            theme.Tabs.InitTabs()
        // var NewTyped = '<h1 class="heading heading-white">Мы помогаем превращать идеи<br /> в отличный <span class="typed-js"'
        //     + 'id = "main-heading2" ><span>пользовательский опыт</span><span>текст 2</span></span></h1>'
        // var NewTypedAppend = $(NewTyped).prependTo('.top-section .new-container')
        // console.log(theme.initTabs())
    })// конец ready
})(jQuery);
