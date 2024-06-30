// ==UserScript==
// @name            RGSC-GTAO Discover True Awards Progress Value
// @author          PLTytus
// @version         1.0
// @namespace       http://gtaweb.eu/tampermonkey
// @downloadURL     https://github.com/PLTytus/tampermonkey-rgsc-gtao-discover-true-awards-progress-value/raw/master/rgsc-discover-true-awards-progress-value.user.js
// @updateURL       https://github.com/PLTytus/tampermonkey-rgsc-gtao-discover-true-awards-progress-value/raw/master/rgsc-discover-true-awards-progress-value.meta.js
// @match           https://socialclub.rockstargames.com/games/gtav/pc/career/awards
// @match           https://socialclub.rockstargames.com/games/gtav/pc/career/awards/*
// ==/UserScript==

(function() {
    'use strict';

    document.onreadystatechange = () => {
        if(document.readyState != "complete") return;

        document.querySelectorAll(".gtavContentArea").forEach(award => {
            let info = document.createElement("div");
            info.innerText = `${award.dataset.value} / ${award.dataset.target}`;
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
    }
})();