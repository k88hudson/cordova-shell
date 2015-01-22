 var React = require('react');
 var Draggable = require('react-draggable');
 React.initializeTouchEvents(true);

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
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onClick: this.onClick
      }, this.props.children)
    }
  });

var SlideToggle = React.createClass({
    getInitialState: function() {
        return {
            checked: false
        };
    },
    onStart: function (e, ui) {
        e.stopPropagation();
        this.setState({
            max: this.el.offsetWidth - this.toggleEl.offsetWidth,
            dragStart: ui.position.left
        });
    },
    onDrag: function (e, ui) {
        var left = ui.position.left;
        if (left < 0) {
            this.toggleEl.style.left = 0;
        } else if (left > this.state.max) {
            this.toggleEl.style.left = this.state.max + 'px';
        }
    },
    onStop: function (e, ui) {
        var isChecked = this.state.checked;
        var diff = ui.position.left - this.state.dragStart;
        var half = this.state.max / 2;
        if (Math.abs(diff) < 4) {
            isChecked = !isChecked;
        } else if (ui.position.left < half) {
            isChecked = false;
        } else {
            isChecked = true;
        }
        this.setState({
            dragStart: false,
            checked: isChecked
        });
        this.toggleEl.style.left = (isChecked ? this.state.max : 0) + 'px';
    },
    componentDidMount: function () {
        this.el = this.getDOMNode();
        this.toggleEl = this.refs.toggle.getDOMNode();
    },
    render: function () {
        var className = 'checkbox' + (this.state.checked ? ' on' : '');
        return (<div className={className}>
            <Draggable
                axis="x"
                onStart={this.onStart}
                onDrag={this.onDrag}
                onStop={this.onStop}
                ref="toggle">
                <div className="checkbox-toggle"></div>
            </Draggable>
            <input type="checkbox" />
        </div>);
    }
});

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

module.exports = function() {
    var parentElement = document.getElementById('app');
    React.initializeTouchEvents(true);
    var Test = React.createClass({
        getInitialState: function() {
            return {
                isOn: false
            }
        },
        flip: function (e) {
            this.setState({isOn: !this.state.isOn});
        },
        render: function () {
            return (<div>
                <p><Click
                    nodeName="button"
                    handler={this.flip}
                    className={this.state.isOn ? 'on' : ''}>
                    Standard button
                </Click></p>
                <p><SlideToggle /></p>
                <p><Switch /></p>
            </div>);
        }
    });

    React.render(<Test />, parentElement);

};
