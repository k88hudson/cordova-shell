var React = require('react');
var Navigation = require('react-router').Navigation;
var Click = require('./Click');

var Link = React.createClass({
    mixins: [Navigation],
    switchView: function () {
        this.transitionTo(this.props.to, this.props.params, this.props.query);
    },
    render: function () {
        return (
            <Click nodeName="a" href={this.props.to} handler={this.switchView}>
            {this.props.children}
            </Click>
        );
    }
});

module.exports = Link;
