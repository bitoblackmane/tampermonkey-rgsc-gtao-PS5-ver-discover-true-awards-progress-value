// ==UserScript==
// @name            RGSC-GTAO Discover True Awards Progress Value
// @author          PLTytus
// @version         1.0.2
// @namespace       http://gtaweb.eu/tampermonkey
// @downloadURL     https://github.com/PLTytus/tampermonkey-rgsc-gtao-discover-true-awards-progress-value/raw/master/rgsc-discover-true-awards-progress-value.user.js
// @updateURL       https://github.com/PLTytus/tampermonkey-rgsc-gtao-discover-true-awards-progress-value/raw/master/rgsc-discover-true-awards-progress-value.meta.js
// @match           https://socialclub.rockstargames.com/games/gtav/ps5/career/awards
// @match           https://socialclub.rockstargames.com/games/gtav/ps5/career/awards/*
// ==/UserScript==

(function() {
    'use strict';

    function number_format(number, decimals, dec_point, thousands_sep){
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        let n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec){
                let k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if(s[0].length > 3){
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if((s[1] || '').length < prec){
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    let interval = setInterval(() => {
        let awards = document.querySelectorAll(".gtavContentArea");

        if(awards.length){
            awards.forEach(award => {
                let info = document.createElement("div");
                info.innerText = `${number_format(award.dataset.value, 0, ',', '.')} / ${number_format(award.dataset.target, 0, ',', '.')}`;
                info.style.position = 'absolute';
                info.style.top = '3px';
                info.style.left = '3px';
                info.style.borderWidth = "2px";
                info.style.borderStyle = "solid";
                info.style.borderColor = "#282828";
                info.style.padding = "2px";
                info.style.backgroundColor = "#121212";
                award.style.position = 'relative';
                award.append(info);
            });

            clearInterval(interval);
        }
    }, 1000);
})();
