'use strict'
import { typedInit as MyTyped } from "./components/typed/typed";
import { Tabs } from "./components/tabs/tabs";
import { drawAnim } from "./components/animation/animation";
import { Slider } from "./components/sliders/sliders";




import '../index.html';

import "scss/style.scss";
import "scss/pages/index2.scss";

import './main.js';



$(document).ready(function ($) {


    // Функция инициализации анимированной печати текста
    if ($('.typed-js').length) {
        // const typedElems = $('body').find('.typed-js');
        /*   $.each(typedElems, function () { */
        MyTyped.initTyped({
            // elems: typedElems
        })
        /* }) */
    }
    //----------------------//

    // Функция инициализации табов на главной странице 
    if ($('.main-tabs-wrapper').length)
        Tabs.init()
    //----------------------//

    // Функция анимирования на главном экране
    drawAnim(document.querySelector('.top-section'))
    //----------------------//

    // Функционал инициализации слайдеров
    Slider.init()


    //----------------------//
})

// import "./components/new/new"





