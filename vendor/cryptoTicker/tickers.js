/**
 * Copyright �2018 nvest & gravitichain. All rights reserved. Code or files can not be copied, modified and/or distributed without the express written permission. Unauthorized copying or use of this file, via any medium is strictly prohibited.
 */

var Tickers = (function () {

    var //settings
        APIexchange = 'kraken',
        coin = '',

        // exchange
        proxy = 'http://18.219.78.52:8080/',
        exchange = new ccxt[APIexchange]({ 'proxy': proxy }),

        // toggles
        completedInit = false,

        // timers
        updateTimer,

        // datasets
        tickerLastData = {},
        tickerData = {};

    /**
     * data comms
     */
    var Comms = {

        fetchTickers: function (completed) {
            (async () => {

                switch (completedInit) {

                    case true:

                        Data.empty(tickerLastData);
                        tickerLastData = JSON.parse(JSON.stringify(tickerData));
                        Data.empty(tickerData);
                        tickerData = await exchange.fetchTickers();

                        break;

                    case 'process':

                        tickerLastData = JSON.parse(JSON.stringify(tickerData));
                        Data.empty(tickerData);
                        tickerData = await exchange.fetchTickers();

                        break;

                    case false:

                        tickerData = await exchange.fetchTickers();

                        break;
                }

            })();
        },

    };


    /**
     * base builders
     */
    var Builders = {

        timer: function () {

            updateTimer = setInterval(function () {

                Builders.update();

            }, 10000);
        },

        update: function () {

            Comms.fetchTickers(function () {

            });
        },

        build: function () {

            for (var key in tickerData) {

                var li = document.createElement('li'),
                    divCurrency = document.createElement('div'),
                    divUpgrade = document.createElement('div'),
                    span = document.createElement('div');

                li.classList.add('list-item');
                divCurrency.classList.add('list-item-currency');
                divUpgrade.classList.add('list-item-currency');
                divUpgrade.classList.add('upgrade');

                divCurrency.innerHTML = tickerData[key].symbol;
                span.innerHTML = tickerData[key].ask;

                li.appendChild(divCurrency);
                li.appendChild(divUpgrade);
                divUpgrade.appendChild(span);
                marqueeHorizontal.appendChild(li)

            }

            //<ul id="marquee-horizontal">

        },

        init: function () {

            Builders.timer();

            Comms.fetchTickers(function () {

            });
        },

    };

    /**
     * initialise
     */
    var fetch = function () {
        return tickerData;
    };

    /**
     * initialise
     */
    var init = function () {
        Builders.init();
    };

    /**
     * returns
     */
    return {
        build: Builders.build,
        fetch: fetch,
        init: init
    };

}());

Tickers.init();

/**
 * initialise
 */
document.addEventListener('DOMContentLoaded', function () {

    marqueeHorizontal = document.getElementById('marquee-horizontal');

    setTimeout(function () {

        marqueeHorizontal.innerHTML = '';

        console.log(Tickers.fetch());

        Tickers.build();

    }, 10000);

}, false);
