/**
 * Copyright ©2018 globalXChange.io. All rights reserved. Code or files can not be copied, modified and/or distributed without the express written permission. Unauthorized copying, modification or use of this file, via any medium is strictly prohibited.
 *
 * @version 1.0
 * @author Saydur Rahman, Geoff Butler
 * 
 */
var globalXChange = (function () {

    // Define global variables
    var scrollState = 0,    // scroll position
        scroll,             // smooth scroll object
        header,             // header element
        sticky;             // header offset

    /**
     * Nav bar class
     */
    var navBar = {

        /**
         * function to toggle mobile menu display
         * @param {element} element this element
         */
        open: function (element) {

            // check and toggle open class
            if (document.getElementById('nav-icon').classList.contains('open')) {
                document.getElementById('nav-icon').classList.remove('open');
            } else {
                document.getElementById('nav-icon').classList.add('open');
            }
        },

        /**
         * function to close mobile menu on click
         */
        close: function () {

            // check if menu open
            if (document.getElementById('navToggle').checked === true) {

                // uncheck menu trigger
                document.getElementById('navToggle').checked = false;

                // remove open class
                document.getElementById('nav-icon').classList.remove('open');

            }
        },

        /**
         * function to switch header size upon scroll
         */
        switch: function () {

            // check if scroll position greater than offset and switch class
            if (window.pageYOffset > sticky) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    };

    /**
     * initialisation function
    */
    var init = function () {

        // add animation scrolling via smoothscroll polyfil
        scroll = new SmoothScroll('a[href*="#"]', {
            offset: function (anchor, toggle) {

                // check and add offest for scroll to
                if (document.getElementsByClassName('headNav')[0].clientHeight > 95) {
                    return 110;
                } else {
                    return 93;
                }
            },
        });

        // setup header resize on scroll
        header = document.querySelector('header');
        sticky = header.offsetTop;
        window.onscroll = function () { navBar.switch() };
    };

    /**
     * expose functions to outside of class 
     */
    return {
        navClose: navBar.close,
        navOpen: navBar.open,
        init: init
    };
}());

// wait for page load trigger
document.addEventListener('DOMContentLoaded', function () {

    // GO!
    globalXChange.init();
});