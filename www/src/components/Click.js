var React = require('react');

module.exports = React.createClass({

    defaults: {
        touched: false,
        touchdown: false,
        coords: { x:0, y:0 },
        evObj: {},
        timeout: false
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

    clearTimeout: function () {
        if (this.state.timeout) {
            window.clearTimeout(this.state.timeout);
        }
    },

    onTouchStart: function(e) {
        this.clearTimeout();
        this.setState({
            touched: true,
            touchdown: true,
            coords: this.getCoords(e),
            evObj: e,
            timeout: false
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

    onTouchEnd: function(e) {
        if (this.state.touchdown) {
            this.handler.call(this, this.state.evObj);
        }
        this.setState({touchdown: false});
        this.setState({timeout: window.setTimeout(() => {
          if (this.isMounted()) {
            this.setState(this.defaults)
          }
        }, 300)});
    },

    onTouchCancel: function() {
        this.setState(this.defaults);
    },

    onClick: function(e) {
        this.clearTimeout();
        e.preventDefault();
        if (this.state.touched) {
            return;
        }
        this.setState(this.defaults);
        this.handler.apply(this, arguments);
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
        onTouchCancel: this.onTouchCancel,
        onClick: this.onClick
      }, this.props.children)
    }
});
