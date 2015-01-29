var React = require('react');

var Click = module.exports.Click = React.createClass({

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
        if (!this.props.noPreventDefault) e.preventDefault();
        if (this.state.touched) {
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

var Input = module.exports.Input = React.createClass({
    onFocus: function () {
        // We need this because of http://css-tricks.com/webkit-sibling-bug. Sigh
        this.setState({hasFocus: true});
    },
    render: function () {
        return (<div className="input-group">
            <input
                placeholder={this.props.label}
                type={this.props.type || 'text'} required />
        </div>);
    }
});

var InputMaterial = module.exports.InputMaterial = React.createClass({
    onFocus: function () {
        // We need this because of http://css-tricks.com/webkit-sibling-bug. Sigh
        this.setState({hasFocus: true});
    },
    render: function () {
        return (<div className="input-group-material">
            <input type={this.props.type || 'text'} onFocus={this.onFocus} required />
            <span className="bar">
                <span className="left"></span>
                <span className="right"></span>
            </span>
            <span className="highlight"></span>
            <label>{this.props.label}</label>
        </div>);
    }
});

var Checkbox = module.exports.Checkbox = React.createClass({
    getInitialState: function () {
        return {
            checked: false
        };
    },
    onChange: function (e) {
        this.setState({checked: !this.state.checked});
    },
    render: function () {
        var className = 'checkbox' + (this.state.checked ? ' on' : '');
        return (
            <div className={className}>
                <Click nodeName="a" href="#" handler={this.onChange}>
                    <div className="checkbox-indicator">
                        <span className="check ion-checkmark" />
                    </div>
                    <div>{this.props.children}</div>
                </Click>
                <input type="checkbox" onChange={this.onChange} checked={this.state.checked}/>
            </div>
        );
    }
});

var Switch = module.exports.Switch = React.createClass({
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
