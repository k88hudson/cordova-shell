var React = require('react');
var Navigation = require('react-router').Navigation;
var Click = require('./formComponents').Click;
var Animation = require('../mixins/Animation');

var Link = React.createClass({
    mixins: [Navigation, Animation],
    switchView: function () {
        this.setAnimation(this.props.transitionName);
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
