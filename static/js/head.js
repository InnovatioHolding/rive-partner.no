(function() {
    Head = {};

    Head.refresh = function() {
        var width = window.innerWidth,
            height = window.innerHeight;
        var stops = [10, 9, 8, 7, 6, 5, 4, 3];
        var flags = [];

        for (var i = 0, len = stops.length, stop; i < len; i++) {
            stop = stops[i];
            if (width < (stop * 100)) {
                flags.push(("lt" + stop));
            };
        };

        // could include others as well
        // console.log flags
        return document.documentElement.className = flags.join(' ');
    };

    Head.refresh();

    return HueInitMap = function(e) {
        return HueMapInited = true;
    };

})();