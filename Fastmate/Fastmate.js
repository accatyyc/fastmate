function fastmateCompose() {
    var composeElements = document.querySelectorAll("a[href^='/mail/compose']");
    composeElements[0].click();
}

function fastmateFocusSearch() {
    var searchField = document.getElementById("v9-input");
    searchField.select();
}

function fastmateGetToolbarColor() {
    var toolbar = document.getElementsByClassName("app-toolbar")[0];
    var style = window.getComputedStyle(toolbar);
    var color = style.getPropertyValue('background-color');
    return color;
}

/**
 Web Notification observering

 Since Web Notifications are not natively supported by WKWebView, we hook into the
 notification function and post a webkit message handler instead.

 We also set the notification permission to 'granted' since WKWebView doesn't
 have a built in way to ask for permission.
*/
var originalNotification = Notification;
Notification = function(title, options) {
    window.webkit.messageHandlers.Fastmate.postMessage('{"title": "' + title + '", "options": ' + JSON.stringify(options) + '}');
    return originalNotification(title, options);
}

Object.defineProperty(Notification, 'permission', { value: 'granted', writable: false });