'use strict'
import { Header } from "./components/header/header"; // импорт компонента набора строки
import { Buttons } from './components/buttons/buttons';


// console.log(Buttons, Header)


$(document).ready(function ($) {

    // Функция анимирования кнопок при наведении
    if ($('.btn').length) {
        Buttons.init()
        // console.log(BtnsInit)
    }
    if (('header').length) {
        Header.initScroll()
        // console.log(theme.Header)
    }
})// конец ready


$(window).on('load', function () {
    setTimeout(() => {
        RestartScroll()
    }, 10);
})

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


