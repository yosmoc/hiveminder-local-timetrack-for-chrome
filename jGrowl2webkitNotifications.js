(function(window,loaded){
     if (!loaded && this.chrome) {
	 var fn = '(' + arguments.callee.toString() + ')(this,true);';
         var script = document.createElement('script');
	 script.appendChild(document.createTextNode(fn));
	 document.getElementsByTagName("head")[0].appendChild(script);
	 return;
     }

function Notifier() {
}

Notifier.prototype.init = function() {
    // this code based on http://image.gihyo.co.jp/assets/files/dev/column/01/browser/chrome5/notifications.html
    if (typeof webkitNotifications.PERMISSION_ALLWED === 'undefined') {
        webkitNotifications.PERMISSION_ALLOWED     = 0;
        webkitNotifications.PERMISSION_NOT_ALLOWED = 1;
        webkitNotifications.PERMISSION_DENIED      = 2;
    }

    if (typeof webkitNotifications.permissionLevel === 'undefined') {
        webkitNotifications.__defineGetter__('permissionLevel',function(){
            return this.checkPermission();
        });
        webkitNotifications.__defineSetter__('permissionLevel',function(){
        });
    }
};

Notifier.prototype.notify = function(icon, title, message) {
    if (webkitNotifications.permissionLevel === webkitNotifications.PERMISSION_ALLOWED) {
        var popup = webkitNotifications.createNotification(icon, title, message);

        popup.ondisplay = function() {
            setTimeout(function(){ popup.cancel(); }, 3000);
        };

        popup.show();
    } else {
        return false;
    }
};

Notifier.prototype.requestPermission = function() {
    webkitNotifications.requestPermission(function(){
        if (cb) {
            cb(window.webkitNotifications.permissionLevel == webkitNotifications.PERMISSION_ALLOWED);
        }
    });
};

Notifier.prototype.hassupport = function() {
    if (window.webkitNotifications) {
        return true;
    } else {
        return false;
    }
};

// main
var w = window;

function strip_tags (str) {
    str = str.replace(/<.*?>/g, "");
    return str;
}

if (w.jQuery && w.jQuery.jGrowl && w.webkitNotifications) {
    var jGrowl = jQuery.jGrowl;
    var notifier = new Notifier;
    notifier.init();

    jQuery.jGrowl = function(message, option) {
        if (typeof(option) != "object") option = {};
        var icon        = "http://hiveminder.com/static/images/bee-favicon.png";
        var header      = strip_tags(option["header"] || "");
        var description = strip_tags(message || "");
        notifier.notify(icon, header, description);
    };

    if (webkitNotifications.permissionLevel != webkitNotifications.PERMISSION_ALLOWED) {
        alert('please click Request Permission.');
    }

        // あとで修正する
        var request_permission = document.createElement('button');
        request_permission.innerText = 'Request Permission';
        request_permission.id = 'requestPermission';
        document.getElementById("content").appendChild(request_permission);
        document.getElementById("requestPermission")
            .addEventListener('click', function() {
                notifier.requestPermission();
        });

} else {
    return false;
}

})(window);
