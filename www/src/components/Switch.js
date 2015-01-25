var React = require('react');
var Click = require('./Click');

var Switch = React.createClass({
    getInitialState: function() {
        return {
            on: false
        };
    },
    onSwitch: function () {
        this.setState({ on: !this.state.on });
    },
    render: function () {
        return (<Click swipe handler={this.onSwitch} className={'switch' + (this.state.on ? ' on' : '')}>
            <div className="track">
                <div className="switch-toggle"></div>
            </div>
        </Click>);
    }
});

module.exports = Switch;
