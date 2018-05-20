import './style.scss';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import '../node_modules/bootstrap/js/tab';

(function($){

    function reorderDOM() {
        if ($(window).innerWidth() < 768) {
            $('.myface').insertAfter($('.main-title'));
        } else {
            $('.right-col').append($('.myface'));
        }
    }

    $(window).scroll(function() {
        if ($(window).innerWidth() > 767) {
            $('.site-nav').css('top',$(window).scrollTop()+'px');
        }
    });

    $(window).resize(function() {
        if ($(window).innerWidth() > 767) {
            $('.site-nav').removeClass('in').removeClass('collapse');
        }

        reorderDOM();
    });

    reorderDOM();
})(jQuery);