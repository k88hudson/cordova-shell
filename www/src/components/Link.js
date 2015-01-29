var React = require('react');
var classSet = require('react/lib/cx');
var assign = require('react/lib/Object.assign');
var {Navigation, State} = require('react-router');
var Click = require('./formComponents').Click;
var Animation = require('../mixins/Animation');

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var Link = React.createClass({

  displayName: 'Link',

  mixins: [ Navigation, State, Animation ],

  propTypes: {
    activeClassName: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    query: React.PropTypes.object,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      activeClassName: 'active'
    };
  },

  handleClick: function (event) {
    var allowTransition = true;
    var clickResult;

    if (this.props.onClick)
      clickResult = this.props.onClick(event);

    if (isModifiedEvent(event))
      return;

    if (clickResult === false || event.defaultPrevented === true)
      allowTransition = false;


    event.preventDefault();

    if (allowTransition) {
      if (this.props.back) {
          this.setAnimation(this.props.transitionName || 'back');
          this.goBack();
          return;
      }
      this.setAnimation(this.props.transitionName);
      this.transitionTo(this.props.to, this.props.params, this.props.query);
    }
  },

  /**
   * Returns the value of the "href" attribute to use on the DOM element.
   */
  getHref: function () {
    return this.makeHref(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "class" attribute to use on the DOM element, which contains
   * the value of the activeClassName property when this <Link> is active.
   */
  getClassName: function () {
    var classNames = {};

    if (this.props.className)
      classNames[this.props.className] = true;

    if (this.isActive(this.props.to, this.props.params, this.props.query))
      classNames[this.props.activeClassName] = true;

    return classSet(classNames);
  },

  render: function () {

    var inner = this.props.back ? <span className="ion-android-arrow-back"></span> : this.props.children;

    var props = assign({}, this.props, {
      nodeName: this.props.nodeName || 'a',
      href: this.getHref(),
      className: this.getClassName(),
      handler: this.handleClick
    });

    return (<Click {...props} >{inner}</Click>);
  }

});

module.exports = Link;
