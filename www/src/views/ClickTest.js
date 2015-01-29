var React = require('react');
var Click = require('../components/Click');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            on: false
        };
    },
    onClick: function () {
        this.setState({on: !this.state.on});
    },
    render: function () {
        return (<main>

            <Click
                nodeName="button"
                handler={this.onClick}>
                    Button test
            </Click>
            <div id="log">{this.state.on.toString()}</div>

        </main>);
    }
});

