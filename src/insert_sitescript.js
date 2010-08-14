var insert_sitescript = function(f) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(f);
    document.head.appendChild(script);
}

insert_sitescript('hiveminder-local-time-track.user.js');
insert_sitescript('jGrowl2webkitNotifications.js');