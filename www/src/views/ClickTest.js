var React = require('react');
var Click = require('../components/Click');

module.exports = React.createClass({
    onClick: function () {
        console.log('done');
    },
    render: function () {
        return (<main>

            <Click
                nodeName="button"
                handler={this.onClick}>
                    Button test
            </Click>
            <div id="log"></div>

        </main>);
    }
});

