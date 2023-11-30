import Typed from 'Plugs/typed/typed.min.js';
import "./typed.scss";


export const typedInit = {
    // var TopSectionContent = document.querySelector('.top-section .new-container')
    // let observerTop = new MutationObserver(mutationRecords => {
    //     var newAddedElems = mutationRecords[0].addedNodes
    //     console.log($(newAddedElems));
    //     if ($(newAddedElems).hasClass('typed-js') || $(newAddedElems).find('.typed-js').length) {
    //         if (!$(newAddedElems.target).hasClass('init')) {
    //             var NewTypedJs = $(newAddedElems).hasClass('typed-js')
    //             NewTypedJs
    //                 ? NewTypedJs = $(newAddedElems)
    //                 : NewTypedJs = $(newAddedElems).find('.typed-js')
    //             InitTypedSingle(NewTypedJs)
    //         }
    //     }
    // });
    // observerTop.observe(TopSectionContent, { childList: true });
    // Иницализация написания текста //
    defaultsOptions: {
        elems: $('body').find('.typed-js')
    },
    InitTypedSingle: function (selfTyped) {
        const $obj = this
        if (!selfTyped.hasClass('init')) {
            const typedTextElem = selfTyped,
                typedText = typedTextElem.children('span')
            typedTextElem.html('')
            const typedTextString = typedText.map(function () {
                return $(this).text()
            }).get()



            const typed = new Typed('#' + selfTyped.attr('id') + '', { // Тут id того блока, в которм будет анимация
                strings: typedTextString,
                showCursor: true,
                onBegin: function (self) {
                    $(self.el).addClass('init')

                    const TypedCurrent = $(self.el).closest('.typed-current')
                    if (!TypedCurrent.length) {
                        self.stop()
                    }
                },
                onComplete: self => {

                    setTimeout(() => {
                        const TypedCurrent = $(self.el).closest('.typed-current')
                        TypedCurrent.removeClass('typed-current')
                        TypedCurrent.siblings().fadeIn({
                            duration: 800,
                            start: function () {
                                $(this).addClass('typed-current')
                                const TypedCurrentIndex = $(this).index()

                                $obj.InitTypedElems[TypedCurrentIndex].start()
                                $obj.InitTypedElems[TypedCurrentIndex].reset()

                            },
                            complete: function () {
                                $(this).css({ display: '' })
                            }
                        })
                    }, 1500)
                },
                typeSpeed: 70, // Скорость печати
                startDelay: 200, // Задержка перед стартом анимации
                backSpeed: 50, // Скорость удаления
                loop: false // Указываем, повторять ли анимацию
            });
            return typed
        }

    },
    InitTypedElems: [],
    initTyped: function (options) {
        // let InitTypedElems = []
        const $obj = this
        var options = $.extend($obj.defaultsOptions, options);
        $.each(options.elems, function (index) {
            $obj.InitTypedElems[index] = $obj.InitTypedSingle($(this))
        })
    }
}

// module.exports = typedInit;