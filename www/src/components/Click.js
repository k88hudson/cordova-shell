var React = require('react');
var Click = React.createClass({

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

    onTouchStart: function(e) {
        this.setState({
            touched: true,
            touchdown: true,
            coords: this.getCoords(e),
            evObj: e
        });
    },

    onTouchMove: function(e) {
        if (this.props.swipe) return;
        var coords = this.getCoords(e);
        var distance = Math.max(
            Math.abs(this.state.coords.x - coords.x),
            Math.abs(this.state.coords.y - coords.y)
        );
        if (distance > 6) {
            this.setState({ touchdown: false });
        }
    },

    onTouchEnd: function() {
        if (this.state.touchdown) {
            this.handler.call(this, this.state.evObj);
        }
        this.setState({touchdown: false});
    },

    onClick: function(e) {
        e.preventDefault();
        if ( this.state.touched ) {
            return;
        }
        this.handler.apply(this, arguments)
        this.setState(this.defaults)
    },

    render: function() {
      var classNames = ['touchclick']

      this.props.className && classNames.push(this.props.className)
      this.state.touchdown && classNames.push('touchdown')

      return React.DOM[this.props.nodeName || 'button']({
        className: classNames.join(' '),
        href: this.props.href,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onClick: this.onClick
      }, this.props.children)
    }
});

module.exports = Click;
