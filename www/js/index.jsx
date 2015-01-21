var React = require('React');
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        var parentElement = document.getElementById('app');
        React.initializeTouchEvents(true);
        var Test = React.createClass({
            getInitialState: function() {
                return {
                    isOn: false
                }
            },
            flip: function (e) {
                this.setState({isOn: !this.state.isOn});
            },
            render: function () {
                return (<div>
                    <button onTouchEnd={this.flip} className={this.state.isOn ? 'on' : ''}>Standard button</button>
                </div>);
            }
        });

        React.render(<Test />, parentElement);

    }
};

var isApp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

if (isApp) {
    app.initialize();
} else {
    console.log('not app!');
    app.receivedEvent();
}
