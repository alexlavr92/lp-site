import Swiper from 'Plugs/swiper/swiper.min.js';
import "/src/css/plugins/swiper.min.css";


const Slider = {
    defaultsOptions: {
        sliderElems: $('body').find('.swiper-outer')
    },
    init: function (options) {
        const InitSingle = function (sliderOuter, SpaceBetween) {
            const sliderNavPrev = sliderOuter.find('.swiper-arrow-prev'),
                sliderNavNext = sliderOuter.find('.swiper-arrow-next'),
                slider = sliderOuter.find('.swiper-container'),
                sliderPag = sliderOuter.find('.swiper-pagination'),
                SpaceBetweenPx = (window.innerWidth / 100) * SpaceBetween

            // console.log(SpaceBetween)
            const swiper = new Swiper(slider, {
                slidesPerView: 3,
                slidesPerGroup: 3,
                grabCursor: true,
                spaceBetween: SpaceBetweenPx,
                observeParents: true,
                observer: true,
                navigation: {
                    nextEl: sliderNavNext,
                    prevEl: sliderNavPrev,
                },
                pagination: {
                    el: sliderPag,
                    type: 'fraction',
                },
            });
            return swiper
        }
        const $obj = this
        $obj.sliders = []
        var options = $.extend(this.defaultsOptions, options)
        // console.log(options)
        options.sliderElems.each(function (index) {
            const $this = $(this),
                spaceBetween = $this.hasClass('icons-wrapper-slider')
                    ? 2 : 1
            $obj.sliders[index] = InitSingle($(this), spaceBetween)
        })
        // console.log(SlidersElems)
    }
}


export { Slider }
