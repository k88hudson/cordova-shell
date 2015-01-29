var React = require('react');

module.exports = React.createClass({

    defaults: {
        touched: false,
        touchdown: false,
        coords: { x:0, y:0 },
        evObj: {}
    },

    getInitialState: function() {
        return this.defaults;
    },

    handler: function() {
        typeof this.props.handler == 'function' && this.props.handler.apply(this, arguments);
    },

    getCoords: function(e) {
        if (e.touches && e.touches.length) {
            var touch = e.touches[0];
            return {
                x: touch.pageX,
                y: touch.pageY
            };
        }
    },

    log: function (text) {
        var el = document.createElement('p');
        el.innerHTML = text;
        document.getElementById('log').appendChild(el);
    },

    onMouseOver: function (e) {
        this.log('mouseover');
    },

    onMouseDown: function (e) {
        this.log('mousedown');
    },

    onMouseUp: function (e) {
        this.log('mouseup');
    },

    onTouchStart: function(e) {
        this.log('touchstart');
    },

    onTouchMove: function(e) {
        this.log('touchmove');
    },

    onTouchEnd: function() {
        this.log('touchend');
    },

    onTouchCancel: function() {
        this.log('touchcancel');
    },

    onClick: function(e) {
        this.log('click');
    },

    render: function() {
      var classNames = ['touchclick']

      this.props.className && classNames.push(this.props.className)
      this.state.touchdown && classNames.push('touchdown')

      return React.DOM[this.props.nodeName || 'button']({
        className: classNames.join(' '),
        href: this.props.href,
        onMouseOver: this.onMouseOver,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onTouchCancel: this.onTouchCancel,
        onClick: this.onClick
      }, this.props.children)
    }
});
