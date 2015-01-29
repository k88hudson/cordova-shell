var React = require('react');
var Navigation = require('react-router').Navigation;
var Click = require('./formComponents').Click;
var Animation = require('../mixins/Animation');

var Link = React.createClass({
    mixins: [Navigation, Animation],
    switchView: function () {
        if (this.props.back) {
            this.setAnimation(this.setAnimation(this.props.transitionName || 'back'));
            this.goBack();
            return;
        }
        this.setAnimation(this.props.transitionName);
        this.transitionTo(this.props.to, this.props.params, this.props.query);
    },
    render: function () {
        var inner = this.props.back ? <span className="ion-android-arrow-back"></span> : this.props.children;
        return (
            <Click nodeName={this.props.nodeName || 'a'} href={this.props.to} handler={this.switchView} {...this.props}>
            {inner}
            </Click>
        );
    }
});

module.exports = Link;
