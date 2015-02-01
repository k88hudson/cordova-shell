// On Cordova, we need to wait for the deviceready event
var app = {
    startRouter: require('./router'),
    onDeviceReady: function() {
        app.startRouter();
    },
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }
};

// Test for app context
var isCordova = window.location.protocol === 'file:';
if (isCordova) {
    app.initialize();
    console.log('is app');
} else {
    console.log('not app!');
    app.startRouter();
}
